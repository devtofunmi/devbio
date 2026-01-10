import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCopy, FiExternalLink, FiShare2, FiCheck, FiMail } from 'react-icons/fi';
import { FaTwitter, FaLinkedin, FaWhatsapp, FaFacebook } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Image from 'next/image';
import Portal from './Portal';
import Link from 'next/link';

interface PublicShareModalProps {
    username: string;
    fullName: string;
    avatarUrl: string;
    onClose: () => void;
}

const PublicShareModal: React.FC<PublicShareModalProps> = ({ username, fullName, avatarUrl, onClose }) => {
    const [copied, setCopied] = useState(false);
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const shareUrl = `${origin}/${username}`;
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(shareUrl)}&bgcolor=ffffff&color=000000&margin=20`;

    const shareText = `Check out ${fullName}'s developer portfolio on DevBio! 🚀`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        toast.success("Link copied!");
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Portal>
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 overflow-y-auto custom-scrollbar">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/50 backdrop-blur-xl"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative w-full max-w-lg lg:max-w-2xl glass-card border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl my-auto flex flex-col max-h-[95vh]"
                >
                    {/* Header with User Info */}
                    <div className="p-6 md:p-8 pb-4 flex items-center justify-between border-b border-white/5 bg-white/[0.02] shrink-0">
                        <div className="flex items-center gap-4">
                            <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-2xl overflow-hidden border-2 border-blue-500/30">
                                <Image src={avatarUrl || "https://avatars.githubusercontent.com/u/1?v=4"} alt={fullName} fill className="object-cover" />
                            </div>
                            <div>
                                <h3 className="text-lg md:text-xl font-black text-white tracking-tight leading-none uppercase">{fullName}</h3>
                                <p className="text-blue-400 text-[10px] font-bold uppercase tracking-widest mt-1">@{username}</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="w-10 h-10 glass rounded-xl flex items-center justify-center text-white/20 hover:text-white transition-all cursor-pointer">
                            <FiX size={20} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-8 space-y-8 overflow-y-auto custom-scrollbar flex-1">
                        <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-stretch">
                            {/* QR Code Section - Hidden on Mobile */}
                            <div className="hidden md:flex flex-col items-center justify-center pt-2 lg:border-r lg:border-white/5 lg:pr-8 shrink-0">
                                <div className="relative group p-2 bg-white rounded-xl overflow-hidden mb-3 shadow-xl shrink-0">
                                    <div className="relative w-24 h-24 lg:w-28 lg:h-28">
                                        <Image
                                            src={qrCodeUrl}
                                            alt="Profile QR Code"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </div>
                                <p className="text-white/40 text-[7px] uppercase tracking-[0.2em] font-black text-center whitespace-nowrap">Scan for legacy</p>
                            </div>

                            {/* Redesigned Call to Action Item */}
                            <div className="relative group/cta flex-1 w-full">
                                <div className="relative glass border border-blue-500/30 rounded-[2rem] p-6 md:p-8 overflow-hidden h-full flex flex-col justify-center">
                                    {/* Vibrant, properly clipped glow */}
                                    <div className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover/cta:opacity-100 transition-all duration-500 blur-[80px] pointer-events-none" />
                                    <div className="absolute top-0 right-0 p-6 opacity-10">
                                        <FiShare2 size={60} className="text-blue-400 rotate-12" />
                                    </div>
                                    <div className="relative z-10 space-y-6">
                                        <div className="space-y-2">
                                            <h4 className="text-lg md:text-2xl font-black text-white tracking-tight leading-none uppercase">
                                                Join <span className="text-blue-500">{username}</span> on <span className="text-gradient">DevBio</span>
                                            </h4>
                                            <p className="text-white/60 text-[10px] md:text-sm font-medium leading-relaxed max-w-[280px]">
                                                Build your own premium portfolio and share your engineering story with the world.
                                            </p>
                                        </div>
                                        <Link href="/signup">
                                            <button className="w-full cursor-pointer py-3.5 bg-white text-black font-black rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-white/10 uppercase tracking-widest text-[10px] flex items-center justify-center gap-3">
                                                <span>Claim Your Signature</span>
                                                <FiExternalLink size={12} />
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Sharing Grid */}
                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 px-2">Share this legacy</label>
                            <div className="grid grid-cols-4 gap-3">
                                <a href={twitterUrl} target="_blank" rel="noreferrer" className="glass rounded-2xl p-5 flex items-center justify-center text-white/40 hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/5 border-white/5 transition-all">
                                    <FaTwitter size={22} />
                                </a>
                                <a href={linkedinUrl} target="_blank" rel="noreferrer" className="glass rounded-2xl p-5 flex items-center justify-center text-white/40 hover:text-[#0A66C2] hover:bg-[#0A66C2]/5 border-white/5 transition-all">
                                    <FaLinkedin size={22} />
                                </a>
                                <a href={whatsappUrl} target="_blank" rel="noreferrer" className="glass rounded-2xl p-5 flex items-center justify-center text-white/40 hover:text-[#25D366] hover:bg-[#25D366]/5 border-white/5 transition-all">
                                    <FaWhatsapp size={22} />
                                </a>
                                <a href={facebookUrl} target="_blank" rel="noreferrer" className="glass rounded-2xl p-5 flex items-center justify-center text-white/40 hover:text-[#1877F2] hover:bg-[#1877F2]/5 border-white/5 transition-all">
                                    <FaFacebook size={22} />
                                </a>
                            </div>
                        </div>

                        {/* Link Section */}
                        <div className="space-y-3">
                            <div className="glass rounded-2xl p-2 flex items-center gap-2 border-white/5 bg-white/[0.01]">
                                <div className="flex-1 px-4 py-3 text-xs md:text-sm font-bold text-white/60 truncate">
                                    {shareUrl.replace('https://', '')}
                                </div>
                                <button
                                    onClick={handleCopy}
                                    className={`px-6 py-3 rounded-xl flex items-center gap-2 transition-all font-black text-[10px] uppercase tracking-widest ${copied ? 'bg-green-500 text-white' : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'}`}
                                >
                                    {copied ? <FiCheck size={14} /> : <FiCopy size={14} />}
                                    {copied ? 'Copied' : 'Copy'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Footer Decor */}
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500/5 blur-[60px] -z-10" />
                </motion.div>
            </div>
        </Portal>
    );
};

export default PublicShareModal;
