import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaCode, FaExternalLinkAlt, FaArrowRight } from "react-icons/fa";
import { ensureAbsoluteUrl } from "../../lib/utils";
import type { UserProfile, ProjectRecord } from "../../lib/types";

type Props = {
    user: UserProfile;
    projects: ProjectRecord[];
    recordClick: (type: string, url: string) => void;
};

const ProjectsShowcase: React.FC<Props> = ({ user, projects, recordClick }) => {
    if (!projects || projects.length === 0) return null;

    return (
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
    );
};

export default ProjectsShowcase;
