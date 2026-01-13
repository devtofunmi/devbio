import React from "react";
import Image from "next/image";
import { GetServerSideProps } from "next";
import { FaGithub, FaTwitter, FaLinkedin, FaYoutube, FaExternalLinkAlt, FaCode, FaInfoCircle, FaUser, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabaseClient";
import GitHubCard from "../components/GitHubCard";
import PublicShareModal from "../components/PublicShareModal";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { FiShare2 } from "react-icons/fi";
import { THEME_CONFIG, SOCIAL_BASE_URLS } from "../lib/constants";
import { ensureAbsoluteUrl, formatSocialHref } from "../lib/utils";

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
  cta_title?: string;
  cta_description?: string;
  cta_text?: string;
  cta_link?: string;
  theme?: string;
  beams_enabled?: boolean;
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
    .order('created_at', { ascending: false });

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
  const bgConfig = THEME_CONFIG[user.theme || 'onyx'] || 'bg-black';
  const isImageBg = bgConfig.startsWith('http');

  return (
    <div className={`relative min-h-screen ${isImageBg ? 'bg-transparent' : bgConfig} text-white selection:bg-blue-500/30 transition-colors duration-700`}>
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
          <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative flex items-center justify-center glass rounded-full border-blue-500/20 group-hover:border-blue-500/50 p-2 md:p-3 shadow-2xl transition-all duration-500 backdrop-blur-3xl overflow-hidden">
            {/* Animated Background Sweep */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            {/* Neon Icon Core */}
            <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(59,130,246,0.6)] group-hover:shadow-[0_0_35px_rgba(59,130,246,0.8)] transition-all group-hover:scale-105 relative z-10">
              <FiShare2 size={24} className="group-hover:rotate-12 transition-transform" />
            </div>

            {/* Interactive Border */}
            <div className="absolute inset-0 border border-blue-500/0 group-hover:border-blue-500/20 rounded-full m-[1px]" />
          </div>
        </button>
      </motion.div>

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-16 relative z-10">
        {/* Hero Section: Profile Identity */}
        <div className="mb-10 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative group p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden min-h-[400px] md:min-h-[450px] flex flex-col justify-end border border-white/10"
          >
            {/* High-End Background Effect */}
            <div className="absolute inset-0 z-0">
              <Image
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&q=80"
                alt="Cover"
                fill
                className="object-cover scale-105 group-hover:scale-100 transition-transform duration-[2s] opacity-40 blur-sm"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent" />
              <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-500/10 blur-[150px] rounded-full" />
              <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-purple-500/10 blur-[120px] rounded-full" />
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start gap-8 md:gap-12 text-center lg:text-left">
              {/* Avatar Container */}
              <div className="relative shrink-0">
                <div className="w-32 h-32 md:w-48 md:h-48 rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border-4 border-white/10 relative bg-white/5 flex items-center justify-center">
                  {user.avatar_url ? (
                    <Image
                      src={user.avatar_url}
                      alt={user.full_name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <FaUser className="text-white/10 text-5xl md:text-7xl" />
                  )}
                </div>
                {user.is_available && (
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 md:w-12 md:h-12 bg-green-500 rounded-xl md:rounded-2xl flex items-center justify-center text-white border-4 border-black group-hover:scale-110 transition-transform">
                    <span className="w-3 h-3 rounded-full bg-white animate-pulse" />
                  </div>
                )}
              </div>

              {/* Info Section */}
              <div className="flex-1 space-y-6 w-full overflow-hidden">
                <div className="flex flex-col gap-2">
                  <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-white block leading-[1.1]">
                    {user.full_name}
                  </h1>
                  <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                    <p className="text-lg md:text-2xl text-blue-400 font-bold tracking-tight leading-tight">
                      {user.profession}
                    </p>
                  </div>
                </div>

                <div className="max-w-2xl mx-auto lg:mx-0">
                  <p className="text-base md:text-xl text-white/50 leading-relaxed font-light">
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
                        className="glass rounded-2xl p-4 flex items-center justify-center border border-white/10 hover:border-blue-500/30 transition-all cursor-pointer group"
                        title={social.name}
                      >
                        <div className="text-white/40 group-hover:text-blue-400 transition-colors">
                          {SOCIAL_ICONS[social.name] || <FaExternalLinkAlt size={20} />}
                        </div>
                      </a>
                    )
                  ))}
                </div>
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
                <div className="glass-card rounded-[2rem] p-6 md:p-8 border border-white/10 overflow-hidden h-fit relative">
                  <div className="flex items-center gap-4 ">
                    <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-white"><FaGithub size={20} /></div>
                    <h4 className="text-xl md:text-2xl font-black text-white tracking-tight leading-none">
                      {user.github_graph_title}
                    </h4>
                  </div>
                  <div className="w-full h-full flex items-center justify-center">
                    <GitHubCard githubUsername={user.github_username} size={48} />
                  </div>
                </div>
              )}

              {hasTech && (
                <div className="glass-card rounded-[2rem] p-6 md:p-10 border border-white/10">
                  <div className="flex justify-between items-center mb-6 md:mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-blue-400">
                        <FaCode size={18} />
                      </div>
                      <h4 className="text-xl md:text-2xl font-black text-white tracking-tight leading-none">Tech Stack</h4>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {(user.tech_stack as TechItem[]).map((tech) => (
                      <span key={tech.name} className="px-4 py-2 md:px-6 md:py-3 glass rounded-xl md:rounded-2xl text-[10px] md:text-sm font-bold text-white/40 hover:text-blue-400 border-white/5 cursor-pointer transition-all hover:scale-110 active:scale-95 whitespace-nowrap">
                        {tech.name}
                      </span>
                    ))}
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
              <div className="glass-card rounded-[2rem] p-10 border border-white/10 bg-white/[0.01]">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-purple-400">
                      <FaInfoCircle size={18} />
                    </div>
                    <h4 className="text-xl font-black text-white tracking-tight">About Me</h4>
                  </div>
                </div>
                <p className="text-sm text-white/40 leading-relaxed font-light min-h-[120px] whitespace-pre-wrap">
                  {user.about_me}
                </p>
              </div>
            )}

            {/* Status Card */}
            <div className="glass-card rounded-[1.5rem] p-8 border border-white/10 flex items-center justify-between group">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Current Status</span>
                <span className="text-sm font-black flex items-center gap-3 text-white">
                  <span className={`w-2.5 h-2.5 rounded-full ${user.is_available ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
                  {user.status_message || (user.is_available ? 'Available' : 'Focused')}
                </span>
              </div>
            </div>
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
                  <h3 className="text-4xl font-black text-white tracking-tighter mb-2">Featured Projects</h3>
                  <p className="text-white/30 font-light">Showcase of best builds and creations.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, i) => (
                  <div key={project.id || i} className="glass-card rounded-[2rem] p-6 border border-white/10 group hover:border-blue-500/30 transition-all flex flex-col h-full">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden relative border border-white/10 bg-white/[0.03] flex items-center justify-center">
                        {project.image_url ? (
                          <Image
                            src={project.image_url}
                            alt={project.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <FaCode size={24} className="text-white/10" />
                        )}
                      </div>
                      {project.url && (
                        <a
                          href={ensureAbsoluteUrl(project.url)}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => recordClick('project', project.title)}
                          className="p-3 glass rounded-xl text-white/40 hover:text-white transition-colors hover:bg-white/10"
                        >
                          <FaExternalLinkAlt size={14} />
                        </a>
                      )}
                    </div>

                    <h4 className="text-xl font-bold text-white mb-2 tracking-tight">{project.title}</h4>
                    <p className="text-white/40 font-light mb-6 text-sm leading-relaxed min-h-[40px]">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tech_tags?.map(t => (
                        <span key={t} className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 bg-white/5 text-white/40 rounded-lg border border-white/5">
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
                  <div className="glass-card rounded-[3rem] p-8 md:p-20 border border-white/10 text-center relative overflow-hidden group">
                    <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                      <div className="space-y-4">
                        <h3 className="text-3xl md:text-6xl font-black text-white tracking-tighter">
                          {user.cta_title || "Ready to work together?"}
                        </h3>
                        <p className="text-lg md:text-xl text-white/40 font-light leading-relaxed">
                          {user.cta_description || "Let's build something incredible. Reach out and let's start a conversation."}
                        </p>
                      </div>

                      <div className="pt-4">
                        <a
                          href={ensureAbsoluteUrl(user.cta_link)}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => recordClick('cta', user.cta_text || 'Primary CTA')}
                          className="inline-flex items-center gap-4 bg-white text-black px-10 py-5 rounded-[2rem] font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-white/10 group"
                        >
                          {user.cta_text}
                          <FaArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                        </a>
                      </div>
                    </div>

                    {/* Background Accents */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] -z-10 group-hover:bg-blue-500/20 transition-colors" />
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
          className="mt-16 text-center text-white/20 text-sm font-medium tracking-widest uppercase"
        >
          Built with <span className="text-white/40">DevBio.co</span>
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