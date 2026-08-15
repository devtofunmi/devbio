// Shared domain types used across pages and components.
// Keep these in sync with the `profiles` and `projects` tables (see SETUP_DB.sql).

export type SocialLink = {
    name: string;
    href: string;
};

export type TechItem = {
    name: string;
};

/**
 * Editor-side project shape used in the dashboard, where DB columns are
 * mapped to friendlier keys (tech_tags -> tech, image_url -> image).
 */
export type Project = {
    id?: string;
    title: string;
    description: string;
    url: string;
    tech: string[];
    image?: string;
    sort_order?: number;
    is_hidden?: boolean;
};

/**
 * Raw project row as stored in / returned from the database, used by the
 * public profile pages that read rows directly.
 */
export type ProjectRecord = {
    id: string;
    title: string;
    description: string;
    url: string;
    image_url: string;
    tech_tags: string[];
};

export type UserProfile = {
    id: string;
    username: string;
    full_name: string;
    profession: string;
    bio: string;
    about_me: string;
    avatar_url: string;
    github_username: string;
    github_graph_title?: string;
    social_links: SocialLink[];
    tech_stack: TechItem[];
    is_available: boolean;
    status_message?: string;
    status_icon?: string;
    cta_title?: string;
    cta_description?: string;
    cta_text?: string;
    cta_link?: string;
    theme?: string;
    beams_enabled?: boolean;
    is_donor?: boolean;
    cv_url?: string;
    layout?: string;
};
