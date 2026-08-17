import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaYoutube, FaExternalLinkAlt, FaUser, FaFilePdf } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { toast } from "react-toastify";
import { SOCIAL_BASE_URLS } from "../../lib/constants";
import { formatSocialHref } from "../../lib/utils";
import type { SocialLink, UserProfile } from "../../lib/types";

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
    'X': <FaXTwitter />,
    'Twitter': <FaXTwitter />, // Support legacy data
    'GitHub': <FaGithub />,
    'LinkedIn': <FaLinkedin />,
    'YouTube': <FaYoutube />,
};

type Props = {
    user: UserProfile;
    recordClick: (type: string, url: string) => void;
};

const ProfileHero: React.FC<Props> = ({ user, recordClick }) => (
    <div className="mb-10 md:mb-16">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative group p-6 md:p-8 lg:p-12 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden min-h-[400px] md:min-h-[450px] flex flex-col justify-end border border-[var(--theme-border)]"
        >
            {/* High-End Background Effect */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&q=80"
                    alt="Cover"
                    fill
                    className="object-cover scale-105 group-hover:scale-100 transition-transform duration-[2s] opacity-40 blur-sm"
                />
                <div className="absolute inset-0" style={{ background: 'var(--theme-hero-gradient)' }} />
                <div className="absolute top-0 right-0 w-1/2 h-full bg-[var(--theme-accent)] blur-[150px] rounded-full opacity-20" />
                <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-[var(--theme-accent)] blur-[120px] rounded-full opacity-10" />
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start gap-0 md:gap-8 text-center lg:text-left">
                {/* Avatar Container */}
                <div className="relative shrink-0">
                    <motion.div
                        animate={user.is_donor ? {
                            boxShadow: [
                                '0 0 30px rgba(234,179,8,0.3)',
                                '0 0 40px rgba(234,179,8,0.5)',
                                '0 0 30px rgba(234,179,8,0.3)',
                            ],
                        } : {}}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className={`w-32 h-32 md:w-48 md:h-48 rounded-[2.5rem] md:rounded-[3rem] overflow-hidden relative bg-[var(--theme-card-bg)] flex items-center justify-center transition-all duration-500 ${user.is_donor
                            ? 'border-4 border-yellow-500/50 ring-4 ring-yellow-500/10'
                            : 'border-4 border-[var(--theme-border)]'
                            }`}>
                        {user.avatar_url ? (
                            <Image
                                src={user.avatar_url}
                                alt={user.full_name}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <FaUser className="text-[var(--theme-text-secondary)] text-5xl md:text-7xl" />
                        )}

                    </motion.div>
                    <div className="absolute bottom-7 left-23 md:left-35 w-10 h-10 md:w-12 md:h-12 bg-[#1e1e1e] rounded-full flex items-center justify-center border-4 border-[#0a0a0a] group-hover:scale-110 transition-transform cursor-pointer relative group/status z-20" onClick={(e) => e.stopPropagation()}>
                        <span className="text-lg md:text-xl">{user.status_icon || (user.is_available)}</span>
                        <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-max max-w-[200px] px-3 py-1.5 glass bg-[#1e1e1e] border border-[var(--theme-border)] rounded-full text-xs font-bold text-white shadow-xl opacity-0 group-hover/status:opacity-100 group-active/status:opacity-100 transition-all pointer-events-none select-none flex items-center gap-2 z-50 backdrop-blur-xl">
                            <span className={`w-2 h-2 rounded-full ${user.is_available ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                            {user.status_message || (user.is_available ? "Available" : "Focused")}
                        </div>
                    </div>

                </div>

                {/* Info Section */}
                <div className="flex-1 space-y-6 w-full overflow-hidden">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter text-[var(--theme-text)] block leading-[1.1] break-words">
                            {user.full_name}
                        </h1>
                        <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                            <p className="text-lg md:text-2xl text-[var(--theme-accent)] font-bold tracking-tight leading-tight">
                                {user.profession}
                            </p>
                        </div>
                    </div>

                    <div className="max-w-2xl mx-auto lg:mx-0">
                        <p className="text-base md:text-xl text-[var(--theme-text-secondary)] leading-relaxed font-light">
                            {user.bio}
                        </p>
                    </div>



                    {/* Social Links */}
                    <div className="flex flex-wrap gap-4 pt-4 items-center justify-center lg:justify-start">
                        {(user.social_links as SocialLink[])?.map((social) => (
                            social.href && (
                                <a
                                    key={social.name}
                                    href={formatSocialHref(social.name, social.href, SOCIAL_BASE_URLS)}
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={() => recordClick('social', social.name)}
                                    className="glass rounded-2xl p-4 flex items-center justify-center border border-[var(--theme-border)] hover:border-[var(--theme-accent)] transition-all cursor-pointer group"
                                    title={social.name}
                                >
                                    <div className="text-[var(--theme-text-secondary)] group-hover:text-[var(--theme-accent)] transition-colors">
                                        {SOCIAL_ICONS[social.name] || <FaExternalLinkAlt size={20} />}
                                    </div>
                                </a>
                            )
                        ))}
                    </div>

                    {/* CV Download Button */}
                    {user.cv_url && (
                        <div className="pt-2">
                            <a
                                href={`${user.cv_url}?download=`}
                                download={`${user.full_name.replace(/\s+/g, '_')}_CV.pdf`}
                                target="_blank"
                                rel="noreferrer"
                                onClick={() => {
                                    recordClick('cv', user.cv_url!);
                                    toast.info("Download started...", {
                                        icon: () => <span>🚀</span>,
                                        style: {
                                            borderRadius: '1rem',
                                            background: 'var(--theme-card-bg)',
                                            color: 'var(--theme-text)',
                                            border: '1px solid var(--theme-border)',
                                        },
                                    });
                                }}
                                className="inline-flex items-center gap-2 px-6 py-3 glass rounded-2xl border border-[var(--theme-border)] text-white/60 hover:text-[var(--theme-accent)] hover:border-[var(--theme-accent)] transition-all font-bold text-xs uppercase tracking-widest group/cv"
                            >
                                <FaFilePdf size={14} className="group-hover/cv:scale-110 transition-transform" />
                                <span>Download CV</span>
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    </div>
);

export default ProfileHero;
