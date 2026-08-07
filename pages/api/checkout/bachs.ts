import type { NextApiRequest, NextApiResponse } from 'next';

// Base URL is env-driven so going live is just a key + base swap.
// Sandbox: https://sandbox-api.bachs.io  |  Production: https://api.bachs.io
const BACHS_API_BASE = process.env.BACHS_API_BASE || 'https://sandbox-api.bachs.io';

/**
 * Creates a Bachs hosted checkout session for a DevBio donation and returns
 * its checkout_url. The secret API key never leaves the server. The logged-in
 * user's id is attached as metadata so the webhook can grant the donor badge.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const apiKey = process.env.BACHS_API_KEY;
    const productId = process.env.BACHS_PRODUCT_ID;

    if (!apiKey || !productId) {
        console.error('[bachs/checkout] Missing BACHS_API_KEY or BACHS_PRODUCT_ID env vars');
        return res.status(500).json({ error: 'Payments are not configured.' });
    }

    const { userId, email, name } = (req.body ?? {}) as {
        userId?: string;
        email?: string;
        name?: string;
    };

    // Donations require a logged-in user, so an email is always expected.
    if (!email) {
        return res.status(400).json({ error: 'A valid email is required to donate.' });
    }

    // Resolve the site origin for success/cancel redirects.
    const proto = (req.headers['x-forwarded-proto'] as string) || 'https';
    const origin = process.env.NEXT_PUBLIC_SITE_URL || `${proto}://${req.headers.host}`;

    try {
        const response = await fetch(`${BACHS_API_BASE}/v1/checkout-sessions`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                customer: { email, ...(name ? { name } : {}) },
                product_cart: [{ product_id: productId, quantity: 1 }],
                success_url: `${origin}/donate?donation=success`,
                cancel_url: `${origin}/donate?donation=cancelled`,
                // Carried through to the checkout.completed webhook to link the donor.
                ...(userId ? { metadata: { user_id: userId } } : {}),
            }),
        });

        const data = await response.json();

        if (!response.ok || !data?.checkout_url) {
            console.error('[bachs/checkout] Bachs API error:', response.status, data);
            return res.status(502).json({ error: 'Could not start checkout. Please try again.' });
        }

        return res.status(200).json({ checkout_url: data.checkout_url });
    } catch (err) {
        console.error('[bachs/checkout] Request failed:', err);
        return res.status(500).json({ error: 'Could not start checkout. Please try again.' });
    }
}
