import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaUserPlus, FaHeart } from 'react-icons/fa';
import Portal from '../Portal';
import { toast } from 'react-toastify';

interface SupportModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose }) => {
    const supportOptions = [
        {
            icon: FaUserPlus,
            title: "Invite 2 Friends",
            description: "More users = fewer crises.",
            action: () => {
                navigator.clipboard.writeText('Check out DevBio - The ultimate engineering bio page: https://devbio.co');
                toast.success('Share link copied to clipboard!');
            },
            color: "text-blue-400",
            bg: "bg-blue-400/10"
        },
        {
            icon: FaStar,
            title: "Star our GitHub",
            description: "Stars warm our hearts.",
            link: "https://github.com/devtofunmi/devbio",
            color: "text-yellow-400",
            bg: "bg-yellow-400/10"
        }
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <Portal>
                    <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onClose}
                            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative glass-card border-white/5 rounded-[3rem] p-8 md:p-10 max-w-2xl w-full text-center overflow-hidden shadow-2xl"
                        >
                            {/* Background Elements */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-b from-blue-600/10 to-transparent -z-10" />

                            <div className="flex justify-center mb-6">
                                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-red-500 shadow-inner">
                                    <FaHeart size={28} className="animate-pulse" />
                                </div>
                            </div>

                            <h2 className="text-3xl font-black text-white tracking-tighter mb-2 uppercase">
                                Keep us <span className="text-gradient">Motivated</span>
                            </h2>
                            <p className="text-white/40 text-base font-medium mb-10 max-w-sm mx-auto">
                                Help us keep the lights on and the code flowing. Every bit of support counts.
                            </p>

                            <div className="flex flex-col md:flex-row gap-4 mb-8">
                                {supportOptions.map((option, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        onClick={option.action ? option.action : undefined}
                                        className="group flex-1"
                                    >
                                        {option.link ? (
                                            <a
                                                href={option.link}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex flex-col items-center gap-4 p-6 glass rounded-2xl border-white/5 hover:border-white/10 hover:bg-white/[0.02] transition-all text-center h-full"
                                            >
                                                <div className={`w-14 h-14 ${option.bg} ${option.color} rounded-2xl flex items-center justify-center shrink-0`}>
                                                    <option.icon size={24} />
                                                </div>
                                                <div className="min-w-0">
                                                    <h4 className="text-white font-black text-sm uppercase tracking-tight mb-2">{option.title}</h4>
                                                    <p className="text-white/30 text-[11px] font-medium leading-normal">{option.description}</p>
                                                </div>
                                            </a>
                                        ) : (
                                            <div
                                                className="flex flex-col items-center gap-4 p-6 glass rounded-2xl border-white/5 hover:border-white/10 hover:bg-white/[0.02] transition-all text-center cursor-pointer h-full"
                                            >
                                                <div className={`w-14 h-14 ${option.bg} ${option.color} rounded-2xl flex items-center justify-center shrink-0`}>
                                                    <option.icon size={24} />
                                                </div>
                                                <div className="min-w-0">
                                                    <h4 className="text-white font-black text-sm uppercase tracking-tight mb-2">{option.title}</h4>
                                                    <p className="text-white/30 text-[11px] font-medium leading-normal">{option.description}</p>
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>

                            <div className="space-y-4">
                                <a
                                    href="/donate"
                                    className="block w-full py-4 bg-white text-black font-black rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-xl uppercase tracking-widest text-[10px]"
                                >
                                    💛 Support DevBio
                                </a>
                                <button
                                    onClick={onClose}
                                    className="text-white/20 hover:text-white/40 text-[10px] font-black uppercase tracking-[0.2em] transition-colors"
                                >
                                    I&apos;ll support later
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </Portal>
            )}
        </AnimatePresence>
    );
};

export default SupportModal;