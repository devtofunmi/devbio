import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiLoader, FiAlertTriangle } from "react-icons/fi";
import Portal from "../Portal";

/**
 * Confirmation dialog for destructive actions, gated behind typing an exact
 * phrase. Shared by account deletion and domain removal so both feel the same
 * and neither can be triggered by a stray click.
 */

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    busy?: boolean;
    title: string;
    description: React.ReactNode;
    /** Must be typed exactly before the confirm button unlocks. */
    confirmPhrase: string;
    /** Short instruction above the input, e.g. "Type the domain to confirm". */
    inputLabel: string;
    confirmLabel: string;
    busyLabel: string;
};

const ConfirmActionModal: React.FC<Props> = ({
    isOpen,
    onClose,
    onConfirm,
    busy = false,
    title,
    description,
    confirmPhrase,
    inputLabel,
    confirmLabel,
    busyLabel,
}) => {
    const [typed, setTyped] = useState("");

    // Never carry a previous answer into a reopened dialog.
    useEffect(() => {
        if (isOpen) setTyped("");
    }, [isOpen]);

    // Hold the page still behind the overlay.
    useEffect(() => {
        const previous = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = previous;
        };
    }, [isOpen]);

    const matches = typed.trim().toLowerCase() === confirmPhrase.toLowerCase();

    return (
        <AnimatePresence>
            {isOpen && (
                <Portal>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={busy ? undefined : onClose}
                        className="fixed inset-0 bg-black/90 backdrop-blur-2xl flex justify-center items-center p-4 z-modal-backdrop"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="glass-card rounded-[2.5rem] border-red-500/20 p-8 md:p-10 w-full max-w-lg relative shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar"
                        >
                            <div className="text-center">
                                <div className="w-16 h-16 bg-red-500/10 rounded-3xl flex items-center justify-center text-red-500 mx-auto mb-6">
                                    <FiAlertTriangle size={30} />
                                </div>

                                <h2 className="text-2xl md:text-3xl font-black text-white tracking-tighter mb-3">
                                    {title}
                                </h2>
                                <div className="text-white/50 text-sm leading-relaxed mb-8">
                                    {description}
                                </div>
                            </div>

                            <div className="text-left mb-8">
                                <label className="block text-xs font-black text-white/40 uppercase tracking-[0.2em] mb-2 ml-1">
                                    {inputLabel}
                                </label>
                                <p className="font-mono text-sm text-white/70 mb-3 ml-1 break-all select-all">
                                    {confirmPhrase}
                                </p>
                                <input
                                    type="text"
                                    value={typed}
                                    onChange={(e) => setTyped(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && matches && !busy) onConfirm();
                                    }}
                                    disabled={busy}
                                    placeholder={confirmPhrase}
                                    spellCheck={false}
                                    autoCapitalize="none"
                                    autoComplete="off"
                                    className="w-full p-4 glass rounded-2xl focus:outline-none border-white/5 focus:border-red-500/40 text-white font-bold font-mono transition-colors disabled:opacity-50"
                                />
                            </div>

                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={onConfirm}
                                    disabled={busy || !matches}
                                    className="w-full py-4 bg-red-500 text-white font-black rounded-2xl hover:bg-red-600 transition-all cursor-pointer shadow-xl shadow-red-500/10 flex items-center justify-center gap-3 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-red-500"
                                >
                                    {busy && <FiLoader className="animate-spin" />}
                                    {busy ? busyLabel : confirmLabel}
                                </button>
                                <button
                                    onClick={onClose}
                                    disabled={busy}
                                    className="w-full py-4 glass text-white/40 hover:text-white transition-all rounded-2xl cursor-pointer font-bold border-white/5 disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                </Portal>
            )}
        </AnimatePresence>
    );
};

export default ConfirmActionModal;
