import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRocket } from 'react-icons/fa';
import Portal from '../Portal';

interface WelcomeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <Portal>
                    <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative glass-card border-blue-500/30 rounded-[3rem] p-8 md:p-12 max-w-lg w-full text-center overflow-hidden shadow-2xl"
                        >
                            {/* Animated Background Element */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-600/20 blur-[80px] -z-10" />

                            <div className="mb-8 flex justify-center">
                                <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-blue-500/40 rotate-12 hover:rotate-0 transition-transform duration-500">
                                    <FaRocket size={32} />
                                </div>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-4 uppercase">
                                Welcome to <span className="text-blue-500">DevBio</span>
                            </h2>

                            <p className="text-white/60 text-sm md:text-base font-medium leading-relaxed mb-10">
                                Your engineering legacy starts here. We&apos;ve built this space for you to showcase your best work and tell your unique story.
                            </p>

                            <div className="space-y-4">
                                <button
                                    onClick={onClose}
                                    className="w-full py-5 bg-white text-black font-black rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-xl uppercase tracking-widest text-xs"
                                >
                                    Start Building Your Brand
                                </button>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
                                    The Signature of Excellence
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </Portal>
            )}
        </AnimatePresence>
    );
};

export default WelcomeModal;
