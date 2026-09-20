import type { NextApiRequest, NextApiResponse } from "next";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import { getSessionUser } from "../../../lib/domainAuth";
import { getDomainStatus, VercelError, vercelConfigured } from "../../../lib/vercelDomains";

// On demand rather than polled: Vercel allows 100 verifications a minute
// across the whole project, which polling clients would exhaust.
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        res.setHeader("Allow", "GET");
        return res.status(405).json({ error: "Method not allowed" });
    }

    const user = await getSessionUser({ req, res });
    if (!user) return res.status(401).json({ error: "Not signed in" });

    const { data: profile } = await supabaseAdmin
        .from("profiles")
        .select("custom_domain, custom_domain_verified")
        .eq("id", user.id)
        .single();

    // Lets the dashboard show a notice rather than failing on first use.
    if (!profile?.custom_domain) {
        return res.status(200).json({ domain: null, available: vercelConfigured });
    }
    if (!vercelConfigured) {
        return res.status(503).json({ error: "Custom domains are not available right now" });
    }

    try {
        const status = await getDomainStatus(profile.custom_domain);
        const live = status.verified && status.configured;

        if (live !== Boolean(profile.custom_domain_verified)) {
            await supabaseAdmin
                .from("profiles")
                .update({ custom_domain_verified: live, updated_at: new Date().toISOString() })
                .eq("id", user.id);
        }

        return res.status(200).json({ ...status, available: true });
    } catch (err) {
        if (err instanceof VercelError) {
            if (err.status === 429) {
                return res.status(429).json({ error: "Checking too often. Try again in a minute." });
            }
            return res.status(err.status >= 500 ? 502 : 400).json({ error: err.message });
        }
        console.error("[domains/status] error:", err);
        return res.status(500).json({ error: "Failed to check domain" });
    }
}
