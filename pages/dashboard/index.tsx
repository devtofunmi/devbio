import React, { useState, useMemo, useRef, useEffect } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { motion, AnimatePresence } from "framer-motion";
import InlineEdit from "../../components/dashboard/edit/InlineEdit";
import GithubCard from "../../components/GitHubCard";
import ProjectModal from "../../components/dashboard/edit/ProjectModal";
import TechStackModal from "../../components/dashboard/edit/TechStackModal";
import GitHubModal from "../../components/dashboard/edit/GitHubModal";
import SocialModal from "../../components/dashboard/edit/SocialModal";
import ShareModal from "../../components/dashboard/ShareModal";
// import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useAuth } from '../../lib/AuthContext';
import { toast } from 'react-toastify';
import { ALL_TECHS, Tech } from '../../lib/constants';
import {
  FaPlus,
  FaTwitter,
  FaGithub,
  FaLinkedin,
  FaYoutube,
  FaExternalLinkAlt,
  FaMagic,
  FaShareAlt,
  FaPalette,
  FaInfoCircle,
  FaReact,
  FaNodeJs,
  FaCamera,
  FaCode,
  FaAws,
  FaMicrosoft
} from "react-icons/fa";
import Link from 'next/link';
import Image from 'next/image';

type Project = {
  title: string;
  description: string;
  url: string;
  tech: string[];
  image?: string;
};

const ensureAbsoluteUrl = (url: string) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `https://${url}`;
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
  'matrix': 'https://images.unsplash.com/photo-1550684848-86a5d8727436?w=1600&q=80', // Midnight Mesh
  'circuit': 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1600&q=80', // Dark Nebula
  'terminal': 'https://images.unsplash.com/photo-1519750783826-e2420f4d687f?w=1600&q=80', // Cosmic Dusk (New URL)
  'workspace': 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=1600&q=80', // Abstract Flow (New URL)
  'nodes': 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=1600&q=80',
  'glass': 'https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?w=1600&q=80',
  'velvet': 'https://images.unsplash.com/photo-1557683316-973673baf926?w=1600&q=80',
  'aurora': 'https://images.unsplash.com/photo-1536431311719-398b6704d4cc?w=1600&q=80',
  'silence': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80',
  'prism': 'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=1600&q=80',
  'cloud': 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=1600&q=80',
  'smoke': 'https://images.unsplash.com/photo-1541450805268-4822a3a774ca?w=1600&q=80',
  'mesh': 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1600&q=80',
  'flow': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&q=80',
};

const DashboardPage: React.FC = () => {
  const { user, supabase } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Data States
  const [profileId, setProfileId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [bio, setBio] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [username, setUsername] = useState("");
  const [githubUsername, setGithubUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [theme, setTheme] = useState('onyx');


  // Loading State
  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);

  // Content States
  const [projects, setProjects] = useState<Project[]>([]);
  const [techStack, setTechStack] = useState<Tech[]>([]);
  const [socials, setSocials] = useState([
    { name: 'Twitter', icon: <FaTwitter />, href: '' },
    { name: 'GitHub', icon: <FaGithub />, href: '' },
    { name: 'LinkedIn', icon: <FaLinkedin />, href: '' },
    { name: 'YouTube', icon: <FaYoutube />, href: '' },
  ]);

  // Modal States
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [techModalOpen, setTechModalOpen] = useState(false);
  const [githubModalOpen, setGithubModalOpen] = useState(false);
  const [socialModalOpen, setSocialModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [techSearch, setTechSearch] = useState("");

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      setFetching(true);
      try {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError) throw profileError;

        if (profile) {
          setProfileId(profile.id);
          setName(profile.full_name || "");
          setProfession(profile.profession || "");
          setBio(profile.bio || "");
          setAboutMe(profile.about_me || "");
          setUsername(profile.username || "");
          setGithubUsername(profile.github_username || "");
          setAvatarUrl(profile.avatar_url || "");
          setIsAvailable(profile.is_available ?? true);
          setTheme(profile.theme || 'onyx');

          if (profile.tech_stack) {
            const dbTechs = profile.tech_stack as any[];
            const rehydrated = dbTechs.map(t => {
              const matched = ALL_TECHS.find(at => at.name === t.name);
              return matched ? matched : t;
            });
            setTechStack(rehydrated);
          }

          if (profile.social_links) {
            const dbSocials = profile.social_links as any[];
            setSocials(prev => prev.map(s => {
              const dbMatch = dbSocials.find(dbs => dbs.name === s.name);
              return dbMatch ? { ...s, href: dbMatch.href } : s;
            }));
          }
        }

        const { data: userProjects, error: projectsError } = await supabase
          .from('projects')
          .select('*')
          .eq('user_id', user.id);

        if (projectsError) throw projectsError;
        if (userProjects) {
          setProjects(userProjects.map(p => ({ ...p, tech: p.tech_tags || [], image: p.image_url })));
        }
      } catch (error: any) {
        toast.error('Failed to load profile data.');
      } finally {
        setFetching(false);
      }
    };

    fetchData();
  }, [user]);

  const autoSaveProfile = async (updates: any) => {
    if (!user) return;
    setSaving(true);
    try {
      const { error } = await supabase.from('profiles').upsert({
        id: user.id,
        ...updates,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
    } catch (err) {
      toast.error("Cloud sync failed");
    } finally {
      setTimeout(() => setSaving(false), 500);
    }
  };

  const filteredTechs = useMemo(() => {
    const filtered = ALL_TECHS.filter(t => t.name.toLowerCase().includes(techSearch.toLowerCase()));

    // Add custom option if search has value and no exact match
    if (techSearch && !ALL_TECHS.some(t => t.name.toLowerCase() === techSearch.toLowerCase())) {
      filtered.unshift({ name: techSearch, icon: <FaCode /> });
    }

    return filtered;
  }, [techSearch]);

  const handleTechToggle = (tech: Tech) => {
    setTechStack(prev =>
      prev.some(t => t.name === tech.name)
        ? prev.filter(t => t.name !== tech.name)
        : [...prev, tech]
    );
  };

  const handleSocialChange = (name: string, href: string) => {
    setSocials(prev => prev.map(s => s.name === name ? { ...s, href } : s));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && user) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatarUrl(reader.result as string);
      reader.readAsDataURL(file);

      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}-${Math.random()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage.from('images').upload(fileName, file);
        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(fileName);
        setAvatarUrl(publicUrl);
        await supabase.from('profiles').update({ avatar_url: publicUrl }).eq('id', user.id);
        toast.success('Avatar updated!');
      } catch (error: any) {
        toast.error('Error uploading image');
      }
    }
  };

  if (fetching) return <div className="min-h-screen bg-black flex items-center justify-center"><div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" /></div>;

  const isLight = false;

  const bgConfig = THEME_CONFIG[theme] || 'bg-black';
  const isImageBg = bgConfig.startsWith('http');

  return (
    <DashboardLayout>
      <div className={`relative pt-12 min-h-screen ${isImageBg ? 'bg-transparent' : bgConfig} text-white transition-colors duration-700 pb-20`}>
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

        <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />

        {/* Floating Top Bar */}
        <div className="fixed top-6 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-12 z-[100] w-[92%] md:w-auto">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="glass backdrop-blur-xl bg-black/60 p-2 rounded-[2rem] border-white/10 flex items-center justify-between md:justify-start gap-2 w-full md:w-auto"
          >
            <div className={`flex items-center gap-2 px-4 md:px-6 py-3 border-r border-white/10 pr-4 md:pr-6 shrink-0 ${saving ? 'opacity-100' : 'opacity-50'}`}>
              <div className={`w-2 h-2 rounded-full ${saving ? 'bg-yellow-500' : 'bg-green-500'} animate-pulse`} />
              <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{saving ? 'Syncing...' : 'Live Sync'}</span>
            </div>

            <div className="flex items-center gap-1 md:gap-2 px-2 flex-1 justify-end md:justify-start">
              <Link href="/dashboard/themes">
                <button className="p-3 cursor-pointer glass rounded-xl text-white/40 hover:text-white transition-all hover:bg-white/5" title="Custom Theme">
                  <FaPalette size={16} />
                </button>
              </Link>
              <button onClick={() => setShareModalOpen(true)} className="p-3 cursor-pointer glass rounded-xl text-white/40 hover:text-white transition-all hover:bg-white/5" title="Share Page">
                <FaShareAlt size={16} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="mb-10 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`relative group p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden min-h-[400px] md:min-h-[450px] flex flex-col justify-end border ${isLight ? 'border-slate-300' : 'border-white/5'}`}
            >
              <div className="absolute inset-0 z-0">
                <Image
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&q=80"
                  alt="Profile Aura"
                  fill
                  className="object-cover scale-105 group-hover:scale-110 transition-transform duration-[2s] opacity-20 blur-sm"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
              </div>

              <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start gap-8 md:gap-12 text-center lg:text-left">
                <div className="relative group/avatar shrink-0">
                  <div onClick={() => fileInputRef.current?.click()} className={`w-32 h-32 md:w-48 md:h-48 rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border-4 ${isLight ? 'border-slate-300' : 'border-white/10'} relative cursor-pointer`}>
                    <Image src={avatarUrl || "https://avatars.githubusercontent.com/u/1?v=4"} alt="Avatar" fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex flex-col items-center justify-center backdrop-blur-sm">
                      <FaCamera className="text-white text-3xl mb-2" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-white">Upload Brand</span>
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 md:w-12 md:h-12 bg-blue-600 rounded-xl md:rounded-2xl flex items-center justify-center text-white border-4 border-black">
                    <FaMagic size={18} className="animate-pulse" />
                  </div>
                </div>

                <div className="flex-1 space-y-6 w-full overflow-hidden">
                  <div className="flex flex-col gap-2">
                    <InlineEdit
                      value={name}
                      onSave={(val) => { setName(val); autoSaveProfile({ full_name: val }); }}
                      className="text-4xl md:text-7xl font-black tracking-tighter text-white block leading-[1.1]"
                      placeholder="Your Name"
                    />
                    <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                      <InlineEdit
                        value={profession}
                        onSave={(val) => { setProfession(val); autoSaveProfile({ profession: val }); }}
                        className="text-lg md:text-2xl text-blue-400 font-bold tracking-tight leading-tight"
                        placeholder="Your Profession"
                      />
                      <span className="hidden lg:block w-1.5 h-1.5 rounded-full bg-white/20" />
                      <div className="flex items-center justify-center lg:justify-start gap-1.5 text-white/40 font-mono text-xs md:text-sm">
                        <span>devbio.co/</span>
                        <InlineEdit
                          value={username}
                          onSave={(val) => { setUsername(val); autoSaveProfile({ username: val }); }}
                          className={`text-white hover:text-blue-400 transition-colors ${isLight ? 'text-slate-900' : ''}`}
                          placeholder="username"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="max-w-2xl mx-auto lg:mx-0">
                    <InlineEdit
                      value={bio}
                      onSave={(val) => { setBio(val); autoSaveProfile({ bio: val }); }}
                      as="textarea"
                      className={`text-base md:text-xl ${isLight ? 'text-slate-900/50' : 'text-white/50'} leading-relaxed font-light`}
                      placeholder="Add a high-impact headline/bio..."
                    />
                  </div>

                  <div className="flex flex-wrap gap-4 pt-4 items-center justify-center lg:justify-start">
                    {socials.filter(s => s.href).map((social, i) => (
                      <div key={i} className={`glass rounded-2xl p-4 flex items-center justify-center border ${isLight ? 'border-slate-300' : 'border-white/5'} hover:border-blue-500/30 transition-all cursor-pointer group`}>
                        {React.cloneElement(social.icon as any, { size: 20, className: `${isLight ? 'text-black/40' : 'text-white/40'} group-hover:text-blue-400 transition-colors` })}
                      </div>
                    ))}
                    <button onClick={() => setSocialModalOpen(true)} className={`glass rounded-2xl px-6 py-4 flex items-center justify-center gap-2 border-dashed ${isLight ? 'border-black/10 text-black/20 hover:text-black' : 'border-white/10 text-white/20 hover:text-white'} transition-all`}>
                      <FaPlus size={12} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Connect Identity</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="md:col-span-8 flex flex-col gap-8">
              <div className={`glass-card rounded-[2rem] border ${isLight ? 'border-slate-300' : 'border-white/5'} overflow-hidden group h-fit flex items-center justify-center relative min-h-[180px] md:min-h-fit`}>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-20 flex items-center justify-center backdrop-blur-[2px]">
                  <button onClick={() => setGithubModalOpen(true)} className="bg-white text-black px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:scale-110 transition-all">Sync GitHub DNA</button>
                </div>
                <div className="w-full h-full p-4 md:p-8 flex items-center justify-center">
                  <GithubCard githubUsername={githubUsername} size={48} />
                </div>
              </div>

              <div className={`glass-card rounded-[2rem] p-6 md:p-10 border ${isLight ? 'border-slate-300' : 'border-white/5'} group`}>
                <div className="flex justify-between items-center mb-6 md:mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-blue-400"><FaCode size={18} /></div>
                    <h4 className={`text-xl md:text-2xl font-black ${isLight ? 'text-slate-900' : 'text-white'} tracking-tight leading-none`}>Tech Stack</h4>
                  </div>
                  <button onClick={() => setTechModalOpen(true)} className="w-10 h-10 rounded-xl glass flex items-center justify-center text-white/20 hover:text-white transition-all"><FaPlus size={14} /></button>
                </div>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {techStack.map(tech => (
                    <span key={tech.name} className={`px-4 py-2 md:px-6 md:py-3 glass rounded-xl md:rounded-2xl text-[10px] md:text-sm font-bold ${isLight ? 'text-black/40' : 'text-white/40'} hover:text-blue-400 ${isLight ? 'border-black/5' : 'border-white/5'} cursor-pointer transition-all hover:scale-110 whitespace-nowrap`}>{tech.name}</span>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="md:col-span-4 space-y-8">
              <div className={`glass-card rounded-[2rem] p-10 border ${isLight ? 'border-slate-300' : 'border-white/5'} group bg-white/[0.01]`}>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-purple-400"><FaInfoCircle size={18} /></div>
                  <h4 className={`text-xl font-black ${isLight ? 'text-slate-900' : 'text-white'} tracking-tight`}>About Me</h4>
                </div>
                <InlineEdit
                  value={aboutMe}
                  onSave={(val) => { setAboutMe(val); autoSaveProfile({ about_me: val }); }}
                  as="textarea"
                  className={`text-sm ${isLight ? 'text-black/40' : 'text-white/40'} leading-relaxed font-light min-h-[120px]`}
                  placeholder="Tell your story..."
                />
              </div>

              <div onClick={() => { const v = !isAvailable; setIsAvailable(v); autoSaveProfile({ is_available: v }); }} className={`glass-card rounded-[1.5rem] p-8 border ${isLight ? 'border-slate-300' : 'border-white/5'} flex items-center justify-between group cursor-pointer hover:border-blue-500/30 transition-all`}>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Status</span>
                  <span className={`text-sm font-black flex items-center gap-3 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    <span className={`w-2.5 h-2.5 rounded-full ${isAvailable ? 'bg-green-500' : 'bg-red-500'} ${isAvailable ? 'animate-pulse' : ''}`} />
                    {isAvailable ? 'Available' : 'Focused'}
                  </span>
                </div>
                <div className={`w-10 h-5 rounded-full relative transition-colors ${isAvailable ? 'bg-blue-600' : 'bg-white/10'}`}>
                  <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${isAvailable ? 'left-[22px]' : 'left-1'}`} />
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="md:col-span-12">
              <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 mb-12">
                <div className="text-center md:text-left">
                  <h3 className={`text-4xl font-black ${isLight ? 'text-slate-900' : 'text-white'} tracking-tighter mb-2`}>Featured Projects</h3>
                  <p className="text-white/30 font-light">Showcase your best builds.</p>
                </div>
                <button onClick={() => setProjectModalOpen(true)} className="bg-white text-black px-8 py-4 rounded-3xl font-black flex items-center gap-3 hover:scale-105 transition-all whitespace-nowrap"><FaPlus size={14} /> <span>New Project</span></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((p, i) => (
                  <div key={i} className={`glass-card rounded-[2rem] p-6 border ${isLight ? 'border-slate-300' : 'border-white/5'} group hover:border-blue-500/30 transition-all`}>
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden relative border border-white/10 bg-white/5"><Image src={p.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80"} alt={p.title} fill className="object-cover" /></div>
                      <a href={ensureAbsoluteUrl(p.url)} target="_blank" rel="noreferrer" className="p-3 glass rounded-xl text-white/40 hover:text-white transition-colors"><FaExternalLinkAlt size={14} /></a>
                    </div>
                    <h4 className={`text-xl font-bold ${isLight ? 'text-slate-900' : 'text-white'} mb-2 tracking-tight`}>{p.title}</h4>
                    <p className={`${isLight ? 'text-black/40' : 'text-white/40'} font-light mb-6 text-sm leading-relaxed line-clamp-2`}>{p.description}</p>
                    <div className="flex flex-wrap gap-2">{p.tech.map(t => <span key={t} className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 bg-white/5 text-white/40 rounded-lg">{t}</span>)}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {projectModalOpen && (
          <ProjectModal
            projects={projects}
            onClose={() => setProjectModalOpen(false)}
            onSave={(newProjects) => { setProjects(newProjects); setProjectModalOpen(false); }}
          />
        )}
        {techModalOpen && (
          <TechStackModal
            techStack={techStack}
            techSearch={techSearch}
            setTechSearch={setTechSearch}
            filteredTechs={filteredTechs}
            handleTechToggle={handleTechToggle}
            setTechModalOpen={async (open) => {
              if (!open) {
                await autoSaveProfile({ tech_stack: techStack.map(t => ({ name: t.name })) });
                toast.success("Tech stack updated!");
              }
              setTechModalOpen(open as any);
            }}
          />
        )}
        {githubModalOpen && (
          <GitHubModal
            githubUsername={githubUsername}
            onClose={() => setGithubModalOpen(false)}
            onSave={async (newUsername) => {
              setGithubUsername(newUsername);
              await autoSaveProfile({ github_username: newUsername });
              setGithubModalOpen(false);
              toast.success("GitHub identity synced!");
            }}
          />
        )}
        {socialModalOpen && (
          <SocialModal
            socials={socials}
            handleSocialChange={handleSocialChange}
            setSocialModalOpen={async (open) => {
              if (!open) {
                await autoSaveProfile({ social_links: socials.map(s => ({ name: s.name, href: s.href })) });
                toast.success("Social links updated!");
              }
              setSocialModalOpen(open as any);
            }}
          />
        )}
        {shareModalOpen && (
          <ShareModal
            username={username}
            onClose={() => setShareModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default DashboardPage;