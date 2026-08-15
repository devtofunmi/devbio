import type { NextApiRequest, NextApiResponse } from "next";
import { getAdminUser } from "../../../lib/adminAuth";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
        return res.status(405).json({ error: "Method not allowed" });
    }

    const admin = await getAdminUser({ req, res });
    if (!admin) return res.status(403).json({ error: "Forbidden" });

    const { userId, isDonor } = (req.body ?? {}) as { userId?: string; isDonor?: boolean };
    if (!userId || typeof isDonor !== "boolean") {
        return res.status(400).json({ error: "userId and isDonor are required" });
    }

    try {
        const { error } = await supabaseAdmin
            .from("profiles")
            .update({ is_donor: isDonor })
            .eq("id", userId);
        if (error) throw error;
        return res.status(200).json({ id: userId, is_donor: isDonor });
    } catch (err) {
        console.error("[admin/toggle-donor] error:", err);
        return res.status(500).json({ error: "Failed to update donor status" });
    }
}
