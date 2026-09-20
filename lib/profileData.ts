import type { GetServerSidePropsContext } from "next";
import { supabase } from "./supabaseClient";
import { PROFILE_FONTS } from "./profileFonts";
import type { UserProfile, ProjectRecord } from "./types";

// Shared by both routes that render a public profile, so they cannot drift.

export type ProfilePageProps = {
    user: UserProfile | null;
    projects: ProjectRecord[];
    /**
     * Host the response is being served from, so canonical and og:url point at
     * whatever the visitor actually typed rather than a hardcoded devbio.co.
     */
    host: string;
};

const SITE_HOST = (process.env.NEXT_PUBLIC_SITE_URL || "https://devbio.co")
    .replace(/^https?:\/\//, "")
    .replace(/\/.*$/, "");

export const normaliseHost = (raw?: string | null) =>
    (raw || "").split(":")[0].trim().toLowerCase();

async function loadProjects(userId: string) {
    const { data } = await supabase
        .from("projects")
        .select("*")
        .eq("user_id", userId)
        .eq("is_hidden", false)
        .order("sort_order", { ascending: true });
    return (data || []) as ProjectRecord[];
}

// Validated against the known sets so a query value never reaches the CSS.
function applyPreviewOverrides(profile: UserProfile, context: GetServerSidePropsContext) {
    const layoutQuery = context.query.layout;
    const layout =
        layoutQuery === "minimal" || layoutQuery === "classic" ? layoutQuery : null;

    const fontQuery = context.query.font;
    const font =
        typeof fontQuery === "string" && PROFILE_FONTS.some((f) => f.id === fontQuery)
            ? fontQuery
            : null;

    return {
        ...profile,
        ...(layout ? { layout } : {}),
        ...(font ? { profile_font: font } : {}),
    };
}

const empty = (host: string): ProfilePageProps => ({ user: null, projects: [], host });

export async function getProfileByUsername(
    context: GetServerSidePropsContext
): Promise<ProfilePageProps> {
    const host = normaliseHost(context.req.headers.host) || SITE_HOST;

    const raw = Array.isArray(context.params?.profile)
        ? context.params?.profile[0]
        : context.params?.profile;
    if (!raw) return empty(host);

    const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", raw.toLowerCase())
        .single();

    if (error || !profile) return empty(host);

    return {
        user: applyPreviewOverrides(profile as UserProfile, context),
        projects: await loadProjects(profile.id),
        host,
    };
}

// Only verified domains resolve: an unverified row is a claim, not a live
// site, so serving it would let anyone squat a domain and have it work.
export async function getProfileByDomain(
    context: GetServerSidePropsContext
): Promise<ProfilePageProps> {
    const raw = Array.isArray(context.params?.host)
        ? context.params?.host[0]
        : context.params?.host;
    const host = normaliseHost(raw) || normaliseHost(context.req.headers.host);
    if (!host) return empty(host);

    const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("custom_domain", host)
        .eq("custom_domain_verified", true)
        .single();

    if (error || !profile) return empty(host);

    return {
        user: applyPreviewOverrides(profile as UserProfile, context),
        projects: await loadProjects(profile.id),
        host,
    };
}
