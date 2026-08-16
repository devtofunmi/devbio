import type { NextApiRequest, NextApiResponse } from "next";
import { getAdminUser } from "../../../lib/adminAuth";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export type AdminAnalytics = {
    totals: { users: number; views: number; clicks: number; projects: number };
    topProfiles: { username: string | null; views: number }[];
    geo: { country: string; code: string; count: number }[];
    timeseries: { date: string; views: number; clicks: number }[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        res.setHeader("Allow", "GET");
        return res.status(405).json({ error: "Method not allowed" });
    }

    const admin = await getAdminUser({ req, res });
    if (!admin) return res.status(403).json({ error: "Forbidden" });

    try {
        const head = { count: "exact" as const, head: true };
        const [usersCount, viewsCount, clicksCount, projectsCount] = await Promise.all([
            supabaseAdmin.from("profiles").select("*", head),
            supabaseAdmin.from("profile_views").select("*", head),
            supabaseAdmin.from("link_clicks").select("*", head),
            supabaseAdmin.from("projects").select("*", head),
        ]);

        // Map profile_id -> username for labelling.
        const { data: profiles } = await supabaseAdmin.from("profiles").select("id, username");
        const usernameById = new Map((profiles || []).map((p) => [p.id, p.username]));

        const { data: viewRows } = await supabaseAdmin
            .from("profile_views")
            .select("profile_id, viewer_country, viewer_country_code, viewed_at")
            .order("viewed_at", { ascending: false })
            .limit(2000);

        const perProfile = new Map<string, number>();
        const perCountry = new Map<string, { count: number; code: string }>();
        (viewRows || []).forEach((v) => {
            if (v.profile_id) perProfile.set(v.profile_id, (perProfile.get(v.profile_id) || 0) + 1);
            const country = v.viewer_country || "Unknown";
            const entry = perCountry.get(country) || { count: 0, code: v.viewer_country_code || "UN" };
            entry.count++;
            perCountry.set(country, entry);
        });

        const topProfiles = [...perProfile.entries()]
            .map(([id, views]) => ({ username: usernameById.get(id) ?? null, views }))
            .sort((a, b) => b.views - a.views)
            .slice(0, 8);

        const geo = [...perCountry.entries()]
            .map(([country, v]) => ({ country, code: v.code, count: v.count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 8);

        // Daily views/clicks over the last 14 days for the trend chart.
        const DAYS = 14;
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        start.setDate(start.getDate() - (DAYS - 1));
        const startIso = start.toISOString();

        const [{ data: tsViews }, { data: tsClicks }] = await Promise.all([
            supabaseAdmin.from("profile_views").select("viewed_at").gte("viewed_at", startIso),
            supabaseAdmin.from("link_clicks").select("clicked_at").gte("clicked_at", startIso),
        ]);

        const dayKeys: string[] = [];
        for (let i = 0; i < DAYS; i++) {
            const d = new Date(start);
            d.setDate(start.getDate() + i);
            dayKeys.push(d.toISOString().slice(0, 10));
        }
        const vBy: Record<string, number> = {};
        const cBy: Record<string, number> = {};
        (tsViews || []).forEach((r) => { const k = (r.viewed_at || "").slice(0, 10); if (k) vBy[k] = (vBy[k] || 0) + 1; });
        (tsClicks || []).forEach((r) => { const k = (r.clicked_at || "").slice(0, 10); if (k) cBy[k] = (cBy[k] || 0) + 1; });
        const timeseries = dayKeys.map((k) => ({ date: k.slice(5), views: vBy[k] || 0, clicks: cBy[k] || 0 }));

        const payload: AdminAnalytics = {
            totals: {
                users: usersCount.count || 0,
                views: viewsCount.count || 0,
                clicks: clicksCount.count || 0,
                projects: projectsCount.count || 0,
            },
            topProfiles,
            geo,
            timeseries,
        };

        return res.status(200).json(payload);
    } catch (err) {
        console.error("[admin/analytics] error:", err);
        return res.status(500).json({ error: "Failed to load analytics" });
    }
}
