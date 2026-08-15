import { useEffect, useRef } from "react";
import { supabase } from "../lib/supabaseClient";

/**
 * Records a profile view (with best-effort geo lookup) once per mount, and
 * returns a `recordClick` helper for logging outbound link clicks. Both writes
 * are fire-and-forget; failures are logged but never surfaced to the visitor.
 */
export function useProfileAnalytics(userId?: string) {
    const geoRef = useRef({ country: "Unknown", code: "UN" });

    useEffect(() => {
        const recordViewData = async () => {
            if (!userId) return;

            let geo = { country: "Unknown", code: "UN" };
            try {
                const res = await fetch("https://ipapi.co/json/");
                const data = await res.json();
                if (data.country_name) {
                    geo = { country: data.country_name, code: data.country_code };
                    geoRef.current = geo;
                }
            } catch {
                /* silent fail */
            }

            supabase
                .from("profile_views")
                .insert([
                    {
                        profile_id: userId,
                        viewer_country: geo.country,
                        viewer_country_code: geo.code,
                    },
                ])
                .then(({ error }) => {
                    if (error) console.error("Error recording view:", error);
                });
        };

        recordViewData();
    }, [userId]);

    const recordClick = (type: string, url: string) => {
        if (!userId) return;
        const geo = geoRef.current;
        supabase
            .from("link_clicks")
            .insert([
                {
                    profile_id: userId,
                    link_type: type,
                    link_url: url,
                    viewer_country: geo.country,
                    viewer_country_code: geo.code,
                },
            ])
            .then(({ error }) => {
                if (error) console.error("Error recording click:", error);
            });
    };

    return { recordClick };
}
