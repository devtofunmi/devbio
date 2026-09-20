import type { NextApiRequest, NextApiResponse } from "next";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import { getSessionUser } from "../../../lib/domainAuth";
import { removeDomain, VercelError, vercelConfigured } from "../../../lib/vercelDomains";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "DELETE") {
        res.setHeader("Allow", "DELETE");
        return res.status(405).json({ error: "Method not allowed" });
    }

    const user = await getSessionUser({ req, res });
    if (!user) return res.status(401).json({ error: "Not signed in" });

    const { data: profile } = await supabaseAdmin
        .from("profiles")
        .select("custom_domain")
        .eq("id", user.id)
        .single();

    if (!profile?.custom_domain) return res.status(200).json({ removed: null });

    try {
        if (vercelConfigured) {
            await removeDomain(profile.custom_domain);
        }

        // Cleared even if Vercel was unreachable: an orphaned Vercel domain is
        // recoverable, a profile stuck owning a domain it cannot detach is not.
        const { error } = await supabaseAdmin
            .from("profiles")
            .update({
                custom_domain: null,
                custom_domain_verified: false,
                custom_domain_added_at: null,
                updated_at: new Date().toISOString(),
            })
            .eq("id", user.id);
        if (error) throw error;

        return res.status(200).json({ removed: profile.custom_domain });
    } catch (err) {
        if (err instanceof VercelError) {
            return res.status(err.status >= 500 ? 502 : 400).json({ error: err.message });
        }
        console.error("[domains/remove] error:", err);
        return res.status(500).json({ error: "Failed to remove domain" });
    }
}
