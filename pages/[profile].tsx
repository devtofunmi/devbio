import React from "react";
import Head from "next/head";
import Image from "next/image";
import { GetServerSideProps } from "next";
import { FaGithub, FaTwitter, FaLinkedin, FaYoutube, FaExternalLinkAlt, FaCode, FaInfoCircle, FaUser, FaArrowRight, FaFilePdf } from "react-icons/fa";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabaseClient";
import GitHubCard from "../components/GitHubCard";
import PublicShareModal from "../components/PublicShareModal";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { FiShare2 } from "react-icons/fi";
import { THEME_CONFIG, SOCIAL_BASE_URLS, ALL_TECHS } from "../lib/constants";
import { ensureAbsoluteUrl, formatSocialHref } from "../lib/utils";
import { toast } from "react-toastify";

type SocialLink = {
  name: string;
  href: string;
};

type TechItem = {
  name: string;
};

type Project = {
  id: string;
  title: string;
  description: string;
  url: string;
  image_url: string;
  tech_tags: string[];
};

type UserProfile = {
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
};

type Props = {
  user: UserProfile | null;
  projects: Project[];
};

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  'Twitter': <FaTwitter />,
  'GitHub': <FaGithub />,
  'LinkedIn': <FaLinkedin />,
  'YouTube': <FaYoutube />,
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
    .order('sort_order', { ascending: true });

  return {
    props: {
      user: profile,
      projects: projects || [],
    },
  };
};

const ProfilePage: React.FC<Props> = ({ user, projects }) => {
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const geoRef = useRef({ country: 'Unknown', code: 'UN' });

  useEffect(() => {
    const recordViewData = async () => {
      if (!user?.id) return;

      let geo = { country: 'Unknown', code: 'UN' };
      try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        if (data.country_name) {
          geo = { country: data.country_name, code: data.country_code };
          geoRef.current = geo;
        }
      } catch { /* silent fail */ }

      supabase
        .from('profile_views')
        .insert([{
          profile_id: user.id,
          viewer_country: geo.country,
          viewer_country_code: geo.code
        }])
        .then(({ error }) => {
          if (error) console.error('Error recording view:', error);
        });

    };

    recordViewData();
  }, [user?.id]);

  const recordClick = async (type: string, url: string) => {
    if (user?.id) {
      const geo = geoRef.current;
      supabase
        .from('link_clicks')
        .insert([{
          profile_id: user.id,
          link_type: type,
          link_url: url,
          viewer_country: geo.country,
          viewer_country_code: geo.code
        }])
        .then(({ error }) => {
          if (error) console.error('Error recording click:', error);
        });
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen p-3 flex items-center justify-center bg-black text-white">
        <div className="glass-card p-12 rounded-3xl text-center">
          <h1 className="text-4xl font-bold text-red-500 mb-6 font-black tracking-tighter">404 - User Not Found</h1>
          <Link href="/" className="px-4 py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all">Go back home</Link>
        </div>
      </div>
    );
  }

  const hasGitHub = !!user.github_username;
  const hasTech = user.tech_stack && user.tech_stack.length > 0;
  const hasAboutMe = !!user.about_me;
  const hasProjects = projects && projects.length > 0;
  const hasLeftColumn = hasGitHub || hasTech;

  // Layout logic: if one side is missing, the other takes up more space
  const leftColClass = !hasAboutMe ? "md:col-span-12" : "md:col-span-8";
  const rightColClass = !hasLeftColumn ? "md:col-span-12" : "md:col-span-4";

  const themeConfig = THEME_CONFIG[user.theme || 'onyx'] || THEME_CONFIG['onyx'];
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
      className={`relative min-h-screen ${isImageBg ? 'bg-transparent' : bgConfig} text-[var(--theme-text)] selection:bg-[var(--theme-accent)] transition-colors duration-700`}
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

      {/* Floating Share Button - Premium Glassmorphism Neon Version */}
      <motion.div
        animate={{
          y: [0, -12, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        whileHover={{ scale: 1.1, y: 0 }}
        whileTap={{ scale: 0.9 }}

        className="fixed bottom-8 right-8 md:bottom-12 md:right-12 z-[100]"
      >
        <button
          onClick={() => setShareModalOpen(true)}
          className="group relative flex items-center cursor-pointer"
        >
          {/* Outer Neon Ring Glow */}
          <div className="absolute inset-0 rounded-full bg-[var(--theme-accent)] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative flex items-center justify-center glass rounded-full border-[var(--theme-border)] group-hover:border-[var(--theme-accent)] p-2 md:p-3 shadow-2xl transition-all duration-500 backdrop-blur-3xl overflow-hidden">
            {/* Animated Background Sweep */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--theme-accent)] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 opacity-20" />

            {/* Neon Icon Core */}
            <div className="w-12 h-12 md:w-14 md:h-14 bg-[var(--theme-accent)] rounded-full flex items-center justify-center text-[var(--theme-accent-text)] shadow-lg transition-all group-hover:scale-105 relative z-10">
              <FiShare2 size={24} className="group-hover:rotate-12 transition-transform" />
            </div>

            {/* Interactive Border */}
            <div className="absolute inset-0 border border-[var(--theme-border)] group-hover:border-[var(--theme-accent)] rounded-full m-[1px]" />
          </div>
        </button>
      </motion.div>

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-16 relative z-10">
        {/* Hero Section: Profile Identity */}
        <div className="mb-10 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative group p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden min-h-[400px] md:min-h-[450px] flex flex-col justify-end border border-[var(--theme-border)]"
          >
            {/* High-End Background Effect */}
            <div className="absolute inset-0 z-0">
              <Image
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&q=80"
                alt="Cover"
                fill
                className="object-cover scale-105 group-hover:scale-100 transition-transform duration-[2s] opacity-40 blur-sm"
              />
              <div className="absolute inset-0" style={{ background: 'var(--theme-hero-gradient)' }} />
              <div className="absolute top-0 right-0 w-1/2 h-full bg-[var(--theme-accent)] blur-[150px] rounded-full opacity-20" />
              <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-[var(--theme-accent)] blur-[120px] rounded-full opacity-10" />
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start gap-0 md:gap-8 text-center lg:text-left">
              {/* Avatar Container */}
              <div className="relative shrink-0">
                <motion.div
                  animate={user.is_donor ? {
                    boxShadow: [
                      '0 0 30px rgba(234,179,8,0.3)',
                      '0 0 40px rgba(234,179,8,0.5)',
                      '0 0 30px rgba(234,179,8,0.3)',
                    ],
                  } : {}}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className={`w-32 h-32 md:w-48 md:h-48 rounded-[2.5rem] md:rounded-[3rem] overflow-hidden relative bg-[var(--theme-card-bg)] flex items-center justify-center transition-all duration-500 ${user.is_donor
                    ? 'border-4 border-yellow-500/50 ring-4 ring-yellow-500/10'
                    : 'border-4 border-[var(--theme-border)]'
                    }`}>
                  {user.avatar_url ? (
                    <Image
                      src={user.avatar_url}
                      alt={user.full_name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <FaUser className="text-[var(--theme-text-secondary)] text-5xl md:text-7xl" />
                  )}

                </motion.div>
                <div className="absolute bottom-7 left-23 md:left-35 w-10 h-10 md:w-12 md:h-12 bg-[#1e1e1e] rounded-full flex items-center justify-center border-4 border-[#0a0a0a] group-hover:scale-110 transition-transform cursor-pointer relative group/status z-20" onClick={(e) => e.stopPropagation()}>
                  <span className="text-lg md:text-xl">{user.status_icon || (user.is_available)}</span>
                  <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-max max-w-[200px] px-3 py-1.5 glass bg-[#1e1e1e] border border-[var(--theme-border)] rounded-full text-xs font-bold text-white shadow-xl opacity-0 group-hover/status:opacity-100 group-active/status:opacity-100 transition-all pointer-events-none select-none flex items-center gap-2 z-50 backdrop-blur-xl">
                    <span className={`w-2 h-2 rounded-full ${user.is_available ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                    {user.status_message || (user.is_available ? "Available" : "Focused")}
                  </div>
                </div>

              </div>

              {/* Info Section */}
              <div className="flex-1 space-y-6 w-full overflow-hidden">
                <div className="flex flex-col gap-2">
                  <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-[var(--theme-text)] block leading-[1.1]">
                    {user.full_name}
                  </h1>
                  <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                    <p className="text-lg md:text-2xl text-[var(--theme-accent)] font-bold tracking-tight leading-tight">
                      {user.profession}
                    </p>
                  </div>
                </div>

                <div className="max-w-2xl mx-auto lg:mx-0">
                  <p className="text-base md:text-xl text-[var(--theme-text-secondary)] leading-relaxed font-light">
                    {user.bio}
                  </p>
                </div>



                {/* Social Links */}
                <div className="flex flex-wrap gap-4 pt-4 items-center justify-center lg:justify-start">
                  {(user.social_links as SocialLink[])?.map((social) => (
                    social.href && (
                      <a
                        key={social.name}
                        href={formatSocialHref(social.name, social.href, SOCIAL_BASE_URLS)}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => recordClick('social', social.name)}
                        className="glass rounded-2xl p-4 flex items-center justify-center border border-[var(--theme-border)] hover:border-[var(--theme-accent)] transition-all cursor-pointer group"
                        title={social.name}
                      >
                        <div className="text-[var(--theme-text-secondary)] group-hover:text-[var(--theme-accent)] transition-colors">
                          {SOCIAL_ICONS[social.name] || <FaExternalLinkAlt size={20} />}
                        </div>
                      </a>
                    )
                  ))}
                </div>

                {/* CV Download Button */}
                {user.cv_url && (
                  <div className="pt-2">
                    <a
                      href={`${user.cv_url}?download=`}
                      download={`${user.full_name.replace(/\s+/g, '_')}_CV.pdf`}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => {
                        recordClick('cv', user.cv_url!);
                        toast.info("Download started...", {
                          icon: () => <span>🚀</span>,
                          style: {
                            borderRadius: '1rem',
                            background: 'var(--theme-card-bg)',
                            color: 'var(--theme-text)',
                            border: '1px solid var(--theme-border)',
                          },
                        });
                      }}
                      className="inline-flex items-center gap-2 px-6 py-3 glass rounded-2xl border border-[var(--theme-border)] text-white/60 hover:text-[var(--theme-accent)] hover:border-[var(--theme-accent)] transition-all font-bold text-xs uppercase tracking-widest group/cv"
                    >
                      <FaFilePdf size={14} className="group-hover/cv:scale-110 transition-transform" />
                      <span>Download CV</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20">
          {/* Left Column: GitHub & Tech Stack */}
          {hasLeftColumn && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`${leftColClass} flex flex-col gap-8`}
            >
              {hasGitHub && (
                <div className="glass-card bg-[var(--theme-card-bg)] rounded-[2rem] p-6 md:p-8 border border-[var(--theme-border)] overflow-hidden h-fit relative">
                  <div className="flex items-center gap-4 ">
                    <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-[var(--theme-text)]"><FaGithub size={20} /></div>
                    <h4 className="text-xl md:text-2xl font-black text-[var(--theme-text)] tracking-tight leading-none">
                      {user.github_graph_title}
                    </h4>
                  </div>
                  <div className="w-full h-full flex items-center justify-center">
                    <GitHubCard githubUsername={user.github_username} size={48} />
                  </div>
                </div>
              )}

              {hasTech && (
                <div className="glass-card bg-[var(--theme-card-bg)] rounded-[2rem] p-6 md:p-10 border border-[var(--theme-border)]">
                  <div className="flex justify-between items-center mb-6 md:mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-[var(--theme-accent)]">
                        <FaCode size={18} />
                      </div>
                      <h4 className="text-xl md:text-2xl font-black text-[var(--theme-text)] tracking-tight leading-none">Tech Stack</h4>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {(user.tech_stack as TechItem[]).map((tech) => {
                      const matchedTech = ALL_TECHS.find(t => t.name === tech.name);
                      return (
                        <span key={tech.name} className="px-4 py-2 md:px-6 md:py-3 glass rounded-xl md:rounded-2xl text-[10px] md:text-sm font-bold text-[var(--theme-text-secondary)] hover:text-[var(--theme-accent)] border border-[var(--theme-border)] cursor-pointer transition-all hover:scale-110 active:scale-95 whitespace-nowrap flex items-center gap-2">
                          <span className="text-lg opacity-80">{matchedTech?.icon || <FaCode />}</span>
                          <span>{tech.name}</span>
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Right Column: About & Status */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`${rightColClass} space-y-8`}
          >
            {hasAboutMe && (
              <div className="glass-card bg-[var(--theme-card-bg)] rounded-[2rem] p-10 border border-[var(--theme-border)] bg-white/[0.01]">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-[var(--theme-accent)]">
                      <FaInfoCircle size={18} />
                    </div>
                    <h4 className="text-xl font-black text-[var(--theme-text)] tracking-tight">About Me</h4>
                  </div>
                </div>
                <p className="text-sm text-[var(--theme-text-secondary)] leading-relaxed font-light min-h-[120px] whitespace-pre-wrap">
                  {user.about_me}
                </p>
              </div>
            )}



          </motion.div>

          {/* Projects Showcase - Full Width */}
          {hasProjects && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-12"
            >
              <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 mb-12">
                <div className="text-center md:text-left">
                  <h3 className="text-4xl font-black text-[var(--theme-text)] tracking-tighter mb-2">Featured Projects</h3>
                  <p className="text-[var(--theme-text-secondary)] font-light">Showcase of best builds and creations.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, i) => (
                  <div key={project.id || i} className="glass-card bg-[var(--theme-card-bg)] rounded-[2rem] p-6 border border-[var(--theme-border)] group hover:border-[var(--theme-accent)] transition-all flex flex-col h-full">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden relative border border-[var(--theme-border)] bg-white/[0.03] flex items-center justify-center">
                        {project.image_url ? (
                          <Image
                            src={project.image_url}
                            alt={project.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <FaCode size={24} className="text-[var(--theme-text-secondary)]" />
                        )}
                      </div>
                      {project.url && (
                        <a
                          href={ensureAbsoluteUrl(project.url)}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => recordClick('project', project.title)}
                          className="p-3 glass rounded-xl text-[var(--theme-text-secondary)] hover:text-[var(--theme-text)] transition-colors hover:bg-white/10"
                        >
                          <FaExternalLinkAlt size={14} />
                        </a>
                      )}
                    </div>

                    <h4 className="text-xl font-bold text-[var(--theme-text)] mb-2 tracking-tight">{project.title}</h4>
                    <p className="text-[var(--theme-text-secondary)] font-light mb-6 text-sm leading-relaxed min-h-[40px]">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tech_tags?.map(t => (
                        <span key={t} className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 bg-[var(--theme-card-bg)] text-[var(--theme-text-secondary)] rounded-lg border border-[var(--theme-border)]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {user.cta_text && user.cta_link && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mt-20 md:mt-32"
                >
                  <div className="glass-card bg-[var(--theme-card-bg)] rounded-[3rem] p-8 md:p-20 border border-[var(--theme-border)] text-center relative overflow-hidden group">
                    <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                      <div className="space-y-4">
                        <h3 className="text-3xl md:text-6xl font-black text-[var(--theme-text)] tracking-tighter">
                          {user.cta_title || "Ready to work together?"}
                        </h3>
                        <p className="text-lg md:text-xl text-[var(--theme-text-secondary)] font-light leading-relaxed">
                          {user.cta_description || "Let's build something incredible. Reach out and let's start a conversation."}
                        </p>
                      </div>

                      <div className="pt-4">
                        <a
                          href={ensureAbsoluteUrl(user.cta_link || '')}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => recordClick('cta', user.cta_text || 'Primary CTA')}
                          className="inline-flex items-center gap-4 bg-[var(--theme-accent)] text-[var(--theme-accent-text)] px-10 py-5 rounded-[2rem] font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-[var(--theme-accent)]/20 group"
                        >
                          {user.cta_text}
                          <FaArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                        </a>
                      </div>
                    </div>

                    {/* Background Accents */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--theme-accent)] blur-[100px] -z-10 group-hover:bg-[var(--theme-accent)] opacity-20 transition-colors" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 blur-[100px] -z-10" />
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 text-center text-[var(--theme-text-secondary)] text-sm font-medium tracking-widest uppercase"
        >
          Built with <span className="text-[var(--theme-text)]">DevBio.co</span>
        </motion.footer>
      </main>

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