import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaCode, FaInfoCircle } from "react-icons/fa";
import GitHubCard from "../GitHubCard";
import { ALL_TECHS } from "../../lib/constants";
import type { TechItem, UserProfile } from "../../lib/types";

const ProfileSkills: React.FC<{ user: UserProfile }> = ({ user }) => {
    const hasGitHub = !!user.github_username;
    const hasTech = user.tech_stack && user.tech_stack.length > 0;
    const hasAboutMe = !!user.about_me;
    const hasLeftColumn = hasGitHub || hasTech;

    // Layout logic: if one side is missing, the other takes up more space
    const leftColClass = !hasAboutMe ? "md:col-span-12" : "md:col-span-8";
    const rightColClass = !hasLeftColumn ? "md:col-span-12" : "md:col-span-4";

    return (
        <>
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
        </>
    );
};

export default ProfileSkills;
