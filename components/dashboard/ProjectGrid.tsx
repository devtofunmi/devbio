import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaPlus, FaEllipsisV, FaPen, FaTrash, FaCode, FaExternalLinkAlt } from "react-icons/fa";
import { ensureAbsoluteUrl } from "../../lib/utils";

type Project = {
    id?: string;
    title: string;
    description: string;
    url: string;
    tech: string[];
    image?: string;
};

interface ProjectGridProps {
    projects: Project[];
    onNewProject: () => void;
    onEditProject: (project: Project) => void;
    onDeleteProject: (id: string, e: React.MouseEvent) => void;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects, onNewProject, onEditProject, onDeleteProject }) => {
    const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);

    return (
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="md:col-span-12">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 mb-12">
                <div className="text-center md:text-left">
                    <h3 className={`text-4xl font-black text-[var(--theme-text)] tracking-tighter mb-2`}>Featured Projects</h3>
                    <p className="text-[var(--theme-text-secondary)] font-light">Showcase your best builds.</p>
                </div>
                <button
                    onClick={onNewProject}
                    className="bg-white text-black px-8 py-4 rounded-3xl font-black flex items-center gap-3 hover:scale-105 transition-all whitespace-nowrap"
                >
                    <FaPlus size={14} /> <span>New Project</span>
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((p, i) => (
                    <div
                        key={p.id || i}
                        className={`glass-card bg-[var(--theme-card-bg)] border-[var(--theme-border)] rounded-[2rem] p-6 border group hover:border-[var(--theme-accent)] transition-all relative flex flex-col h-full`}
                        onMouseLeave={() => setOpenMenuIndex(null)}
                    >
                        {/* Option Menu */}
                        <div className="absolute top-4 right-4 z-20">
                            <button
                                onClick={(e) => { e.stopPropagation(); setOpenMenuIndex(openMenuIndex === i ? null : i); }}
                                className="w-8 h-8 flex items-center justify-center text-[var(--theme-text-secondary)] hover:text-[var(--theme-text)] glass rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <FaEllipsisV size={12} />
                            </button>
                            {openMenuIndex === i && (
                                <div className="absolute top-10 right-0 glass bg-black border border-white/10 rounded-xl overflow-hidden min-w-[120px] z-30 shadow-2xl flex flex-col items-start p-1 animate-in fade-in slide-in-from-top-2 duration-200">
                                    <button
                                        onClick={() => { onEditProject(p); setOpenMenuIndex(null); }}
                                        className="w-full text-left px-4 py-2.5 hover:bg-white/10 text-xs font-bold text-white flex items-center gap-2 rounded-lg transition-colors"
                                    >
                                        <FaPen size={10} /> Edit
                                    </button>
                                    <button
                                        onClick={(e) => onDeleteProject(p.id!, e)}
                                        className="w-full text-left px-4 py-2.5 hover:bg-red-500/20 text-xs font-bold text-red-500 flex items-center gap-2 rounded-lg transition-colors"
                                    >
                                        <FaTrash size={10} /> Delete
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-between items-start mb-6 w-full">
                            <div className="w-16 h-16 rounded-2xl overflow-hidden relative border border-white/10 bg-white/5 flex items-center justify-center shrink-0">
                                {p.image ? (
                                    <Image src={p.image} alt={p.title} fill className="object-cover" />
                                ) : (
                                    <FaCode className="text-white/10" size={28} />
                                )}
                            </div>
                            <a
                                href={ensureAbsoluteUrl(p.url)}
                                target="_blank"
                                rel="noreferrer"
                                className="p-3 glass rounded-xl text-[var(--theme-text-secondary)] hover:text-[var(--theme-text)] transition-colors mr-10"
                            >
                                <FaExternalLinkAlt size={14} />
                            </a>
                        </div>
                        <h4 className={`text-xl font-bold text-[var(--theme-text)] mb-2 tracking-tight`}>{p.title}</h4>
                        <p className={`text-[var(--theme-text-secondary)] font-light mb-6 text-sm leading-relaxed line-clamp-2`}>{p.description}</p>
                        <div className="flex flex-wrap gap-2 mt-auto">
                            {p.tech.map(t => (
                                <span key={t} className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 bg-[var(--theme-card-bg)] text-[var(--theme-text-secondary)] rounded-lg">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default ProjectGrid;
