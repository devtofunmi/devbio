import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaUser, FaCamera, FaMagic, FaPlus } from "react-icons/fa";
import InlineEdit from "./edit/InlineEdit";

interface Social {
    name: string;
    icon: React.ReactElement;
    href: string;
}

interface DashboardHeroProps {
    name: string;
    profession: string;
    bio: string;
    avatarUrl: string;
    isDonor: boolean;
    socials: Social[];
    onNameSave: (val: string) => void;
    onProfessionSave: (val: string) => void;
    onBioSave: (val: string) => void;
    onAvatarClick: () => void;
    onSocialClick: () => void;
}

const DashboardHero: React.FC<DashboardHeroProps> = ({
    name,
    profession,
    bio,
    avatarUrl,
    isDonor,
    socials,
    onNameSave,
    onProfessionSave,
    onBioSave,
    onAvatarClick,
    onSocialClick
}) => {
    return (
        <div className="mb-10 md:mb-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`relative group p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden min-h-[400px] md:min-h-[450px] flex flex-col justify-end border border-[var(--theme-border)]`}
            >
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&q=80"
                        alt="Profile Aura"
                        fill
                        className="object-cover scale-105 group-hover:scale-110 transition-transform duration-[2s] opacity-20 blur-sm"
                    />
                    <div className="absolute inset-0" style={{ background: 'var(--theme-hero-gradient)' }} />
                </div>

                <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start gap-4 md:gap-8 text-center lg:text-left">
                    <div className="relative group/avatar shrink-0">
                        <motion.div
                            onClick={onAvatarClick}
                            animate={isDonor ? {
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
                            className={`w-32 h-32 md:w-48 md:h-48 rounded-[2.5rem] md:rounded-[3rem] overflow-hidden relative cursor-pointer flex items-center justify-center bg-white/5 transition-all duration-500 ${isDonor
                                ? 'border-4 border-yellow-500/50 ring-4 ring-yellow-500/10'
                                : `border-4 border-[var(--theme-border)]`
                                }`}>
                            {avatarUrl ? (
                                <Image src={avatarUrl} alt="Avatar" fill className="object-cover" />
                            ) : (
                                <FaUser className="text-white/10 text-5xl md:text-7xl" />
                            )}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex flex-col items-center justify-center backdrop-blur-sm">
                                <FaCamera className="text-white text-3xl mb-2" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-white">Upload Brand</span>
                            </div>
                        </motion.div>
                        <div className="absolute -bottom-2 -right-2 w-10 h-10 md:w-12 md:h-12 bg-blue-600 rounded-xl md:rounded-2xl flex items-center justify-center text-white border-4 border-black">
                            <FaMagic size={18} className="animate-pulse" />
                        </div>
                    </div>

                    <div className="flex-1 space-y-6 w-full overflow-hidden">
                        <div className="flex flex-col gap-2">
                            <InlineEdit
                                value={name}
                                onSave={onNameSave}
                                className="text-4xl md:text-7xl font-black tracking-tighter text-[var(--theme-text)] block leading-[1.1]"
                                placeholder="Your Name"
                            />
                            <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                                <InlineEdit
                                    value={profession}
                                    onSave={onProfessionSave}
                                    className="text-lg md:text-2xl text-[var(--theme-accent)] font-bold tracking-tight leading-tight"
                                    placeholder="Your Profession"
                                />
                            </div>
                        </div>

                        <div className="max-w-2xl mx-auto lg:mx-0">
                            <InlineEdit
                                value={bio}
                                onSave={onBioSave}
                                as="textarea"
                                className={`text-base md:text-xl text-[var(--theme-text-secondary)] leading-relaxed font-light`}
                                placeholder="Add a high-impact headline/bio..."
                            />
                        </div>

                        <div className="flex flex-wrap gap-4 pt-4 items-center justify-center lg:justify-start">
                            {socials.filter(s => s.href).map((social, i) => (
                                <div key={i} className={`glass rounded-2xl p-4 flex items-center justify-center border border-[var(--theme-border)] hover:border-[var(--theme-accent)] transition-all cursor-pointer group`}>
                                    {React.cloneElement(social.icon as React.ReactElement<{ size: number; className: string }>, { size: 20, className: `text-[var(--theme-text-secondary)] group-hover:text-[var(--theme-accent)] transition-colors` })}
                                </div>
                            ))}
                            <button onClick={onSocialClick} className={`glass rounded-2xl px-6 py-4 flex items-center justify-center gap-2 border-dashed border-[var(--theme-border)] text-[var(--theme-text-secondary)] hover:text-[var(--theme-text)] transition-all`}>
                                <FaPlus size={12} />
                                <span className="text-[10px] font-black uppercase tracking-widest">Connect Identity</span>
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default DashboardHero;
