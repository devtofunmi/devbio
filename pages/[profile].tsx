import React from "react";
import Image from "next/image";
import { GetServerSideProps } from "next";
import { FaGithub, FaTwitter, FaLinkedin, FaExternalLinkAlt, FaCode, FaInfoCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { getUserByUsername, User } from "../lib/mockUsers";
import { BackgroundBeams } from "../components/BackgroundBeams";
import GitHubCard from "../components/GitHubCard";
import Link from "next/link";

type Props = {
  user: User;
};

const ProfilePage: React.FC<Props> = ({ user }) => {
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="glass-card p-12 rounded-3xl text-center">
          <h1 className="text-4xl font-bold text-red-500 mb-6">404 - User Not Found</h1>
          <Link href="/" className="px-6 py-3 bg-white text-black rounded-full font-semibold hover:scale-105 transition">Go back home</Link>
        </div>
      </div>
    );
  }

  const mockProjects = [
    {
      title: "Prepkitty",
      description: "AI-driven interview coach with real-time feedback.",
      url: "https://www.prepkitty.co",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
      tech: ["Next.js", "AI", "TypeScript"]
    },
    {
      title: "Chat Flow",
      description: "Natural Language Interface for Building Flowcharts.",
      url: "https://chatt-flow.vercel.app/",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      tech: ["React", "SDK", "Node.js"]
    }
  ];

  return (
    <div className="min-h-screen text-white selection:bg-blue-500/30">
      <BackgroundBeams />

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        {/* Hero Section: Profile Identity */}
        <div className="mb-10 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative group p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden min-h-[400px] md:min-h-[450px] flex flex-col justify-end border border-white/5"
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

              {/* Ambient Glows */}
              <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-500/10 blur-[150px] rounded-full" />
              <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-purple-500/10 blur-[120px] rounded-full" />
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start gap-8 md:gap-12 text-center lg:text-left">
              {/* Avatar Container */}
              <div className="relative shrink-0">
                <div className="w-32 h-32 md:w-48 md:h-48 rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border-4 border-white/10 shadow-2xl relative">
                  {user.image && (
                    <Image
                      src={user.image}
                      alt={user.name}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 md:w-12 md:h-12 bg-green-500 rounded-xl md:rounded-2xl flex items-center justify-center text-white shadow-xl border-4 border-black">
                  <span className="w-3 h-3 rounded-full bg-white animate-pulse" />
                </div>
              </div>

              {/* Info Section */}
              <div className="flex-1 space-y-6 w-full overflow-hidden">
                <div className="flex flex-col gap-2">
                  <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-white block leading-[1.1]">
                    {user.name}
                  </h1>
                  <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                    <p className="text-lg md:text-2xl text-blue-400 font-bold tracking-tight leading-tight">
                      {user.profession}
                    </p>
                    <span className="hidden lg:block w-1.5 h-1.5 rounded-full bg-white/20" />
                    <div className="flex items-center justify-center lg:justify-start gap-1.5 text-white/40 font-mono text-xs md:text-sm">
                      <span>devbio.co/</span>
                      <span className="text-white">{user.username}</span>
                    </div>
                  </div>
                </div>

                <div className="max-w-2xl mx-auto lg:mx-0">
                  <p className="text-base md:text-xl text-white/50 leading-relaxed font-light">
                    {user.description}
                  </p>
                </div>

                {/* Social Links */}
                <div className="flex flex-wrap gap-4 pt-4 items-center justify-center lg:justify-start">
                  {user.socials?.github && (
                    <a href={`https://github.com/${user.socials.github}`} target="_blank" rel="noreferrer" className="glass rounded-2xl p-4 flex items-center justify-center border-white/5 hover:border-white/10 transition-all cursor-pointer group">
                      <FaGithub size={20} className="text-white/40 group-hover:text-blue-400 transition-colors" />
                    </a>
                  )}
                  {user.socials?.twitter && (
                    <a href={`https://twitter.com/${user.socials.twitter}`} target="_blank" rel="noreferrer" className="glass rounded-2xl p-4 flex items-center justify-center border-white/5 hover:border-white/10 transition-all cursor-pointer group">
                      <FaTwitter size={20} className="text-white/40 group-hover:text-blue-400 transition-colors" />
                    </a>
                  )}
                  {user.socials?.linkedin && (
                    <a href={`https://linkedin.com/in/${user.socials.linkedin}`} target="_blank" rel="noreferrer" className="glass rounded-2xl p-4 flex items-center justify-center border-white/5 hover:border-white/10 transition-all cursor-pointer group">
                      <FaLinkedin size={20} className="text-white/40 group-hover:text-blue-400 transition-colors" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20">
          {/* Left Column: GitHub & Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-8 flex flex-col gap-8"
          >
            {/* GitHub DNA */}
            <div className="glass-card rounded-[2rem] border-white/5 shadow-2xl overflow-hidden h-fit flex items-center justify-center">
              <div className="w-full h-full p-6 md:p-8 flex items-center justify-center">
                <GitHubCard githubUsername={user.socials?.github || user.username} size={48} />
              </div>
            </div>

            {/* Tech Stack */}
            <div className="glass-card rounded-[2rem] p-10 border-white/5">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-blue-400">
                    <FaCode size={18} />
                  </div>
                  <h4 className="text-2xl font-black text-white tracking-tight leading-none">Tech Stack</h4>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                {["React", "TypeScript", "Next.js", "Tailwind", "Node.js"].map((tech) => (
                  <span key={tech} className="px-6 py-3 glass rounded-2xl text-sm font-bold text-white/40 hover:text-blue-400 border-white/5 cursor-pointer transition-all hover:scale-110 active:scale-95">
                    {tech}
                  </span>
                ))}
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
            {/* About Me */}
            <div className="glass-card rounded-[2rem] p-10 border-white/5 bg-white/[0.01]">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-purple-400">
                    <FaInfoCircle size={18} />
                  </div>
                  <h4 className="text-xl font-black text-white tracking-tight">About Me</h4>
                </div>
              </div>
              <p className="text-sm text-white/40 leading-relaxed font-light min-h-[120px]">
                {user.about}
              </p>
            </div>

            {/* Status Card */}
            <div className="glass-card rounded-[1.5rem] p-8 border-white/5 flex items-center justify-between group">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Current Status</span>
                <span className="text-sm font-black flex items-center gap-3 text-white">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)] animate-pulse" />
                  Available for hire
                </span>
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
                <p className="text-white/30 font-light">Showcase of best builds and creations.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mockProjects.map((project, i) => (
                <div key={i} className="glass-card rounded-[2rem] p-6 border-white/5 group hover:border-blue-500/30 transition-all">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden relative border border-white/10 shadow-lg">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <Link href={project.url} className="p-3 glass rounded-xl text-white/40 hover:text-white transition-colors hover:bg-white/10">
                      <FaExternalLinkAlt size={14} />
                    </Link>
                  </div>

                  <h4 className="text-xl font-bold text-white mb-2 tracking-tight">{project.title}</h4>
                  <p className="text-white/40 font-light mb-6 text-sm leading-relaxed min-h-[40px]">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map(t => (
                      <span key={t} className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 bg-white/5 text-white/40 rounded-lg border border-white/5">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
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
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const profile = Array.isArray(context.params?.profile)
    ? context.params?.profile[0]
    : context.params?.profile;
  const user = getUserByUsername(profile as string) || null;
  return {
    props: {
      user,
    },
  };
};

export default ProfilePage;