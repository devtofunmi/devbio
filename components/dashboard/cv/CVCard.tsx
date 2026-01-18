import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFilePdf, FaEllipsisV, FaExternalLinkAlt, FaTrash, FaFileUpload } from 'react-icons/fa';

interface CVCardProps {
    cvUrl: string;
    onUploadClick: () => void;
    onRemoveClick: () => void;
    userName?: string;
}

const CVCard: React.FC<CVCardProps> = ({ cvUrl, onUploadClick, onRemoveClick, userName }) => {
    const [cvMenuOpen, setCvMenuOpen] = useState(false);

    return (
        <div
            className={`glass-card bg-[var(--theme-card-bg)] border-[var(--theme-border)] rounded-[1.5rem] p-8 border group transition-all`}
        >
            <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-emerald-400">
                    <FaFilePdf size={18} />
                </div>
                <h4 className={`text-xl font-black text-[var(--theme-text)] tracking-tight`}>Curriculum Vitae</h4>
            </div>

            {cvUrl ? (
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 glass rounded-2xl border border-white/5 bg-white/5">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                                <FaFilePdf size={14} />
                            </div>
                            <span className="text-xs font-bold text-white/60 truncate max-w-[120px] mr-4">
                                {userName ? `${userName.replace(/\s+/g, '_')}_CV.pdf` : 'resume.pdf'}
                            </span>
                        </div>
                        <div className="relative">
                            <button
                                onClick={() => setCvMenuOpen(!cvMenuOpen)}
                                className="w-8 h-8 flex items-center justify-center text-[var(--theme-text-secondary)] hover:text-[var(--theme-text)] glass rounded-xl transition-all"
                            >
                                <FaEllipsisV size={12} />
                            </button>

                            <AnimatePresence>
                                {cvMenuOpen && (
                                    <>
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            onClick={() => setCvMenuOpen(false)}
                                            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]"
                                        />
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className="absolute top-12 right-0 glass bg-black border border-white/10 rounded-2xl overflow-hidden min-w-[160px] z-50 shadow-2xl p-1.5 backdrop-blur-xl"
                                        >
                                            <a
                                                href={cvUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                onClick={() => setCvMenuOpen(false)}
                                                className="w-full text-left px-4 py-3 hover:bg-white/5 text-xs font-bold text-white flex items-center gap-3 rounded-xl transition-colors"
                                            >
                                                <FaExternalLinkAlt size={12} className="text-blue-400" />
                                                View CV
                                            </a>
                                            <button
                                                onClick={() => {
                                                    onRemoveClick();
                                                    setCvMenuOpen(false);
                                                }}
                                                className="w-full text-left px-4 py-3 hover:bg-red-500/10 text-xs font-bold text-red-500 flex items-center gap-3 rounded-xl transition-colors cursor-pointer"
                                            >
                                                <FaTrash size={12} />
                                                Remove CV
                                            </button>
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                    <button
                        onClick={onUploadClick}
                        className="w-full py-3 glass rounded-xl border-dashed border-white/10 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white hover:border-white/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                        <FaFileUpload size={12} />
                        Replace CV
                    </button>
                </div>
            ) : (
                <div
                    onClick={onUploadClick}
                    className="group/upload h-32 glass border-2 border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-[var(--theme-accent)] hover:bg-[var(--theme-accent)]/5 transition-all"
                >
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/20 group-hover/upload:text-[var(--theme-accent)] group-hover/upload:scale-110 transition-all">
                        <FaFileUpload size={24} />
                    </div>
                    <div className="text-center">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 group-hover/upload:text-white transition-colors">Upload PDF</p>
                        <p className="text-[8px] text-white/10 uppercase tracking-widest mt-1">Max 5MB</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CVCard;