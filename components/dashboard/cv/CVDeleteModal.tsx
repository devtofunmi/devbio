import React from 'react';
import { motion } from 'framer-motion';
import { FaTrash } from 'react-icons/fa';

interface CVDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    saving: boolean;
}

const CVDeleteModal: React.FC<CVDeleteModalProps> = ({ isOpen, onClose, onConfirm, saving }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/40 backdrop-blur-xl"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-md glass-card bg-zinc-950 border border-white/10 rounded-[2.5rem] p-10 shadow-2xl overflow-hidden"
            >
                <div className="absolute top-0 right-0 p-10 opacity-5">
                    <FaTrash size={100} className="text-red-500" />
                </div>

                <div className="relative z-10 text-center">
                    <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center text-red-500 mx-auto mb-8 animate-pulse">
                        <FaTrash size={32} />
                    </div>
                    <h3 className="text-2xl font-black text-white tracking-tighter mb-4">Purge CV Data?</h3>
                    <p className="text-white/40 text-sm font-medium leading-relaxed mb-10">
                        This operation is irreversible. Your curriculum vitae will be permanently removed from our secure storage servers.
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={onClose}
                            className="py-5 glass rounded-2xl text-xs font-black uppercase tracking-widest text-white/40 hover:text-white transition-all cursor-pointer"
                        >
                            Abort
                        </button>
                        <button
                            onClick={() => {
                                onConfirm();
                                onClose();
                            }}
                            disabled={saving}
                            className="py-5 bg-red-500 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-red-600 transition-all shadow-xl shadow-red-500/20 cursor-pointer disabled:opacity-50"
                        >
                            {saving ? 'Purging...' : 'Delete Permanently'}
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default CVDeleteModal;
