import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { FiCopy, FiCheck, FiLoader, FiRefreshCw, FiAlertCircle } from "react-icons/fi";
import { toast } from "react-toastify";
import Portal from "../Portal";

export type DnsRecord = { type: string; name: string; value: string };

type Props = {
    domain: string;
    records: DnsRecord[];
    checking: boolean;
    /** True once the domain is live, which turns the CTA into a plain dismiss. */
    verified?: boolean;
    /** Null before the first attempt, then false while DNS has not propagated. */
    lastCheckFailed: boolean | null;
    onCheck: () => void;
    onClose: () => void;
};

const CopyField: React.FC<{ label: string; value: string }> = ({ label, value }) => {
    const [copied, setCopied] = useState(false);
    const copy = async () => {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 1400);
        } catch {
            toast.error("Couldn't copy to clipboard");
        }
    };
    return (
        <div className="min-w-0">
            <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] mb-1.5 ml-1">
                {label}
            </p>
            <button
                type="button"
                onClick={copy}
                title={`Copy ${label.toLowerCase()}`}
                className="group w-full flex items-center gap-2 glass rounded-xl border-white/5 px-3 py-3 text-left hover:border-white/20 transition-colors cursor-pointer"
            >
                <span className="font-mono text-xs text-white truncate flex-1">{value}</span>
                {copied ? (
                    <FiCheck size={13} className="text-emerald-400 shrink-0" />
                ) : (
                    <FiCopy
                        size={13}
                        className="text-white/20 group-hover:text-white/60 transition-colors shrink-0"
                    />
                )}
            </button>
        </div>
    );
};

const DomainDnsModal: React.FC<Props> = ({
    domain,
    records,
    checking,
    verified = false,
    lastCheckFailed,
    onCheck,
    onClose,
}) => {
    // Hold the page still behind the overlay, and restore whatever was there
    // before rather than assuming it was scrollable.
    useEffect(() => {
        const previous = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = previous;
        };
    }, []);

    return (
        <Portal>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 bg-black/80 backdrop-blur-xl flex justify-center items-center p-4 z-[100]"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="glass-card rounded-[2.5rem] border-white/10 p-8 md:p-10 w-full max-w-lg relative shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 w-10 h-10 glass rounded-full flex items-center justify-center text-white/40 hover:text-white transition-all cursor-pointer"
                    >
                        <FaTimes size={16} />
                    </button>

                    <div className="mb-8 text-center">
                        <h2 className="text-3xl font-black text-white tracking-tighter">DNS Setup</h2>
                        <p className="font-mono text-sm text-white/50 mt-2 break-all px-6">{domain}</p>
                    </div>

                    <div className="flex items-start gap-3 mb-6 glass rounded-2xl border-white/5 p-4">
                        <FiAlertCircle className="text-blue-400 shrink-0 mt-0.5" size={16} />
                        <p className="text-white/60 text-sm leading-relaxed">
                            Add {records.length === 1 ? "this record" : "these records"} at your DNS
                            provider, then check again. Propagation usually takes a few minutes but
                            can take up to 48 hours.
                        </p>
                    </div>

                    <div className="space-y-5">
                        {records.map((r, i) => (
                            <div
                                key={i}
                                className="grid grid-cols-2 sm:grid-cols-[76px_1fr] gap-3 sm:gap-4"
                            >
                                <CopyField label="Type" value={r.type} />
                                <CopyField label="Name" value={r.name} />
                                <div className="col-span-2">
                                    <CopyField label="Value" value={r.value} />
                                </div>
                            </div>
                        ))}
                    </div>

                    {lastCheckFailed && (
                        <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 text-yellow-500 text-xs font-bold mt-5 ml-1"
                        >
                            <FiAlertCircle size={13} />
                            <span>Not propagated yet. Give it a few minutes.</span>
                        </motion.div>
                    )}

                    <button
                        onClick={verified ? onClose : onCheck}
                        disabled={checking}
                        className="w-full mt-8 py-5 bg-white text-black font-black rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                        {checking ? (
                            <>
                                <FiLoader className="animate-spin" size={16} />
                                Checking...
                            </>
                        ) : verified ? (
                            <>
                                <FiCheck size={16} />
                                Done
                            </>
                        ) : (
                            <>
                                <FiRefreshCw size={15} />
                                Check DNS
                            </>
                        )}
                    </button>

                    <p className="text-center text-[10px] text-white/20 mt-6 font-medium uppercase tracking-[0.2em]">
                        {verified
                            ? "These records are what keep your domain live"
                            : "Your profile stays live at devbio.co meanwhile"}
                    </p>
                </motion.div>
            </motion.div>
        </Portal>
    );
};

export default DomainDnsModal;
