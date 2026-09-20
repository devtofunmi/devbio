import type { NextApiRequest, NextApiResponse } from "next";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import { getSessionUser, normaliseDomain, validateDomain } from "../../../lib/domainAuth";
import {
    addDomain,
    getDomainStatus,
    listProjectDomains,
    DOMAIN_LIMIT,
    VercelError,
    vercelConfigured,
} from "../../../lib/vercelDomains";

// Written with the service role: the custom_domain columns are blocked for
// normal clients by a trigger, so nobody can claim a domain they do not own.
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
        return res.status(405).json({ error: "Method not allowed" });
    }
    // Auth first, so an anonymous caller learns nothing about the setup.
    const user = await getSessionUser({ req, res });
    if (!user) return res.status(401).json({ error: "Not signed in" });

    if (!vercelConfigured) {
        return res.status(503).json({ error: "Custom domains are not available right now" });
    }

    const domain = normaliseDomain((req.body ?? {}).domain);
    const invalid = validateDomain(domain);
    if (invalid) return res.status(400).json({ error: invalid });

    try {
        // The unique index would catch this, but checking first avoids
        // registering a domain with Vercel that we cannot then store.
        const { data: existing } = await supabaseAdmin
            .from("profiles")
            .select("id")
            .eq("custom_domain", domain)
            .maybeSingle();

        if (existing && existing.id !== user.id) {
            return res.status(409).json({ error: "That domain is already in use" });
        }

        // Vercel rejects the 51st domain with a raw API error, so fail with
        // something the user can act on instead.
        const { names, truncated } = await listProjectDomains();
        const alreadyAttached = names.includes(domain);
        if (!alreadyAttached && (truncated || names.length >= DOMAIN_LIMIT)) {
            console.warn(
                `[domains/add] at capacity: ${names.length}${truncated ? "+" : ""}/${DOMAIN_LIMIT}`
            );
            return res.status(503).json({
                error: "Custom domains are at capacity right now. Please try again later.",
                code: "at_capacity",
            });
        }

        await addDomain(domain);
        const status = await getDomainStatus(domain);

        const { error } = await supabaseAdmin
            .from("profiles")
            .update({
                custom_domain: domain,
                custom_domain_verified: status.verified && status.configured,
                custom_domain_added_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            })
            .eq("id", user.id);
        if (error) throw error;

        return res.status(200).json(status);
    } catch (err) {
        if (err instanceof VercelError) {
            // Vercel's wording for a conflict is more specific than ours.
            const status = err.status === 409 ? 409 : err.status >= 500 ? 502 : 400;
            return res.status(status).json({ error: err.message, code: err.code });
        }
        console.error("[domains/add] error:", err);
        return res.status(500).json({ error: "Failed to add domain" });
    }
}
