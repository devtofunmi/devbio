import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import ThemeSettings from './ThemeSettings';

interface ThemeSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const ThemeSidebar: React.FC<ThemeSidebarProps> = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0   z-[60]"
                    />

                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-[#000000] border-l border-white/10 z-[70] shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/5">
                            <div className="flex items-center gap-3">
                                
                                <div>
                                    <h3 className="text-xl font-black text-white tracking-tight">Themes</h3>
                                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Customize your look</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 cursor-pointer hover:bg-white/5 rounded-xl text-white/40 hover:text-white transition-colors"
                            >
                                <FiX size={24} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                            <ThemeSettings compact={true} />
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ThemeSidebar;