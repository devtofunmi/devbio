import React from "react";
import { motion } from "framer-motion";
import { FiShare2 } from "react-icons/fi";

const ShareButton: React.FC<{ onShare: () => void }> = ({ onShare }) => (
    <motion.div
        animate={{
            y: [0, -12, 0],
        }}
        transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
        }}
        whileHover={{ scale: 1.1, y: 0 }}
        whileTap={{ scale: 0.9 }}

        className="fixed bottom-8 right-8 md:bottom-12 md:right-12 z-[100]"
    >
        <button
            onClick={onShare}
            className="group relative flex items-center cursor-pointer"
        >
            {/* Outer Neon Ring Glow */}
            <div className="absolute inset-0 rounded-full bg-[var(--theme-accent)] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative flex items-center justify-center glass rounded-full border-[var(--theme-border)] group-hover:border-[var(--theme-accent)] p-2 md:p-3 shadow-2xl transition-all duration-500 backdrop-blur-3xl overflow-hidden">
                {/* Animated Background Sweep */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--theme-accent)] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 opacity-20" />

                {/* Neon Icon Core */}
                <div className="w-12 h-12 md:w-14 md:h-14 bg-[var(--theme-accent)] rounded-full flex items-center justify-center text-[var(--theme-accent-text)] shadow-lg transition-all group-hover:scale-105 relative z-10">
                    <FiShare2 size={24} className="group-hover:rotate-12 transition-transform" />
                </div>

                {/* Interactive Border */}
                <div className="absolute inset-0 border border-[var(--theme-border)] group-hover:border-[var(--theme-accent)] rounded-full m-[1px]" />
            </div>
        </button>
    </motion.div>
);

export default ShareButton;
