import type { NextApiRequest, NextApiResponse } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import type { User } from "@supabase/supabase-js";

export async function getSessionUser(
    ctx: { req: NextApiRequest; res: NextApiResponse }
): Promise<User | null> {
    const supabase = createPagesServerClient(ctx);
    const {
        data: { user },
    } = await supabase.auth.getUser();
    return user ?? null;
}

// Matches example.com, blog.example.com, my-site.co.uk. No protocol, no path.
const DOMAIN_RE = /^(?!-)[a-z0-9-]{1,63}(?<!-)(\.(?!-)[a-z0-9-]{1,63}(?<!-))+$/;

// Hosts that would hijack the app itself. Rejected before calling Vercel.
const BLOCKED = new Set([
    "devbio.co",
    "www.devbio.co",
    "vercel.app",
    "localhost",
    "vercel.com",
]);

export function normaliseDomain(raw: unknown): string {
    if (typeof raw !== "string") return "";
    return raw
        .trim()
        .toLowerCase()
        .replace(/^https?:\/\//, "")
        .replace(/\/.*$/, "")
        .replace(/\.$/, "");
}

export function validateDomain(domain: string): string | null {
    if (!domain) return "Domain is required";
    if (domain.length > 253) return "That domain is too long";
    if (!DOMAIN_RE.test(domain)) return "That doesn't look like a valid domain";
    if (BLOCKED.has(domain) || domain.endsWith(".vercel.app")) {
        return "That domain can't be used";
    }
    if (domain.startsWith("www.")) {
        return "Add the root domain; www is configured alongside it";
    }
    return null;
}
