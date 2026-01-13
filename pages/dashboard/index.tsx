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
import WelcomeModal from "../../components/dashboard/WelcomeModal";
import StatusModal from "../../components/dashboard/edit/StatusModal";
import CTAModal from "../../components/dashboard/edit/CTAModal";
import Portal from "../../components/Portal";
import { useAuth } from '../../lib/AuthContext';
import { toast } from 'react-toastify';
import { ALL_TECHS, Tech, THEME_CONFIG } from '../../lib/constants';
import { ensureAbsoluteUrl } from '../../lib/utils';
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
  FaCamera,
  FaCode,
  FaUser,
  FaCog
} from "react-icons/fa";
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Confetti from 'react-confetti';

type Project = {
  title: string;
  description: string;
  url: string;
  tech: string[];
  image?: string;
};



const DashboardPage: React.FC = () => {
  const { user, supabase } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Data States

  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [bio, setBio] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [username, setUsername] = useState("");
  const [githubUsername, setGithubUsername] = useState("");
  const [githubGraphTitle, setGithubGraphTitle] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [ctaTitle, setCtaTitle] = useState("");
  const [ctaDescription, setCtaDescription] = useState("");
  const [ctaText, setCtaText] = useState("");
  const [ctaLink, setCtaLink] = useState("");
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
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [ctaModalOpen, setCtaModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [techSearch, setTechSearch] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const router = useRouter();

  useEffect(() => {
    // Handle window resize for confetti
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    if (typeof window !== 'undefined') {
      handleResize();
      window.addEventListener('resize', handleResize);
    }

    // Check for welcome flag
    const hasCelebrated = localStorage.getItem('hasCelebrated');
    if (router.query.welcome === 'true' && !hasCelebrated) {
      setShowConfetti(true);
      setShowWelcomeModal(true);
      localStorage.setItem('hasCelebrated', 'true');

      // Clean up the URL
      const newPath = router.pathname;
      router.replace(newPath, undefined, { shallow: true });

      // Stop confetti after 5 seconds
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => {
        window.removeEventListener('resize', handleResize);
        clearTimeout(timer);
      };
    } else if (router.query.welcome === 'true' && hasCelebrated) {
      // Just clean the URL if they already celebrated
      const newPath = router.pathname;
      router.replace(newPath, undefined, { shallow: true });
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, [router.query.welcome, router.pathname, router]);

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
          setName(profile.full_name || "");
          setProfession(profile.profession || "");
          setBio(profile.bio || "");
          setAboutMe(profile.about_me || "");
          setUsername(profile.username || "");
          setGithubUsername(profile.github_username || "");
          setGithubGraphTitle(profile.github_graph_title || "");
          setAvatarUrl(profile.avatar_url || "");
          setIsAvailable(profile.is_available ?? false);
          setStatusText(profile.status_message || "");
          setCtaTitle(profile.cta_title || "");
          setCtaDescription(profile.cta_description || "");
          setCtaText(profile.cta_text || "");
          setCtaLink(profile.cta_link || "");
          setTheme(profile.theme || 'onyx');

          if (profile.tech_stack) {
            const dbTechs = profile.tech_stack as { name: string }[];
            const rehydrated = dbTechs.map(t => {
              const matched = ALL_TECHS.find(at => at.name === t.name);
              return matched ? matched : { ...t, icon: <FaCode /> };
            });
            setTechStack(rehydrated);
          }

          if (profile.social_links) {
            const dbSocials = profile.social_links as { name: string; href: string }[];
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
      } catch (error: unknown) {
        console.error(error);
        toast.error('Failed to load profile data.');
      } finally {
        setFetching(false);
      }
    };

    fetchData();
  }, [user, supabase]);

  const autoSaveProfile = async (updates: Record<string, unknown>) => {
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
      console.error(err);
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
      } catch (error: unknown) {
        console.error(error);
        toast.error('Error uploading image');
      }
    }
  };

  // Show skeleton instead of full-page spinner
  const isLight = false;

  const bgConfig = THEME_CONFIG[theme] || 'bg-black';
  const isImageBg = bgConfig.startsWith('http');

  return (
    <DashboardLayout>
      {showConfetti && (
        <Portal>
          <div className="fixed inset-0 z-[1000] pointer-events-none">
            <Confetti
              width={windowSize.width}
              height={windowSize.height}
              recycle={true}
              numberOfPieces={400}
              gravity={0.15}
              colors={['#3B82F6', '#60A5FA', '#93C5FD', '#FFFFFF', '#1E40AF']}
            />
          </div>
        </Portal>
      )}

      <WelcomeModal
        isOpen={showWelcomeModal}
        onClose={() => {
          setShowWelcomeModal(false);
          setShowConfetti(false);
        }}
      />

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
            <div className={`flex items-center gap-2 px-4 md:px-6 py-3 border-r border-white/10 pr-4 md:pr-6 shrink-0 ${(saving || fetching) ? 'opacity-100' : 'opacity-50'}`}>
              <div className={`w-2 h-2 rounded-full ${(saving || fetching) ? 'bg-yellow-500' : 'bg-green-500'} animate-pulse`} />
              <span className="text-[10px] font-black uppercase tracking-widest text-white/40">
                {fetching ? 'Loading...' : saving ? 'Syncing...' : 'Live Sync'}
              </span>
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
        <div className={`max-w-7xl mx-auto px-6 relative z-10 transition-opacity duration-300 ${fetching ? 'opacity-50' : 'opacity-100'}`}>
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
                  <div onClick={() => fileInputRef.current?.click()} className={`w-32 h-32 md:w-48 md:h-48 rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border-4 ${isLight ? 'border-slate-300' : 'border-white/10'} relative cursor-pointer flex items-center justify-center bg-white/5`}>
                    {avatarUrl ? (
                      <Image src={avatarUrl} alt="Avatar" fill className="object-cover" />
                    ) : (
                      <FaUser className="text-white/10 text-5xl md:text-7xl" />
                    )}
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
                        {React.cloneElement(social.icon as React.ReactElement<{ size: number; className: string }>, { size: 20, className: `${isLight ? 'text-black/40' : 'text-white/40'} group-hover:text-blue-400 transition-colors` })}
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
              <div className={`glass-card rounded-[2rem] p-6 md:p-8 border ${isLight ? 'border-slate-300' : 'border-white/5'} group relative min-h-[200px]`}>

                {githubUsername && (
                  <button
                    onClick={() => setGithubModalOpen(true)}
                    className="absolute top-4 right-4 z-30 w-8 h-8 glass rounded-full flex items-center justify-center text-white/20 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                  >
                    <FaCog size={14} />
                  </button>
                )}

                <div className="flex justify-between items-start mb-2 z-20 relative">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-white"><FaGithub size={20} /></div>
                    <InlineEdit
                      value={githubGraphTitle}
                      onSave={(val) => { setGithubGraphTitle(val); autoSaveProfile({ github_graph_title: val }); }}
                      className={`text-xl md:text-2xl font-black ${isLight ? 'text-slate-900' : 'text-white'} tracking-tight cursor-text hover:text-blue-400 transition-colors`}
                      placeholder="GitHub DNA"
                    />
                  </div>
                </div>

                {!githubUsername && (
                  <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center backdrop-blur-[2px] rounded-[2rem]">
                    <button onClick={() => setGithubModalOpen(true)} className="bg-white text-black px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:scale-110 transition-all shadow-xl">Sync GitHub DNA</button>
                  </div>
                )}

                <div className="w-full flex items-center justify-center relative z-0 mt-2">
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
                    <span key={tech.name} className={`px-4 py-2 md:px-6 md:py-3 glass rounded-xl md:rounded-2xl text-[10px] md:text-sm font-bold ${isLight ? 'text-black/40' : 'text-white/40'} hover:text-blue-400 ${isLight ? 'border-black/5' : 'border-white/5'} cursor-pointer transition-all hover:scale-110 active:scale-95 whitespace-nowrap flex items-center gap-2`}>
                      <span className="text-lg opacity-80">{tech.icon}</span>
                      <span>{tech.name}</span>
                    </span>
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

              <div
                onClick={() => setStatusModalOpen(true)}
                className={`glass-card rounded-[1.5rem] p-8 border ${isLight ? 'border-slate-300' : 'border-white/5'} flex items-center justify-between group cursor-pointer hover:border-blue-500/30 transition-all`}
              >
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Current Status</span>
                  <div className="flex flex-col gap-1">
                    <span className={`text-sm font-black flex items-center gap-3 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      <span className={`w-2.5 h-2.5 rounded-full ${isAvailable ? 'bg-green-500' : 'bg-red-500'} ${isAvailable ? 'animate-pulse' : ''}`} />
                      {isAvailable ? 'Available' : 'Focused'}
                    </span>
                    <span className="text-xs text-white/40 font-medium truncate max-w-[180px]">
                      {statusText || (isAvailable ? "Set availability text..." : "Set focus text...")}
                    </span>
                  </div>
                </div>
                <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-white/20 group-hover:text-blue-400 group-hover:bg-blue-500/10 transition-all">
                  <FaPlus size={14} />
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
                      <div className="w-16 h-16 rounded-2xl overflow-hidden relative border border-white/10 bg-white/5 flex items-center justify-center">
                        {p.image ? (
                          <Image src={p.image} alt={p.title} fill className="object-cover" />
                        ) : (
                          <FaCode className="text-white/10" size={28} />
                        )}
                      </div>
                      <a href={ensureAbsoluteUrl(p.url)} target="_blank" rel="noreferrer" className="p-3 glass rounded-xl text-white/40 hover:text-white transition-colors"><FaExternalLinkAlt size={14} /></a>
                    </div>
                    <h4 className={`text-xl font-bold ${isLight ? 'text-slate-900' : 'text-white'} mb-2 tracking-tight`}>{p.title}</h4>
                    <p className={`${isLight ? 'text-black/40' : 'text-white/40'} font-light mb-6 text-sm leading-relaxed line-clamp-2`}>{p.description}</p>
                    <div className="flex flex-wrap gap-2">{p.tech.map(t => <span key={t} className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 bg-white/5 text-white/40 rounded-lg">{t}</span>)}</div>
                  </div>
                ))}
              </div>

              {/* Primary Action Card - Dashboard Footer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-12"
              >
                <div
                  onClick={() => setCtaModalOpen(true)}
                  className={`glass-card rounded-[2rem] p-10 border ${isLight ? 'border-slate-300' : 'border-white/10'} bg-gradient-to-br from-blue-600/5 to-purple-600/5 flex flex-col md:flex-row items-center justify-between gap-8 group cursor-pointer hover:border-blue-500/30 transition-all shadow-2xl shadow-blue-500/5 overflow-hidden relative`}
                >
                  <div className="relative z-10 text-center md:text-left">
                    <span className="text-[10px] uppercase tracking-widest text-blue-400 font-black mb-3 block">Conversion Engine</span>
                    <h4 className={`text-2xl md:text-3xl font-black ${isLight ? 'text-slate-900' : 'text-white'} tracking-tight mb-2`}>
                      {ctaTitle || "Primary Action Area"}
                    </h4>
                    <p className="text-white/40 font-light max-w-xl">
                      {ctaDescription || "Set up your footer call-to-action to convert visitors into leads."}
                    </p>
                  </div>

                  <div className="relative z-10 flex items-center gap-6">
                    <div className="flex flex-col items-center md:items-end">
                      <span className={`text-lg font-black ${isLight ? 'text-slate-900' : 'text-white'} mb-1`}>{ctaText || "Add Action"}</span>
                      <span className="text-xs text-white/20 font-mono">{ctaLink || "No link set"}</span>
                    </div>
                    <div className="w-14 h-14 bg-white text-black rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all">
                      <FaPlus size={20} />
                    </div>
                  </div>

                  {/* Aesthetic backgrounds */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] -z-10 group-hover:bg-blue-500/20 transition-colors" />
                </div>
              </motion.div>
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
            setTechModalOpen={(open) => {
              const isOpen = typeof open === 'function' ? open(techModalOpen) : open;
              if (!isOpen) {
                autoSaveProfile({ tech_stack: techStack.map(t => ({ name: t.name })) }).then(() => {
                  toast.success("Tech stack updated!");
                });
              }
              setTechModalOpen(isOpen);
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
            setSocialModalOpen={(open) => {
              const isOpen = typeof open === 'function' ? open(socialModalOpen) : open;
              if (!isOpen) {
                autoSaveProfile({ social_links: socials.map(s => ({ name: s.name, href: s.href })) }).then(() => {
                  toast.success("Social links updated!");
                });
              }
              setSocialModalOpen(isOpen);
            }}
          />
        )}
        {shareModalOpen && (
          <ShareModal
            username={username}
            onClose={() => setShareModalOpen(false)}
          />
        )}
        {statusModalOpen && (
          <StatusModal
            isOpen={statusModalOpen}
            onClose={() => setStatusModalOpen(false)}
            isAvailable={isAvailable}
            statusText={statusText}
            onSave={(isAvail, text) => {
              setIsAvailable(isAvail);
              setStatusText(text);
              autoSaveProfile({ is_available: isAvail, status_message: text });
              toast.success("Identity status updated!");
            }}
          />
        )}
        {ctaModalOpen && (
          <CTAModal
            isOpen={ctaModalOpen}
            onClose={() => setCtaModalOpen(false)}
            ctaTitle={ctaTitle}
            ctaDescription={ctaDescription}
            ctaText={ctaText}
            ctaLink={ctaLink}
            onSave={(title, desc, text, link) => {
              setCtaTitle(title);
              setCtaDescription(desc);
              setCtaText(text);
              setCtaLink(link);
              autoSaveProfile({
                cta_title: title,
                cta_description: desc,
                cta_text: text,
                cta_link: link
              });
              toast.success("Primary action updated!");
            }}
          />
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default DashboardPage;