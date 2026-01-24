import React, { useState, useMemo, useRef, useEffect } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import ThemeTrigger from "../../components/dashboard/ThemeTrigger";
import { motion, AnimatePresence } from "framer-motion";
import ProjectModal from "../../components/dashboard/edit/ProjectModal";
import TechStackModal from "../../components/dashboard/edit/TechStackModal";
import GitHubModal from "../../components/dashboard/edit/GitHubModal";
import SocialModal from "../../components/dashboard/edit/SocialModal";
import ShareModal from "../../components/dashboard/ShareModal";
import WelcomeModal from "../../components/dashboard/WelcomeModal";
import StatusModal from "../../components/dashboard/edit/StatusModal";
import CTAModal from "../../components/dashboard/edit/CTAModal";
import Portal from "../../components/Portal";
import DashboardHero from "../../components/dashboard/DashboardHero";
import GitHubDNACard from "../../components/dashboard/GitHubDNACard";
import CVCard from "../../components/dashboard/cv/CVCard";
import ProjectGrid from "../../components/dashboard/ProjectGrid";
import CVDeleteModal from "../../components/dashboard/cv/CVDeleteModal";
import AboutMeCard from "../../components/dashboard/AboutMeCard";
import TechStackCard from "../../components/dashboard/TechStackCard";
import StatusCard from "../../components/dashboard/StatusCard";
import CTACard from "../../components/dashboard/CTACard";
import { useAuth } from '../../lib/AuthContext';
import { toast } from 'react-toastify';
import { ALL_TECHS, Tech, THEME_CONFIG } from '../../lib/constants';
import {
  FaPlus,
  FaGithub,
  FaLinkedin,
  FaYoutube,
  FaShareAlt,
  FaCode, // Keep FaCode for ALL_TECHS fallback
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Confetti from 'react-confetti';

type Project = {
  id?: string;
  title: string;
  description: string;
  url: string;
  tech: string[];
  image?: string;
  sort_order?: number;
};



const DashboardPage: React.FC = () => {
  const { user, supabase } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cvInputRef = useRef<HTMLInputElement>(null);

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
  const [statusIcon, setStatusIcon] = useState("💭");
  const [ctaTitle, setCtaTitle] = useState("");
  const [ctaDescription, setCtaDescription] = useState("");
  const [ctaText, setCtaText] = useState("");
  const [ctaLink, setCtaLink] = useState("");
  const [theme, setTheme] = useState('onyx');
  const [isDonor, setIsDonor] = useState(false);
  const [cvUrl, setCvUrl] = useState("");


  // Loading State
  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);

  // Content States
  const [projects, setProjects] = useState<Project[]>([]);
  const [techStack, setTechStack] = useState<Tech[]>([]);
  const [socials, setSocials] = useState([
    { name: 'X', icon: <FaXTwitter />, href: '' },
    { name: 'GitHub', icon: <FaGithub />, href: '' },
    { name: 'LinkedIn', icon: <FaLinkedin />, href: '' },
    { name: 'YouTube', icon: <FaYoutube />, href: '' },
  ]);

  // Modal States
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>(undefined);
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
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
  const [cvMenuOpen, setCvMenuOpen] = useState(false);
  const [cvDeleteModalOpen, setCvDeleteModalOpen] = useState(false);
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
          setStatusIcon(profile.status_icon || "💭");
          setCtaTitle(profile.cta_title || "");
          setCtaDescription(profile.cta_description || "");
          setCtaText(profile.cta_text || "");
          setCtaLink(profile.cta_link || "");
          setTheme(profile.theme || 'onyx');
          setIsDonor(profile.is_donor || false);
          setCvUrl(profile.cv_url || "");

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
              const legacyName = s.name === 'X' ? 'Twitter' : s.name;
              const dbMatch = dbSocials.find(dbs => dbs.name === s.name || dbs.name === legacyName);
              return dbMatch ? { ...s, href: dbMatch.href } : s;
            }));
          }
        }

        const { data: userProjects, error: projectsError } = await supabase
          .from('projects')
          .select('*')
          .eq('user_id', user.id)
          .order('sort_order', { ascending: true });

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

    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        setTheme(customEvent.detail);
      }
    };

    window.addEventListener('theme-change', handleThemeChange);

    return () => {
      window.removeEventListener('theme-change', handleThemeChange);
    };
  }, [user, supabase]);

  // Add another useEffect to apply theme when `theme` state changes (from fetch or event)
  useEffect(() => {
    if (theme) {
      const config = THEME_CONFIG[theme] || THEME_CONFIG['onyx'];
      const root = document.documentElement;
      root.style.setProperty('--theme-card-bg', config.card);
      root.style.setProperty('--theme-border', config.border);
      root.style.setProperty('--theme-accent', config.accent);
      root.style.setProperty('--theme-accent-text', config.accentText);
      root.style.setProperty('--theme-text', config.text);
      root.style.setProperty('--theme-text-secondary', config.textSecondary);
      root.style.setProperty('--theme-hero-gradient', config.heroGradient);
    }
  }, [theme]);

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

  const handleCvUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    // Check file type (PDF only for CVs)
    if (file.type !== 'application/pdf') {
      toast.error('Please upload a PDF file for your CV.');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB.');
      return;
    }

    setSaving(true);
    try {
      const safeUsername = username || user.id;
      const fileName = `${safeUsername}_CV.pdf`;
      const { error: uploadError } = await supabase.storage.from('cvs').upload(fileName, file, {
        upsert: true
      });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from('cvs').getPublicUrl(fileName);

      setCvUrl(publicUrl);
      await supabase.from('profiles').update({ cv_url: publicUrl }).eq('id', user.id);
      toast.success('CV uploaded successfully!');
    } catch (error: unknown) {
      console.error(error);
      toast.error('Error uploading CV');
    } finally {
      setSaving(false);
    }
  };

  const removeCv = async () => {
    if (!user) return;
    setSaving(true);
    try {
      await supabase.from('profiles').update({ cv_url: null }).eq('id', user.id);
      setCvUrl("");
      toast.success("CV removed.");
    } catch {
      toast.error("Failed to remove CV");
    } finally {
      setSaving(false);
    }
  };

  // Show skeleton instead of full-page spinner
  const isLight = false;

  const themeConfig = THEME_CONFIG[theme] || THEME_CONFIG['onyx'];
  const bgConfig = themeConfig.bg;
  const isImageBg = bgConfig.startsWith('http');

  const handleSaveProject = (savedProject: Project) => {
    setProjects(prev => {
      const index = prev.findIndex(p => p.id === savedProject.id);
      if (index >= 0) {
        const newArr = [...prev];
        newArr[index] = savedProject;
        return newArr;
      }
      return [savedProject, ...prev];
    });
    setProjectModalOpen(false);
  };

  const deleteProject = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
      setProjects(prev => prev.filter(p => p.id !== id));
      toast.success("Project deleted");
    } catch {
      toast.error("Failed to delete");
    }
    setOpenMenuIndex(null);
  };

  const handleReorder = async (newOrder: Project[]) => {
    setProjects(newOrder);
    try {
      const updates = newOrder.map((p, index) => ({
        id: p.id,
        user_id: user?.id,
        sort_order: index,
        title: p.title, // Add required fields for safer upsert if needed, though id should suffice for update
      }));

      const { error } = await supabase
        .from('projects')
        .upsert(updates);

      if (error) throw error;
    } catch (err) {
      console.error("Failed to save reorder:", err);
    }
  };

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

      <div
        className={`relative pt-12 min-h-screen ${isImageBg ? 'bg-transparent' : bgConfig} text-[var(--theme-text)] transition-colors duration-700 pb-20`}
      >

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
        <input type="file" ref={cvInputRef} onChange={handleCvUpload} className="hidden" accept="application/pdf" />

        {/* Floating Top Bar */}
        <div className="fixed top-6 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-12 z-[100] w-[92%] md:w-auto">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="glass backdrop-blur-xl bg-[var(--theme-card-bg)] p-2 rounded-[2rem] border-[var(--theme-border)] flex items-center justify-between md:justify-start gap-2 w-full md:w-auto"
          >
            <div className={`flex items-center gap-2 px-4 md:px-6 py-3 border-r border-[var(--theme-border)] pr-4 md:pr-6 shrink-0 ${(saving || fetching) ? 'opacity-100' : 'opacity-50'}`}>
              <div className={`w-2 h-2 rounded-full ${(saving || fetching) ? 'bg-yellow-500' : 'bg-green-500'} animate-pulse`} />
              <span className="text-[10px] font-black uppercase tracking-widest text-[var(--theme-text-secondary)]">
                {fetching ? 'Loading...' : saving ? 'Syncing...' : 'Live Sync'}
              </span>
            </div>

            <div className="flex items-center gap-1 md:gap-2 px-2 flex-1 justify-end md:justify-start">
              <ThemeTrigger />
              <button onClick={() => setShareModalOpen(true)} className="p-3 cursor-pointer glass rounded-xl text-[var(--theme-text-secondary)] hover:text-[var(--theme-text)] transition-all hover:bg-white/5" title="Share Page">
                <FaShareAlt size={16} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Main Content Area */}
        <div className={`max-w-7xl mx-auto px-6 relative z-10 transition-opacity duration-300 ${fetching ? 'opacity-50' : 'opacity-100'}`}>
          <DashboardHero
            name={name}
            profession={profession}
            bio={bio}
            avatarUrl={avatarUrl}
            isDonor={isDonor}
            socials={socials}
            onNameSave={(val) => { setName(val); autoSaveProfile({ full_name: val }); }}
            onProfessionSave={(val) => { setProfession(val); autoSaveProfile({ profession: val }); }}
            onBioSave={(val) => { setBio(val); autoSaveProfile({ bio: val }); }}
            onAvatarClick={() => fileInputRef.current?.click()}
            onSocialClick={() => setSocialModalOpen(true)}
          />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="md:col-span-8 flex flex-col gap-8">
              <GitHubDNACard
                githubUsername={githubUsername}
                githubGraphTitle={githubGraphTitle}
                onTitleSave={(val) => { setGithubGraphTitle(val); autoSaveProfile({ github_graph_title: val }); }}
                onSettingsClick={() => setGithubModalOpen(true)}
              />

              <TechStackCard
                techStack={techStack}
                onAddClick={() => setTechModalOpen(true)}
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="md:col-span-4 space-y-8">
              <AboutMeCard
                aboutMe={aboutMe}
                onSave={(val) => { setAboutMe(val); autoSaveProfile({ about_me: val }); }}
              />

              <StatusCard
                isAvailable={isAvailable}
                statusText={statusText}
                onClick={() => setStatusModalOpen(true)}
              />

              <CVCard
                cvUrl={cvUrl}
                userName={name}
                onUploadClick={() => cvInputRef.current?.click()}
                onRemoveClick={() => setCvDeleteModalOpen(true)}
              />
            </motion.div>
          </div>

          <ProjectGrid
            projects={projects}
            onNewProject={() => { setEditingProject(undefined); setProjectModalOpen(true); }}
            onEditProject={(p) => { setEditingProject(p); setProjectModalOpen(true); }}
            onDeleteProject={deleteProject}
            onReorder={handleReorder}
          />

          <CTACard
            ctaTitle={ctaTitle}
            ctaDescription={ctaDescription}
            onClick={() => setCtaModalOpen(true)}
          />
        </div>
      </div>

      <AnimatePresence>
        {projectModalOpen && (
          <ProjectModal
            existingProject={editingProject}
            onClose={() => setProjectModalOpen(false)}
            onSave={handleSaveProject}
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
            statusIcon={statusIcon}
            onSave={(isAvail, text, icon) => {
              setIsAvailable(isAvail);
              setStatusText(text);
              setStatusIcon(icon);
              autoSaveProfile({ is_available: isAvail, status_message: text, status_icon: icon });
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

        {cvDeleteModalOpen && (
          <CVDeleteModal
            isOpen={cvDeleteModalOpen}
            onClose={() => setCvDeleteModalOpen(false)}
            onConfirm={removeCv}
            saving={saving}
          />
        )}
      </AnimatePresence>
    </DashboardLayout >
  );
};

export default DashboardPage;