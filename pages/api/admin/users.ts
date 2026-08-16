import type { NextApiRequest, NextApiResponse } from "next";
import { getAdminUser } from "../../../lib/adminAuth";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export type AdminUserRow = {
    id: string;
    email: string | null;
    username: string | null;
    full_name: string | null;
    avatar_url: string | null;
    is_donor: boolean;
    created_at: string | null;
    projectCount: number;
    viewCount: number;
    clickCount: number;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        res.setHeader("Allow", "GET");
        return res.status(405).json({ error: "Method not allowed" });
    }

    const admin = await getAdminUser({ req, res });
    if (!admin) return res.status(403).json({ error: "Forbidden" });

    try {
        // Auth users give us email + join date (profiles has neither).
        // NOTE: single page of up to 1000; add pagination if the user base grows past that.
        const { data: authData, error: authErr } = await supabaseAdmin.auth.admin.listUsers({
            page: 1,
            perPage: 1000,
        });
        if (authErr) throw authErr;
        const authById = new Map(authData.users.map((u) => [u.id, u]));

        const [{ data: profiles }, { data: projects }, { data: views }, { data: clicks }] =
            await Promise.all([
                supabaseAdmin.from("profiles").select("id, username, full_name, avatar_url, is_donor"),
                supabaseAdmin.from("projects").select("user_id"),
                supabaseAdmin.from("profile_views").select("profile_id"),
                supabaseAdmin.from("link_clicks").select("profile_id"),
            ]);

        const tally = (rows: { [k: string]: unknown }[] | null, key: string) => {
            const m = new Map<string, number>();
            (rows || []).forEach((r) => {
                const id = r[key] as string;
                if (id) m.set(id, (m.get(id) || 0) + 1);
            });
            return m;
        };
        const projectCounts = tally(projects, "user_id");
        const viewCounts = tally(views, "profile_id");
        const clickCounts = tally(clicks, "profile_id");

        const rows: AdminUserRow[] = (profiles || []).map((p) => {
            const auth = authById.get(p.id);
            return {
                id: p.id,
                email: auth?.email ?? null,
                username: p.username,
                full_name: p.full_name,
                avatar_url: p.avatar_url,
                is_donor: !!p.is_donor,
                created_at: auth?.created_at ?? null,
                projectCount: projectCounts.get(p.id) || 0,
                viewCount: viewCounts.get(p.id) || 0,
                clickCount: clickCounts.get(p.id) || 0,
            };
        });

        rows.sort((a, b) => (b.created_at || "").localeCompare(a.created_at || ""));

        return res.status(200).json({ users: rows });
    } catch (err) {
        console.error("[admin/users] error:", err);
        return res.status(500).json({ error: "Failed to load users" });
    }
}
