import type { NextApiRequest, NextApiResponse } from "next";
import type { GetServerSidePropsContext } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import type { User } from "@supabase/supabase-js";
import { supabaseAdmin } from "./supabaseAdmin";

/**
 * Returns the authenticated user only if they are listed in the `admins`
 * table, otherwise null.
 *
 * Security: the session cookie is validated against Supabase (getUser), then
 * admin membership is checked with the service-role client. The `admins` table
 * has RLS enabled with no policies, so it is default-deny for every client
 * role — only the server (service role) can read or modify it. There is no
 * admin identity in source or env, and users cannot grant themselves access.
 */
export async function getAdminUser(
    ctx:
        | { req: NextApiRequest; res: NextApiResponse }
        | GetServerSidePropsContext
): Promise<User | null> {
    const supabase = createPagesServerClient(ctx);
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: adminRow } = await supabaseAdmin
        .from("admins")
        .select("user_id")
        .eq("user_id", user.id)
        .maybeSingle();

    return adminRow ? user : null;
}
