import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaUser } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import { SOCIAL_BASE_URLS } from "../../lib/constants";
import { ensureAbsoluteUrl, formatSocialHref } from "../../lib/utils";

type SocialLink = { name: string; href: string };
type TechItem = { name: string };
type Project = {
    id: string;
    title: string;
    description: string;
    url: string;
    image_url: string;
    tech_tags: string[];
};

type MinimalUser = {
    full_name: string;
    profession?: string;
    bio?: string;
    avatar_url?: string;
    social_links?: SocialLink[];
    tech_stack?: TechItem[];
    is_donor?: boolean;
    cv_url?: string;
    full_name_slug?: string;
};

type Props = {
    user: MinimalUser;
    projects: Project[];
    recordClick: (type: string, url: string) => void;
    onShare: () => void;
};

const getDomain = (url: string): string => {
    try {
        return new URL(ensureAbsoluteUrl(url)).hostname.replace(/^www\./, "");
    } catch {
        return "";
    }
};

const MinimalProfile: React.FC<Props> = ({ user, projects, recordClick, onShare }) => {
    const socialLinks = (user.social_links || []).filter((s) => s.href);
    const tech = user.tech_stack || [];
    const hasTech = tech.length > 0;
    const hasProjects = projects && projects.length > 0;

    return (
        <main className="font-dm min-h-screen px-6 py-16 md:py-24 selection:bg-[var(--theme-text)] selection:text-[var(--theme-card-bg)]">
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="mx-auto w-full max-w-[620px]"
            >
                {/* Header */}
                <header className="mb-16">
                    <div
                        className={`w-14 h-14 rounded-full overflow-hidden relative flex items-center justify-center bg-[var(--theme-card-bg)] border ${user.is_donor
                            ? "border-yellow-500/50 ring-2 ring-yellow-500/10"
                            : "border-[var(--theme-border)]"
                            }`}
                    >
                        {user.avatar_url ? (
                            <Image src={user.avatar_url} alt={user.full_name} fill className="object-cover" />
                        ) : (
                            <FaUser className="text-[var(--theme-text-secondary)] text-xl" />
                        )}
                    </div>

                    <h1 className="font-serif-display text-[2.6rem] md:text-[3.25rem] leading-[1.05] tracking-[-0.02em] text-[var(--theme-text)] mt-6">
                        {user.full_name}
                    </h1>

                    {user.profession && (
                        <p className="mt-3 text-[11px] uppercase tracking-[0.22em] text-[var(--theme-text-secondary)]">
                            {user.profession}
                        </p>
                    )}

                    {user.bio && (
                        <p className="mt-6 text-[15px] leading-relaxed text-[var(--theme-text-secondary)]">
                            {user.bio}
                        </p>
                    )}

                    {(socialLinks.length > 0 || user.cv_url) && (
                        <div className="mt-6 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[13px] text-[var(--theme-text-secondary)]">
                            {socialLinks.map((social, i) => (
                                <React.Fragment key={social.name + i}>
                                    {i > 0 && <span className="opacity-40 select-none">·</span>}
                                    <a
                                        href={formatSocialHref(social.name, social.href, SOCIAL_BASE_URLS)}
                                        target="_blank"
                                        rel="noreferrer"
                                        onClick={() => recordClick("social", social.name)}
                                        className="underline-offset-4 hover:underline hover:text-[var(--theme-text)] transition-colors"
                                    >
                                        {social.name}
                                    </a>
                                </React.Fragment>
                            ))}
                            {user.cv_url && (
                                <>
                                    {socialLinks.length > 0 && <span className="opacity-40 select-none">·</span>}
                                    <a
                                        href={`${user.cv_url}?download=`}
                                        target="_blank"
                                        rel="noreferrer"
                                        onClick={() => recordClick("cv", user.cv_url!)}
                                        className="underline-offset-4 hover:underline hover:text-[var(--theme-text)] transition-colors"
                                    >
                                        Résumé
                                    </a>
                                </>
                            )}
                        </div>
                    )}
                </header>

                {/* Tech stack */}
                {hasTech && (
                    <section className="mb-12">
                        <h2 className="font-serif-display text-[1.75rem] leading-none text-[var(--theme-text)] pb-4 mb-5 border-b border-[var(--theme-border)]">
                            Stack
                        </h2>
                        <p className="text-[14px] leading-relaxed text-[var(--theme-text-secondary)]">
                            {tech.map((t, i) => (
                                <React.Fragment key={t.name + i}>
                                    {i > 0 && <span className="opacity-40 select-none"> · </span>}
                                    {t.name}
                                </React.Fragment>
                            ))}
                        </p>
                    </section>
                )}

                {/* Projects */}
                {hasProjects && (
                    <section className="mt-6 mb-16">
                        <h2 className="font-serif-display text-[1.75rem] leading-none text-[var(--theme-text)] pb-5 mb-2 border-b border-[var(--theme-border)]">
                            Projects
                        </h2>
                        <ul>
                            {projects.map((project) => {
                                const domain = getDomain(project.url);
                                const RowTag = project.url ? "a" : "div";
                                return (
                                    <li key={project.id} className="py-7 border-b border-[var(--theme-border)] last:border-b-0">
                                        <RowTag
                                            {...(project.url
                                                ? {
                                                    href: ensureAbsoluteUrl(project.url),
                                                    target: "_blank",
                                                    rel: "noreferrer",
                                                    onClick: () => recordClick("project", project.title),
                                                }
                                                : {})}
                                            className="group block"
                                        >
                                            <h3 className="font-serif-display text-[17px] leading-snug text-[var(--theme-text)] transition-opacity group-hover:opacity-70">
                                                {project.title}
                                            </h3>
                                            {domain && (
                                                <span className="mt-1 inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.14em] text-[var(--theme-text-secondary)] opacity-70">
                                                    {domain}
                                                    <FiArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                                </span>
                                            )}
                                            {project.description && (
                                                <p className="mt-2 text-[15px] leading-relaxed text-[var(--theme-text-secondary)]">
                                                    {project.description}
                                                </p>
                                            )}
                                        </RowTag>
                                    </li>
                                );
                            })}
                        </ul>
                    </section>
                )}

                {/* Footer */}
                <footer className="pt-8 border-t border-[var(--theme-border)] flex items-center justify-between text-[12px] text-[var(--theme-text-secondary)]">
                    <a
                        href="https://devbio.co"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[var(--theme-text)] transition-colors"
                    >
                        Built with DevBio.co
                    </a>
                    <button onClick={onShare} className="hover:text-[var(--theme-text)] transition-colors cursor-pointer">
                        Share
                    </button>
                </footer>
            </motion.div>
        </main>
    );
};

export default MinimalProfile;
