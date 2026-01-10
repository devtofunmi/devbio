import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCopy, FiExternalLink, FiShare2, FiCheck } from 'react-icons/fi';
import { FaTwitter } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Image from 'next/image';
import Portal from '../Portal';

interface ShareModalProps {
    username: string;
    onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ username, onClose }) => {
    const [copied, setCopied] = useState(false);
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const shareUrl = `${origin}/${username}`;
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(shareUrl)}&bgcolor=ffffff&color=000000&margin=20`;
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out my developer portfolio on DevBio! 🚀`)}&url=${encodeURIComponent(shareUrl)}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        toast.success("Link copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Portal>
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6 overflow-y-auto custom-scrollbar">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative w-full max-w-lg glass-card border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl my-auto flex flex-col max-h-[90vh]"
                >
                    {/* Header - Fixed */}
                    <div className="p-8 pb-4 flex items-center justify-between border-b border-white/5 bg-white/[0.02] shrink-0">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-blue-500">
                                <FiShare2 size={24} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-white tracking-tight uppercase">Share Profile</h3>
                                <p className="text-white/40 text-xs font-bold uppercase tracking-widest mt-1">Spread your legacy</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="w-10 h-10 glass rounded-xl flex items-center justify-center text-white/20 hover:text-white transition-all">
                            <FiX size={20} />
                        </button>
                    </div>

                    {/* Content - Scrollable */}
                    <div className="p-8 space-y-8 overflow-y-auto custom-scrollbar flex-1">
                        {/* QR Code Section */}
                        <div className="flex flex-col items-center justify-center">
                            <div className="relative group p-4 bg-white rounded-[2rem] overflow-hidden mb-4 shadow-2xl">
                                <div className="relative w-48 h-48 md:w-64 md:h-64">
                                    <Image
                                        src={qrCodeUrl}
                                        alt="Profile QR Code"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <div className="absolute inset-x-0 bottom-4 px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="bg-black/80 backdrop-blur-md rounded-xl py-2 px-4 text-center">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white">Scan to view</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-black text-center">Your unique digital signature</p>
                        </div>

                        {/* Link Section */}
                        <div className="space-y-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 px-4">Profile URL</label>
                                <div className="glass rounded-2xl p-2 flex items-center gap-2 border-white/5 bg-white/[0.01]">
                                    <div className="flex-1 px-4 py-3 text-sm font-bold text-white/60 truncate">
                                        {shareUrl.replace('https://', '').replace('http://', '')}
                                    </div>
                                    <button
                                        onClick={handleCopy}
                                        className={`px-6 py-3 rounded-xl flex items-center gap-2 transition-all font-black text-xs uppercase tracking-widest ${copied ? 'bg-green-500 text-white' : 'bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 hover:text-white border border-blue-500/10'}`}
                                    >
                                        {copied ? <FiCheck size={14} /> : <FiCopy size={14} />}
                                        {copied ? 'Copied' : 'Copy'}
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <a
                                    href={shareUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-3 py-4 glass rounded-[1.5rem] border-white/5 hover:bg-white/5 text-white/60 hover:text-white transition-all group"
                                >
                                    <span className="text-[10px] font-black uppercase tracking-widest">Preview</span>
                                    <FiExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </a>
                                <a
                                    href={twitterShareUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-3 py-4 glass bg-[#1DA1F2]/10 border-[#1DA1F2]/20 rounded-[1.5rem] text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white transition-all group shadow-lg shadow-[#1DA1F2]/10"
                                >
                                    <FaTwitter size={14} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Share on X</span>
                                </a>
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

export default ShareModal;
