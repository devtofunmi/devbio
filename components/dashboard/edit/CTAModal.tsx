import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCheck, FiLink, FiType, FiMail, FiCalendar, FiArrowRight } from 'react-icons/fi';
import Portal from '../../Portal';

interface CTAModalProps {
    isOpen: boolean;
    onClose: () => void;
    ctaTitle: string;
    ctaDescription: string;
    ctaText: string;
    ctaLink: string;
    onSave: (title: string, description: string, text: string, link: string) => void;
}

const CTAModal: React.FC<CTAModalProps> = ({ isOpen, onClose, ctaTitle, ctaDescription, ctaText, ctaLink, onSave }) => {
    const [localTitle, setLocalTitle] = useState(ctaTitle);
    const [localDescription, setLocalDescription] = useState(ctaDescription);
    const [localText, setLocalText] = useState(ctaText);
    const [localLink, setLocalLink] = useState(ctaLink);

    const handleSave = () => {
        onSave(localTitle, localDescription, localText, localLink);
        onClose();
    };

    const suggestions = [
        { text: "Hire Me", icon: <FiMail /> },
        { text: "Book a Call", icon: <FiCalendar /> },
        { text: "Let's Collaborate", icon: <FiArrowRight /> },
        { text: "View Resume", icon: <FiLink /> },
        { text: "Contact Me", icon: <FiMail /> },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <Portal>
                    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
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
                            className="relative glass-card border-white/10 rounded-[2.5rem] p-6 md:p-8 max-w-lg w-full overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
                        >
                            <div className="flex justify-between items-center mb-6 shrink-0">
                                <h2 className="text-xl font-black text-white uppercase tracking-tighter">Primary Action</h2>
                                <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                                    <FiX className="text-white/40" size={20} />
                                </button>
                            </div>

                            <div className="space-y-6 overflow-y-auto pr-2 custom-scrollbar pb-4">
                                {/* Title Input */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 px-1 text-white/40">
                                        <FiType size={12} />
                                        <span className="text-[10px] uppercase tracking-widest">Section Title</span>
                                    </div>
                                    <input
                                        type="text"
                                        value={localTitle}
                                        onChange={(e) => setLocalTitle(e.target.value)}
                                        placeholder="e.g. Ready to level up your team?"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-base text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-all font-bold"
                                    />
                                </div>

                                {/* Description Input */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 px-1 text-white/40">
                                        <FiType size={12} />
                                        <span className="text-[10px] uppercase tracking-widest">Section Description</span>
                                    </div>
                                    <textarea
                                        value={localDescription}
                                        onChange={(e) => setLocalDescription(e.target.value)}
                                        placeholder="e.g. I'm currently looking for new opportunities and would love to hear about your project."
                                        rows={3}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-all resize-none"
                                    />
                                </div>

                                {/* Text Input */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 px-1 text-white/40">
                                        <FiType size={12} />
                                        <span className="text-[10px] uppercase tracking-widest">Button Label</span>
                                    </div>
                                    <input
                                        type="text"
                                        value={localText}
                                        onChange={(e) => setLocalText(e.target.value)}
                                        placeholder="e.g. Hire Me"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-base text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-all"
                                    />
                                </div>

                                {/* Link Input */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 px-1 text-white/40">
                                        <FiLink size={12} />
                                        <span className="text-[10px] uppercase tracking-widest">Destination URL / Email</span>
                                    </div>
                                    <input
                                        type="text"
                                        value={localLink}
                                        onChange={(e) => setLocalLink(e.target.value)}
                                        placeholder="e.g. hello@gmail.com or calendly.com/username"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-base text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-all font-mono text-sm"
                                    />
                                    <p className="text-[10px] text-white/20 px-1">Tip: Just enter an email or a website link. We'll handle the rest.</p>
                                </div>

                                {/* Quick Presets */}
                                <div className="space-y-3">
                                    <span className="text-[10px] uppercase tracking-widest text-white/40 px-1">Common Actions</span>
                                    <div className="flex flex-wrap gap-2">
                                        {suggestions.map((s) => (
                                            <button
                                                key={s.text}
                                                onClick={() => setLocalText(s.text)}
                                                className={`text-[10px] font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl border transition-all flex items-center gap-2 ${localText === s.text
                                                    ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                                                    : 'bg-white/5 border-white/5 text-white/30 hover:text-white/60 hover:bg-white/10'
                                                    }`}
                                            >
                                                {s.icon}
                                                {s.text}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    onClick={handleSave}
                                    className="w-full py-5 bg-white text-black font-black rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-xl uppercase tracking-widest text-xs flex items-center justify-center gap-3"
                                >
                                    <FiCheck size={16} />
                                    Save Primary Action
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </Portal>
            )}
        </AnimatePresence>
    );
};

export default CTAModal;
