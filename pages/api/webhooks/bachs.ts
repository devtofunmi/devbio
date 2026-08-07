import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

// Signature verification requires the exact raw bytes, so disable body parsing.
export const config = { api: { bodyParser: false } };

const SIGNATURE_TOLERANCE_SECONDS = 300;

// Service-role client: the webhook has no user session, so it must bypass RLS
// to flip is_donor on the donor's profile.
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.SUPABASE_SERVICE_ROLE_KEY as string,
    { auth: { persistSession: false, autoRefreshToken: false } }
);

function readRawBody(req: NextApiRequest): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        const chunks: Buffer[] = [];
        req.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
        req.on('end', () => resolve(Buffer.concat(chunks)));
        req.on('error', reject);
    });
}

// HMAC-SHA256 hex of "{timestamp}.{raw_body}", per Bachs docs.
function verifySignature(rawBody: Buffer, secret: string, timestamp: string, signature: string): boolean {
    const ts = parseInt(timestamp, 10);
    if (!Number.isFinite(ts)) return false;
    if (Math.abs(Date.now() / 1000 - ts) > SIGNATURE_TOLERANCE_SECONDS) return false;

    const expected = crypto
        .createHmac('sha256', secret)
        .update(`${ts}.${rawBody.toString('utf8')}`, 'utf8')
        .digest('hex');

    const expectedBuf = Buffer.from(expected);
    const signatureBuf = Buffer.from(signature);
    if (expectedBuf.length !== signatureBuf.length) return false;
    return crypto.timingSafeEqual(expectedBuf, signatureBuf);
}

// Metadata may live in a couple of places depending on the event; check both.
function extractUserId(data: Record<string, unknown> | undefined): string | undefined {
    if (!data) return undefined;
    const metadata = (data.metadata ?? (data.checkout as Record<string, unknown>)?.metadata) as
        | Record<string, unknown>
        | undefined;
    const userId = metadata?.user_id;
    return typeof userId === 'string' ? userId : undefined;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const secret = process.env.BACHS_WEBHOOK_SECRET;
    if (!secret || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
        console.error('[bachs/webhook] Missing BACHS_WEBHOOK_SECRET or SUPABASE_SERVICE_ROLE_KEY env vars');
        return res.status(500).json({ error: 'Webhook not configured' });
    }

    const rawBody = await readRawBody(req);
    const timestamp = req.headers['x-bachs-timestamp'];
    const signature = req.headers['x-bachs-signature'];

    if (typeof timestamp !== 'string' || typeof signature !== 'string') {
        return res.status(400).json({ error: 'Missing signature headers' });
    }

    if (!verifySignature(rawBody, secret, timestamp, signature)) {
        console.warn('[bachs/webhook] Invalid signature — rejected');
        return res.status(401).json({ error: 'Invalid signature' });
    }

    let event: { type?: string; data?: Record<string, unknown> };
    try {
        event = JSON.parse(rawBody.toString('utf8'));
    } catch {
        return res.status(400).json({ error: 'Invalid JSON' });
    }

    try {
        // A completed checkout carries the metadata we set; treat succeeded
        // collection as a fallback source of truth for fulfilment.
        if (event.type === 'checkout.completed' || event.type === 'collection.succeeded') {
            const userId = extractUserId(event.data);

            if (userId) {
                const { error } = await supabaseAdmin
                    .from('profiles')
                    .update({ is_donor: true })
                    .eq('id', userId);

                if (error) {
                    console.error('[bachs/webhook] Failed to mark donor:', error);
                } else {
                    console.log(`[bachs/webhook] Marked user ${userId} as donor`);
                }
            } else {
                console.warn('[bachs/webhook] Payment event had no user_id metadata; skipping.');
            }
        }

        // Always 200 so Bachs does not retry a delivery we have accepted.
        return res.status(200).json({ received: true });
    } catch (err) {
        console.error('[bachs/webhook] Processing error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
