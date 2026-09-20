import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import MinimalProfile from "./MinimalProfile";
import MinimalLoader from "./MinimalLoader";
import ClassicProfile from "./ClassicProfile";
import PublicShareModal from "../PublicShareModal";
import { THEME_CONFIG } from "../../lib/constants";
import { getProfileFont } from "../../lib/profileFonts";
import { useProfileAnalytics } from "../../hooks/useProfileAnalytics";
import type { ProfilePageProps } from "../../lib/profileData";

const ProfileView: React.FC<ProfilePageProps> = ({ user, projects, host }) => {
    const [shareModalOpen, setShareModalOpen] = useState(false);
    const { recordClick } = useProfileAnalytics(user?.id);

    if (!user) {
        return (
            <div className="font-profile min-h-screen p-3 flex items-center justify-center bg-black text-white">
                <div className="glass-card p-12 rounded-3xl text-center">
                    <h1 className="text-4xl font-bold text-red-500 mb-6 font-black tracking-tighter">
                        404 - User Not Found
                    </h1>
                    <Link
                        href="https://devbio.co"
                        className="px-4 py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all"
                    >
                        Go back home
                    </Link>
                </div>
            </div>
        );
    }

    const isMinimal = user.layout === 'minimal';
    // Boot screen is opt-in: off unless the owner picked a duration. Null (rows
    // predating the column) is treated the same as 0.
    const loaderDelay = user.loader_delay_ms ?? 0;
    const loaderEnabled = loaderDelay > 0;
    // Minimal defaults to the warm "sand" palette. The default-ish dark themes
    // (onyx / dark / unset) fall through to sand so minimal reads warm out of the
    // box; a distinctive chosen theme (forest, midnight, matrix, ...) still wins.
    let resolvedThemeKey: string;
    if (isMinimal) {
        const isDefaultish =
            !user.theme || user.theme === 'dark' || user.theme === 'onyx' || !THEME_CONFIG[user.theme];
        resolvedThemeKey = isDefaultish ? 'sand' : user.theme!;
    } else {
        resolvedThemeKey = user.theme && THEME_CONFIG[user.theme] ? user.theme : 'onyx';
    }
    const themeConfig = THEME_CONFIG[resolvedThemeKey] || THEME_CONFIG['onyx'];
    const bgConfig = themeConfig.bg;
    const isImageBg = bgConfig.startsWith('http');

    const profileFont = getProfileFont(user.profile_font);

    // Canonical points at the verified domain even when served from devbio.co,
    // so the two URLs are not competing and the credit lands on their domain.
    const canonicalUrl = user.custom_domain && user.custom_domain_verified
        ? `https://${user.custom_domain}`
        : `https://devbio.co/${user.username}`;
    // og:url describes the page actually being viewed.
    const servedUrl = host ? `https://${host}${host.includes('devbio.co') ? `/${user.username}` : ''}` : canonicalUrl;

    const themeStyles = {
        '--profile-display': profileFont.display,
        '--profile-body': profileFont.body,
        '--theme-card-bg': themeConfig.card,
        '--theme-border': themeConfig.border,
        '--theme-accent': themeConfig.accent,
        '--theme-accent-text': themeConfig.accentText,
        '--theme-text': themeConfig.text,
        '--theme-text-secondary': themeConfig.textSecondary,
        '--theme-hero-gradient': themeConfig.heroGradient,
    } as React.CSSProperties;

    return (
        <div
            className={`font-profile relative min-h-screen ${isImageBg ? 'bg-transparent' : bgConfig} text-[var(--theme-text)] selection:bg-[var(--theme-accent)] transition-colors duration-700`}
            style={themeStyles}
        >
            <Head>
                <title>{`${user.full_name} | DevBio`}</title>
                <meta name="description" content={user.bio || `Check out ${user.full_name}'s developer portfolio on DevBio.`} />
                <link rel="canonical" href={canonicalUrl} />

                {/* Open Graph */}
                <meta property="og:type" content="profile" />
                <meta property="og:title" content={`${user.full_name} - ${user.profession || 'Developer Portfolio'}`} />
                <meta property="og:description" content={user.bio || `Check out ${user.full_name}'s projects and skills on DevBio.`} />
                <meta property="og:image" content={user.avatar_url || 'https://devbio.co/devbio.png'} />
                <meta property="og:url" content={servedUrl} />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${user.full_name} | DevBio Portfolio`} />
                <meta name="twitter:description" content={user.bio || `Check out ${user.full_name}'s projects and skills on DevBio.`} />
                <meta name="twitter:image" content={user.avatar_url || 'https://devbio.co/devbio.png'} />
            </Head>
            {isImageBg && (
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <Image
                        src={bgConfig}
                        alt="Background"
                        fill
                        className="object-cover opacity-40 mix-blend-luminosity"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/60" />
                </div>
            )}

            {isMinimal ? (
                <>
                    {loaderEnabled && (
                        <MinimalLoader
                            name={user.full_name}
                            profession={user.profession}
                            isAvailable={user.is_available}
                            projectCount={projects.length}
                            techCount={(user.tech_stack || []).length}
                            linkCount={(user.social_links || []).filter((s) => s.href).length}
                            bgClass={isImageBg ? 'bg-black' : bgConfig}
                            durationMs={loaderDelay}
                        />
                    )}
                    <MinimalProfile
                        user={user}
                        projects={projects}
                        recordClick={recordClick}
                        onShare={() => setShareModalOpen(true)}
                    />
                </>
            ) : (
                <ClassicProfile
                    user={user}
                    projects={projects}
                    recordClick={recordClick}
                    onShare={() => setShareModalOpen(true)}
                />
            )}

            <AnimatePresence>
                {shareModalOpen && (
                    <PublicShareModal
                        username={user.username}
                        fullName={user.full_name}
                        avatarUrl={user.avatar_url}
                        onClose={() => setShareModalOpen(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProfileView;
