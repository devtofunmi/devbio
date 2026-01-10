import React from "react";
import Image from "next/image";
import { GetServerSideProps } from "next";
import { FaGithub, FaTwitter, FaLinkedin, FaYoutube, FaExternalLinkAlt, FaCode, FaInfoCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabaseClient";
import GitHubCard from "../components/GitHubCard";
import PublicShareModal from "../components/PublicShareModal";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { FiShare2 } from "react-icons/fi";

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
  social_links: SocialLink[];
  tech_stack: TechItem[];
  is_available: boolean;
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

const SOCIAL_BASE_URLS: Record<string, string> = {
  'Twitter': 'https://twitter.com/',
  'GitHub': 'https://github.com/',
  'LinkedIn': 'https://linkedin.com/in/',
  'YouTube': 'https://youtube.com/@',
};

const THEME_CONFIG: Record<string, string> = {
  'onyx': 'bg-black',
  'ghost': 'bg-[#080808]',
  'midnight': 'bg-[#020617]',
  'forest': 'bg-[#051f1b]',
  'dracula': 'bg-[#130912]',
  'cobalt': 'bg-[#040a1d]',
  'carbon': 'bg-[#141414]',
  'nord': 'bg-[#1a202c]',
  'ember': 'bg-[#17110e]',
  'dim': 'bg-[#15151a]',
  'alabaster': 'bg-[#1e293b]',
  'matrix': 'https://images.unsplash.com/photo-1550684848-86a5d8727436?w=1600&q=80',
  'circuit': 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1600&q=80',
  'terminal': 'https://images.unsplash.com/photo-1519750783826-e2420f4d687f?w=1600&q=80',
  'workspace': 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=1600&q=80',
  'nodes': 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=1600&q=80',
  'glass': 'https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?w=1600&q=80',
  'velvet': 'https://images.unsplash.com/photo-1557683316-973673baf926?w=1600&q=80',
  'obsidian': 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?w=1600&q=80',
  'aurora': 'https://images.unsplash.com/photo-1536431311719-398b6704d4cc?w=1600&q=80',
  'silence': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80',
  'prism': 'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=1600&q=80',
  'cloud': 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=1600&q=80',
  'smoke': 'https://images.unsplash.com/photo-1541450805268-4822a3a774ca?w=1600&q=80',
  'mesh': 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1600&q=80',
  'flow': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&q=80',
};

const formatSocialHref = (name: string, href: string) => {
  if (!href) return '';
  if (href.startsWith('http')) return href;

  const baseUrl = SOCIAL_BASE_URLS[name];
  if (baseUrl) {
    const cleanValue = href.startsWith('@') ? href.substring(1) : href;
    return `${baseUrl}${cleanValue}`;
  }

  return `https://${href}`;
};

const ensureAbsoluteUrl = (url: string) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `https://${url}`;
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
  const { data: projects, error: projectsError } = await supabase
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
        initial={{ opacity: 0, scale: 0.5, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
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
                <div className="w-32 h-32 md:w-48 md:h-48 rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border-4 border-white/10 relative bg-white/5">
                  {user.avatar_url && (
                    <Image
                      src={user.avatar_url}
                      alt={user.full_name}
                      fill
                      className="object-cover"
                    />
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
                        href={formatSocialHref(social.name, social.href)}
                        target="_blank"
                        rel="noreferrer"
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
                <div className="glass-card rounded-[2rem] border border-white/10 overflow-hidden h-fit flex items-center justify-center min-h-[220px]">
                  <div className="w-full h-full p-6 md:p-8 flex items-center justify-center">
                    <GitHubCard githubUsername={user.github_username} size={48} />
                  </div>
                </div>
              )}

              {hasTech && (
                <div className="glass-card rounded-[2rem] p-10 border border-white/10">
                  <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-blue-400">
                        <FaCode size={18} />
                      </div>
                      <h4 className="text-2xl font-black text-white tracking-tight leading-none">Tech Stack</h4>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {(user.tech_stack as TechItem[]).map((tech) => (
                      <span key={tech.name} className="px-6 py-3 glass rounded-2xl text-sm font-bold text-white/40 hover:text-blue-400 border-white/5 cursor-pointer transition-all hover:scale-110 active:scale-95">
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
                  {user.is_available ? 'Available for hire' : 'Focused on current role'}
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
                        <a href={ensureAbsoluteUrl(project.url)} target="_blank" rel="noreferrer" className="p-3 glass rounded-xl text-white/40 hover:text-white transition-colors hover:bg-white/10">
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