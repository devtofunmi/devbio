import React from "react";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";

interface CTACardProps {
    ctaTitle: string;
    ctaDescription: string;
    onClick: () => void;
}

const CTACard: React.FC<CTACardProps> = ({ ctaTitle, ctaDescription, onClick }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12"
        >
            <div
                onClick={onClick}
                className={`glass-card bg-[var(--theme-card-bg)] border-[var(--theme-border)] rounded-[2rem] p-10 border bg-gradient-to-br from-blue-600/5 to-purple-600/5 flex flex-col md:flex-row items-center justify-between gap-8 group cursor-pointer hover:border-[var(--theme-accent)] transition-all shadow-2xl shadow-blue-500/5 overflow-hidden relative`}
            >
                <div className="relative z-10 text-center md:text-left">
                    <span className="text-[10px] uppercase tracking-widest text-[var(--theme-accent)] font-black mb-3 block">Conversion Engine</span>
                    <h4 className={`text-2xl md:text-3xl font-black text-[var(--theme-text)] tracking-tight mb-2`}>
                        {ctaTitle || "Primary Action Area"}
                    </h4>
                    <p className="text-[var(--theme-text-secondary)] font-light max-w-xl">
                        {ctaDescription || "Set up your footer call-to-action to convert visitors into leads."}
                    </p>
                </div>

                <div className="relative z-10 flex items-center gap-6">
                    <div className="w-14 h-14 bg-[var(--theme-accent)] text-[var(--theme-accent-text)] rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all">
                        <FaPlus size={20} />
                    </div>
                </div>

                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] -z-10 group-hover:bg-blue-500/20 transition-colors" />
            </div>
        </motion.div>
    );
};

export default CTACard;