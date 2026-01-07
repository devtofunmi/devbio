import React, { useState, useMemo, useRef } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { motion, AnimatePresence } from "framer-motion";
import InlineEdit from "../../components/dashboard/edit/InlineEdit";
import GithubCard from "../../components/GitHubCard";
import ProjectModal from "../../components/dashboard/edit/ProjectModal";
import TechStackModal from "../../components/dashboard/edit/TechStackModal";
import GitHubModal from "../../components/dashboard/edit/GitHubModal";
import SocialModal from "../../components/dashboard/edit/SocialModal";
import {
  FaPlus,
  FaSave,
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
  FaCode
} from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiTypescript, SiGraphql, SiSwift, SiRust } from "react-icons/si";
import Link from 'next/link';
import Image from 'next/image';

type Project = {
  title: string;
  description: string;
  url: string;
  tech: string[];
  image?: string;
};

type Tech = {
  name: string;
  icon: React.ReactNode;
};

const ALL_TECHS = [
  { name: 'React', icon: <FaReact /> },
  { name: 'Next.js', icon: <SiNextdotjs /> },
  { name: 'TypeScript', icon: <SiTypescript /> },
  { name: 'Node.js', icon: <FaNodeJs /> },
  { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
  { name: 'GraphQL', icon: <SiGraphql /> },
  { name: 'Swift', icon: <SiSwift /> },
  { name: 'Rust', icon: <SiRust /> },
];

const DashboardPage: React.FC = () => {
  const [name, setName] = useState("Jay");
  const [profession, setProfession] = useState("Fullstack Engineer");
  const [description, setDescription] = useState("Building digital products, brands, and experiences. Focus on React, Node, and everything in between.");
  const [username, setUsername] = useState("jay");
  const [githubUsername, setGithubUsername] = useState("jay");
  const [avatarUrl, setAvatarUrl] = useState("https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg");
  const [isAvailable, setIsAvailable] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Modal States
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [techModalOpen, setTechModalOpen] = useState(false);
  const [githubModalOpen, setGithubModalOpen] = useState(false);
  const [socialModalOpen, setSocialModalOpen] = useState(false);

  // Data States
  const [projects, setProjects] = useState<Project[]>([
    {
      title: "Project Delta",
      description: "A high-performance analytics dashboard built with Next.js and Framer Motion.",
      url: "#",
      tech: ["Next.js", "Framer Motion", "Tailwind"]
    }
  ]);

  const [techStack, setTechStack] = useState<Tech[]>([
    { name: 'React', icon: <FaReact /> },
    { name: 'TypeScript', icon: <SiTypescript /> },
    { name: 'Next.js', icon: <SiNextdotjs /> },
    { name: 'Node.js', icon: <FaNodeJs /> },
  ]);

  // Initialized as empty strings so they don't show unless added
  const [socials, setSocials] = useState([
    { name: 'Twitter', icon: <FaTwitter />, href: '' },
    { name: 'GitHub', icon: <FaGithub />, href: '' },
    { name: 'LinkedIn', icon: <FaLinkedin />, href: '' },
    { name: 'YouTube', icon: <FaYoutube />, href: '' },
  ]);

  const [techSearch, setTechSearch] = useState("");



  const filteredTechs = useMemo(() => {
    return ALL_TECHS.filter(t => t.name.toLowerCase().includes(techSearch.toLowerCase()));
  }, [techSearch]);

  const handleTechToggle = (tech: { name: string; icon: React.ReactNode }) => {
    setTechStack(prev =>
      prev.some(t => t.name === tech.name)
        ? prev.filter(t => t.name !== tech.name)
        : [...prev, tech]
    );
  };

  const handleSocialChange = (name: string, href: string) => {
    setSocials(prev => prev.map(s => s.name === name ? { ...s, href } : s));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <DashboardLayout>
      <div className="relative pt-12">
        {/* Global HIDDEN File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
          accept="image/*"
        />

        {/* Floating Top Bar - Tool Style */}
        <div className="fixed top-6 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-12 z-[100] w-[90%] md:w-auto">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="glass backdrop-blur-xl bg-black/60 p-2 rounded-[2rem] border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-2"
          >
            <div className="flex items-center gap-2 px-6 py-3 border-r border-white/10 pr-6">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Live Sync</span>
            </div>

            <div className="flex items-center gap-1 md:gap-2 px-2">
              <Link href="/dashboard/themes">
                <button className="p-3 glass rounded-xl text-white/40 hover:text-white transition-all hover:bg-white/5" title="Custom Theme">
                  <FaPalette size={16} />
                </button>
              </Link>
              <button
                onClick={() => setSocialModalOpen(true)}
                className="p-3 glass rounded-xl text-white/40 hover:text-white transition-all hover:bg-white/5"
                title="Share & Socials"
              >
                <FaShareAlt size={16} />
              </button>
            </div>

            <button className="bg-blue-600 cursor-pointer text-white px-8 py-3 rounded-[1.5rem] font-black text-sm hover:bg-blue-500 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-blue-500/20 flex items-center gap-3">
              <FaSave />
              <span>Publish</span>
            </button>
          </motion.div>
        </div>

        {/* Hero Section: Profile Identity */}
        <div className="mb-10 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative group p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden min-h-[400px] md:min-h-[450px] flex flex-col justify-end border border-white/5"
          >
            {/* High-End Background Effect */}
            <div className="absolute inset-0 z-0 text-center">
              <Image
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&q=80"
                alt="Cover"
                fill
                className="object-cover scale-105 group-hover:scale-100 transition-transform duration-[2s] opacity-40 blur-sm"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent" />

              {/* Ambient Glows */}
              <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-500/10 blur-[150px] rounded-full" />
              <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-purple-500/10 blur-[120px] rounded-full" />
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start gap-8 md:gap-12 text-center lg:text-left">
              {/* Avatar Container */}
              <div className="relative group/avatar shrink-0">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-32 h-32 md:w-48 md:h-48 rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border-4 border-white/10 shadow-2xl relative cursor-pointer"
                >
                  <Image
                    src={avatarUrl}
                    alt="Avatar"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex flex-col items-center justify-center backdrop-blur-sm">
                    <FaCamera className="text-white text-3xl mb-2" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-white">Upload Brand</span>
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 md:w-12 md:h-12 bg-blue-600 rounded-xl md:rounded-2xl flex items-center justify-center text-white shadow-xl border-4 border-black">
                  <FaMagic size={18} className="animate-pulse" />
                </div>
              </div>

              {/* Info Section */}
              <div className="flex-1 space-y-6 w-full overflow-hidden">
                <div className="flex flex-col gap-2">
                  <InlineEdit
                    value={name}
                    onSave={setName}
                    as="textarea"
                    className="text-4xl md:text-7xl font-black tracking-tighter text-white block leading-[1.1]"
                    placeholder="Your Name"
                  />
                  <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                    <InlineEdit
                      value={profession}
                      onSave={setProfession}
                      as="textarea"
                      className="text-lg md:text-2xl text-blue-400 font-bold tracking-tight leading-tight"
                      placeholder="Your Profession"
                    />
                    <span className="hidden lg:block w-1.5 h-1.5 rounded-full bg-white/20" />
                    <div className="flex items-center justify-center lg:justify-start gap-1.5 text-white/40 font-mono text-xs md:text-sm">
                      <span>devbio.co/</span>
                      <InlineEdit
                        value={username}
                        onSave={setUsername}
                        className="text-white hover:text-blue-400 transition-colors"
                        placeholder="username"
                      />
                    </div>
                  </div>
                </div>

                <div className="max-w-2xl mx-auto lg:mx-0">
                  <InlineEdit
                    value={description}
                    onSave={setDescription}
                    as="textarea"
                    className="text-base md:text-xl text-white/50 leading-relaxed font-light"
                    placeholder="Add a high-impact bio..."
                  />
                </div>

                {/* Social Links - Filtered to only show if added */}
                <div className="flex flex-wrap gap-4 pt-4 items-center justify-center lg:justify-start">
                  {socials.filter(s => s.href).map((social, i) => (
                    <div key={i} className="glass rounded-2xl p-4 flex items-center justify-center border-white/5 hover:border-white/10 transition-all cursor-pointer group">
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {React.cloneElement(social.icon as any, { size: 20, className: "text-white/40 group-hover:text-blue-400 transition-colors" })}
                    </div>
                  ))}
                  <button
                    onClick={() => setSocialModalOpen(true)}
                    className={`glass rounded-2xl flex items-center justify-center gap-2 border-dashed border-white/10 hover:border-white/30 transition-all text-white/20 hover:text-white ${socials.filter(s => s.href).length === 0 ? 'px-8 py-4 bg-white/5 border-white/20 text-white/40' : 'px-6 py-4'}`}
                  >
                    <FaPlus size={12} />
                    <span className="text-[10px] font-black uppercase tracking-widest">{socials.filter(s => s.href).length === 0 ? 'Connect Your Identity' : 'Add More'}</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bento Grid: Main Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20">

          {/* Left Column: GitHub & Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-8 flex flex-col gap-8"
          >
            {/* GitHub Insights */}
            <div className="glass-card rounded-[2rem] border-white/5 shadow-2xl overflow-hidden group h-fit flex items-center justify-center relative">
              {/* Hover Edit Action */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-20 flex items-center justify-center backdrop-blur-[2px]">
                <button
                  onClick={() => setGithubModalOpen(true)}
                  className="bg-white text-black px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:scale-110 active:scale-95 transition-all shadow-2xl"
                >
                  Sync GitHub DNA
                </button>
              </div>
              <div className="w-full h-full p-6 md:p-8 flex items-center justify-center">
                <GithubCard githubUsername={githubUsername} size={48} onDelete={() => { }} />
              </div>
            </div>

            {/* Tech Stack Chips */}
            <div className="glass-card rounded-[2rem] p-10 border-white/5 group">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-blue-400">
                    <FaCode size={18} />
                  </div>
                  <h4 className="text-2xl font-black text-white tracking-tight leading-none">Tech Stack</h4>
                </div>
                <button
                  onClick={() => setTechModalOpen(true)}
                  className="w-10 h-10 rounded-xl glass flex items-center justify-center text-white/20 hover:text-white transition-all active:scale-90"
                >
                  <FaPlus size={14} />
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {techStack.map((tech) => (
                  <span key={tech.name} className="px-6 py-3 glass rounded-2xl text-sm font-bold text-white/40 hover:text-blue-400 border-white/5 cursor-pointer transition-all hover:scale-110 active:scale-95">
                    {tech.name}
                  </span>
                ))}
                {techStack.length === 0 && (
                  <p className="text-white/10 text-xs font-medium uppercase tracking-widest py-4">No stack selected</p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Column: About & Status */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-4 space-y-8"
          >
            {/* About Me Card */}
            <div className="glass-card rounded-[2rem] p-10 border-white/5 group bg-white/[0.01]">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-purple-400">
                    <FaInfoCircle size={18} />
                  </div>
                  <h4 className="text-xl font-black text-white tracking-tight">About Me</h4>
                </div>
              </div>
              <div className="relative group/about-edit">
                {!description ? (
                  <div
                    onClick={() => { }} // InlineEdit parent handles the click
                    className="py-10 border border-dashed border-white/10 rounded-3xl flex items-center justify-center cursor-pointer hover:bg-white/[0.02] transition-colors"
                  >
                    <p className="text-white/10 text-xs font-black uppercase tracking-[0.2em]">Tell your story here...</p>
                  </div>
                ) : null}
                <div className={!description ? 'hidden' : 'block'}>
                  <InlineEdit
                    value={description}
                    onSave={setDescription}
                    as="textarea"
                    className="text-sm text-white/40 leading-relaxed font-light min-h-[120px]"
                    placeholder="Tell your story here..."
                  />
                </div>
                {!description && (
                  <div className="absolute inset-0 opacity-0">
                    <InlineEdit
                      value={description}
                      onSave={setDescription}
                      as="textarea"
                      className="w-full h-full"
                      placeholder="Tell your story here..."
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Status Card */}
            <div
              onClick={() => setIsAvailable(!isAvailable)}
              className="glass-card rounded-[1.5rem] p-8 border-white/5 flex items-center justify-between group cursor-pointer hover:border-blue-500/30 transition-all active:scale-[0.98]"
            >
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Current Status</span>
                <span className="text-sm font-black flex items-center gap-3 text-white">
                  <span className={`w-2.5 h-2.5 rounded-full ${isAvailable ? 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]' : 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]'} ${isAvailable ? 'animate-pulse' : ''}`} />
                  {isAvailable ? 'Available for hire' : 'Focusing on projects'}
                </span>
              </div>
              <div className="w-10 h-10 glass rounded-2xl flex items-center justify-center text-white/20 group-hover:text-blue-400 group-hover:scale-110 transition-all">
                <div className={`w-10 h-5 rounded-full relative transition-colors ${isAvailable ? 'bg-blue-600' : 'bg-white/10'}`}>
                  <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${isAvailable ? 'left-[22px]' : 'left-1'}`} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Projects Showcase - Full Width */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-12"
          >
            <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 mb-12">
              <div className="text-center md:text-left">
                <h3 className="text-4xl font-black text-white tracking-tighter mb-2">Featured Projects</h3>
                <p className="text-white/30 font-light">Showcase your best builds to the world.</p>
              </div>
              <button
                onClick={() => setProjectModalOpen(true)}
                className="w-fit md:w-auto bg-white text-black px-8 py-4 rounded-3xl font-black flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/5"
              >
                <FaPlus size={14} /> <span>New Project</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
              {projects.length > 0 ? (
                projects.map((project, i) => (
                  <div key={i} className="glass-card rounded-[2rem] p-6 border-white/5 group hover:border-blue-500/30 transition-all text-left">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden relative border border-white/10 shadow-lg">
                        <Image
                          src={project.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80"}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Link href={project.url} className="p-3 glass rounded-xl text-white/40 hover:text-white transition-colors hover:bg-white/10">
                          <FaExternalLinkAlt size={14} />
                        </Link>
                        <button
                          onClick={() => setProjectModalOpen(true)}
                          className="p-3 glass rounded-xl text-white/40 hover:text-white transition-colors hover:bg-white/10"
                        >
                          <FaPlus size={14} className="rotate-45" /> {/* Edit/Close icon concept, using Plus rotated looks like close or edit... actually let's just use text 'Edit' or similar, but icon is better. Let's use FaPalette or Edit icon if available, or just make the whole card clickable for edit? The user might want explicit edit button. Restoring 'Edit Details ->' at bottom might be cleaner but let's stick to the profile design which has top right action. I'll add an edit button next to external link. */}
                        </button>
                      </div>
                    </div>

                    <h4 className="text-xl font-bold text-white mb-2 tracking-tight">{project.title}</h4>
                    <p className="text-white/40 font-light mb-6 text-sm leading-relaxed min-h-[40px] line-clamp-2">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tech.map(t => (
                        <span key={t} className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 bg-white/5 text-white/40 rounded-lg border border-white/5">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6 pt-4 border-t border-white/5 flex justify-end">
                      <button
                        onClick={() => setProjectModalOpen(true)}
                        className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white transition-colors"
                      >
                        Edit Details →
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div
                  onClick={() => setProjectModalOpen(true)}
                  className="md:col-span-12 py-24 glass rounded-[2.5rem] border border-dashed border-white/10 flex flex-col items-center justify-center gap-6 group cursor-pointer hover:bg-white/[0.02] transition-all"
                >
                  <div className="w-20 h-20 glass rounded-[2rem] flex items-center justify-center text-white/10 group-hover:text-blue-500 group-hover:scale-110 transition-all">
                    <FaPlus size={30} />
                  </div>
                  <div className="text-center">
                    <h4 className="text-xl font-black text-white/40 uppercase tracking-widest mb-1">No Projects Found</h4>
                    <p className="text-sm text-white/20 font-medium">Click here to showcase your first build</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {projectModalOpen && (
          <ProjectModal
            projects={projects}
            onClose={() => setProjectModalOpen(false)}
            onSave={(newProjects) => {
              setProjects(newProjects);
              setProjectModalOpen(false);
            }}
          />
        )}
        {techModalOpen && (
          <TechStackModal
            techStack={techStack}
            techSearch={techSearch}
            setTechSearch={setTechSearch}
            filteredTechs={filteredTechs}
            handleTechToggle={handleTechToggle}
            setTechModalOpen={setTechModalOpen}
          />
        )}
        {githubModalOpen && (
          <GitHubModal
            githubUsername={githubUsername}
            onClose={() => setGithubModalOpen(false)}
            onSave={(newUsername) => {
              setGithubUsername(newUsername);
              setGithubModalOpen(false);
            }}
          />
        )}
        {socialModalOpen && (
          <SocialModal
            socials={socials}
            handleSocialChange={handleSocialChange}
            setSocialModalOpen={setSocialModalOpen}
          />
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default DashboardPage;
