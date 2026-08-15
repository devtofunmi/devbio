import type { NextApiRequest, NextApiResponse } from "next";
import type { GetServerSidePropsContext } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import type { User } from "@supabase/supabase-js";

/**
 * Returns the authenticated user only if they are the configured admin,
 * otherwise null. The session is read from the auth cookies (set by
 * createPagesBrowserClient) and validated against Supabase; the admin identity
 * comes from the server-only ADMIN_EMAIL env var.
 */
export async function getAdminUser(
    ctx:
        | { req: NextApiRequest; res: NextApiResponse }
        | GetServerSidePropsContext
): Promise<User | null> {
    const adminEmail = process.env.ADMIN_EMAIL;
    if (!adminEmail) return null;

    const supabase = createPagesServerClient(ctx);
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user?.email || user.email.toLowerCase() !== adminEmail.toLowerCase()) {
        return null;
    }
    return user;
}
