import type { NextApiRequest, NextApiResponse } from "next";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import { getSessionUser } from "../../../lib/domainAuth";
import { removeDomain, vercelConfigured } from "../../../lib/vercelDomains";

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
    const domain = profile.custom_domain as string;

    // The database is cleared FIRST, on purpose. These two writes cannot be made
    // atomic, so the order decides which half-finished state a crash leaves behind:
    //
    //   db first     -> worst case is a domain still attached to Vercel that no
    //                   profile claims. Harmless, and removable from the dashboard.
    //   vercel first -> worst case is a profile claiming a domain Vercel no longer
    //                   serves: the dashboard says Live while the site is dead.
    //
    // The second is what actually happened once, when a crash landed between the
    // two calls.
    try {
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
    } catch (err) {
        console.error("[domains/remove] failed to clear profile:", err);
        return res.status(500).json({ error: "Failed to remove domain" });
    }

    // Detaching from Vercel is best effort. The user is already unblocked and can
    // claim a different domain; a failure here only leaves something for the owner
    // to tidy, so it is logged rather than surfaced as an error.
    if (vercelConfigured) {
        try {
            await removeDomain(domain);
        } catch (err) {
            console.error(
                `[domains/remove] orphaned on Vercel, detach manually: ${domain}`,
                err
            );
        }
    }

    return res.status(200).json({ removed: domain });
}
