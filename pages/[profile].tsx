import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabaseClient";
import MinimalProfile from "../components/profile/MinimalProfile";
import MinimalLoader from "../components/profile/MinimalLoader";
import ClassicProfile from "../components/profile/ClassicProfile";
import PublicShareModal from "../components/PublicShareModal";
import { THEME_CONFIG } from "../lib/constants";
import { useProfileAnalytics } from "../hooks/useProfileAnalytics";
import type { UserProfile, ProjectRecord } from "../lib/types";

type Props = {
  user: UserProfile | null;
  projects: ProjectRecord[];
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const usernameParam = Array.isArray(context.params?.profile)
    ? context.params?.profile[0]
    : context.params?.profile;

  if (!usernameParam) {
    return { props: { user: null, projects: [] } };
  }

  //  Fetch Profile
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', usernameParam.toLowerCase())
    .single();

  if (profileError || !profile) {
    console.error('Profile not found:', usernameParam);
    return { props: { user: null, projects: [] } };
  }

  //  Fetch Projects
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', profile.id)
    .eq('is_hidden', false)
    .order('sort_order', { ascending: true });

  // Allow previewing a layout without saving it: /username?layout=minimal
  const layoutQuery = context.query.layout;
  const layoutOverride =
    layoutQuery === 'minimal' || layoutQuery === 'classic' ? layoutQuery : null;

  return {
    props: {
      user: layoutOverride ? { ...profile, layout: layoutOverride } : profile,
      projects: projects || [],
    },
  };
};

const ProfilePage: React.FC<Props> = ({ user, projects }) => {
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const { recordClick } = useProfileAnalytics(user?.id);

  if (!user) {
    return (
      <div className="font-profile min-h-screen p-3 flex items-center justify-center bg-black text-white">
        <div className="glass-card p-12 rounded-3xl text-center">
          <h1 className="text-4xl font-bold text-red-500 mb-6 font-black tracking-tighter">404 - User Not Found</h1>
          <Link href="/" className="px-4 py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all">Go back home</Link>
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

  const themeStyles = {
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
        <title>{user.full_name} | DevBio</title>
        <meta name="description" content={user.bio || `Check out ${user.full_name}'s developer portfolio on DevBio.`} />
        <link rel="canonical" href={`https://devbio.co/${user.username}`} />

        {/* Open Graph */}
        <meta property="og:type" content="profile" />
        <meta property="og:title" content={`${user.full_name} - ${user.profession || 'Developer Portfolio'}`} />
        <meta property="og:description" content={user.bio || `Check out ${user.full_name}'s projects and skills on DevBio.`} />
        <meta property="og:image" content={user.avatar_url || 'https://devbio.co/devbio.png'} />
        <meta property="og:url" content={`https://devbio.co/${user.username}`} />

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

export default ProfilePage;
