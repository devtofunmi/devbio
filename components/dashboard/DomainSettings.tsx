import React, { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiGlobe,
    FiLoader,
    FiCheck,
    FiTrash2,
    FiExternalLink,
    FiSettings,
    FiAlertCircle,
} from "react-icons/fi";
import { toast } from "react-toastify";
import DomainDnsModal, { DnsRecord } from "./DomainDnsModal";

/**
 * Custom domain panel, wired to /api/domains/*.
 *
 * The DNS records rendered here come from Vercel via the API rather than being
 * computed client-side: the CNAME target is project-specific and the apex IP
 * can change, so anything hardcoded would eventually be wrong.
 */

type Status = "loading" | "unavailable" | "empty" | "pending" | "verified";

type DomainPayload = {
    domain: string | null;
    verified?: boolean;
    configured?: boolean;
    records?: DnsRecord[];
    reason?: string | null;
    available?: boolean;
    error?: string;
};

// Cheap client-side check for instant feedback. The server validates again.
const DOMAIN_RE = /^(?!-)[a-z0-9-]{1,63}(?<!-)(\.(?!-)[a-z0-9-]{1,63}(?<!-))+$/;

const normalise = (raw: string) =>
    raw
        .trim()
        .toLowerCase()
        .replace(/^https?:\/\//, "")
        .replace(/\/.*$/, "")
        .replace(/\.$/, "");

const DomainSettings: React.FC = () => {
    const [status, setStatus] = useState<Status>("loading");
    const [input, setInput] = useState("");
    const [domain, setDomain] = useState("");
    const [records, setRecords] = useState<DnsRecord[]>([]);
    const [reason, setReason] = useState<string | null>(null);
    const [busy, setBusy] = useState(false);
    const [dnsOpen, setDnsOpen] = useState(false);
    const [confirmRemove, setConfirmRemove] = useState(false);

    /** Fold an API payload into local state. */
    const apply = useCallback((data: DomainPayload) => {
        if (!data.domain) {
            setDomain("");
            setRecords([]);
            setReason(null);
            setStatus(data.available === false ? "unavailable" : "empty");
            return;
        }
        setDomain(data.domain);
        setRecords(data.records || []);
        setReason(data.reason ?? null);
        // Live means Vercel both owns the domain and sees DNS pointing at it.
        setStatus(data.verified && data.configured ? "verified" : "pending");
    }, []);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const res = await fetch("/api/domains/status");
                const data: DomainPayload = await res.json();
                if (cancelled) return;
                if (!res.ok) {
                    setStatus(res.status === 503 ? "unavailable" : "empty");
                    return;
                }
                apply(data);
            } catch {
                if (!cancelled) setStatus("empty");
            }
        })();
        return () => {
            cancelled = true;
        };
    }, [apply]);

    const handleAdd = async () => {
        const candidate = normalise(input);
        if (!DOMAIN_RE.test(candidate)) {
            toast.error("That doesn't look like a valid domain");
            return;
        }
        setBusy(true);
        try {
            const res = await fetch("/api/domains/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ domain: candidate }),
            });
            const data: DomainPayload = await res.json();
            if (!res.ok) {
                toast.error(data.error || "Couldn't add that domain");
                return;
            }
            apply(data);
            // Straight into the DNS instructions, which is the next thing to do.
            setDnsOpen(true);
        } catch {
            toast.error("Network error. Try again.");
        } finally {
            setBusy(false);
        }
    };

    const handleCheck = async () => {
        setBusy(true);
        try {
            const res = await fetch("/api/domains/status");
            const data: DomainPayload = await res.json();
            if (!res.ok) {
                toast.error(data.error || "Couldn't check that domain");
                return;
            }
            const live = Boolean(data.verified && data.configured);
            apply(data);
            if (live) {
                setDnsOpen(false);
                toast.success("Domain verified");
            }
        } catch {
            toast.error("Network error. Try again.");
        } finally {
            setBusy(false);
        }
    };

    const handleRemove = async () => {
        setBusy(true);
        try {
            const res = await fetch("/api/domains/remove", { method: "DELETE" });
            const data: DomainPayload = await res.json();
            if (!res.ok) {
                toast.error(data.error || "Couldn't remove that domain");
                return;
            }
            setInput("");
            setDnsOpen(false);
            setConfirmRemove(false);
            apply({ domain: null, available: true });
            toast.success("Domain removed");
        } catch {
            toast.error("Network error. Try again.");
        } finally {
            setBusy(false);
        }
    };

    return (
        <section className="space-y-8 mt-8 mb-20 md:mb-0">
            <div className="glass-card rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-10 border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                    <FiGlobe size={120} className="text-white" />
                </div>

                <div className="relative z-10">
                    <div className="mb-8">
                        <h3 className="text-2xl font-black text-white tracking-tighter">
                            Custom Domain
                        </h3>
                        <p className="text-white/40 text-sm font-medium uppercase tracking-widest mt-1">
                            Serve your profile from your own domain
                        </p>
                    </div>

                    <AnimatePresence mode="wait">
                        {/* -------------------------------------------- loading */}
                        {status === "loading" && (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center gap-3 text-white/30 py-4"
                            >
                                <FiLoader className="animate-spin" size={16} />
                                <span className="text-sm font-medium">Loading...</span>
                            </motion.div>
                        )}

                        {/* ---------------------------------------- unavailable */}
                        {status === "unavailable" && (
                            <motion.div
                                key="unavailable"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.25 }}
                                className="flex items-start gap-3 glass rounded-2xl border-white/5 p-5"
                            >
                                <FiAlertCircle className="text-yellow-500 shrink-0 mt-0.5" size={16} />
                                <p className="text-white/50 text-sm leading-relaxed">
                                    Custom domains aren&apos;t switched on yet. Check back soon.
                                </p>
                            </motion.div>
                        )}

                        {/* ---------------------------------------------- empty */}
                        {status === "empty" && (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.25 }}
                            >
                                <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-end">
                                    <div className="space-y-2 flex-1 min-w-0">
                                        <label className="text-xs font-black text-white/40 uppercase tracking-[0.2em] ml-4">
                                            Domain
                                        </label>
                                        <input
                                            type="text"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyDown={(e) => e.key === "Enter" && !busy && handleAdd()}
                                            placeholder="yourdomain.com"
                                            spellCheck={false}
                                            autoCapitalize="none"
                                            className="w-full p-5 glass rounded-2xl focus:outline-none focus:border-white/30 border-white/5 text-white font-bold font-mono transition-colors"
                                        />
                                    </div>
                                    <button
                                        onClick={handleAdd}
                                        disabled={busy || !input.trim()}
                                        className="w-full md:w-auto shrink-0 px-8 py-5 bg-white text-black font-black rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/5 cursor-pointer flex items-center justify-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                                    >
                                        {busy ? <FiLoader className="animate-spin" /> : "Add Domain"}
                                    </button>
                                </div>
                                <p className="text-white/30 text-xs mt-4 ml-1 leading-relaxed">
                                    Your profile stays reachable at devbio.co/yourname either way.
                                    You&apos;ll need access to your domain&apos;s DNS settings.
                                </p>
                            </motion.div>
                        )}

                        {/* -------------------------------------------- pending */}
                        {status === "pending" && (
                            <motion.div
                                key="pending"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.25 }}
                                className="space-y-5"
                            >
                                <div className="flex items-center gap-3 flex-wrap">
                                    <span className="font-mono text-lg text-white font-bold break-all">
                                        {domain}
                                    </span>
                                    <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 text-[10px] font-black uppercase tracking-widest">
                                        <FiLoader className="animate-spin" size={11} />
                                        Pending DNS
                                    </span>
                                </div>

                                <p className="text-white/40 text-sm leading-relaxed">
                                    {reason || "Waiting on your DNS records."} Open the setup steps
                                    to copy them and check again.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-3">
                                    <button
                                        onClick={() => setDnsOpen(true)}
                                        className="px-6 py-4 bg-white text-black font-black rounded-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-3"
                                    >
                                        <FiSettings size={15} />
                                        DNS Setup
                                    </button>
                                    <button
                                        onClick={handleRemove}
                                        disabled={busy}
                                        className="px-6 py-4 glass rounded-2xl border-white/5 text-white/40 hover:text-white hover:border-white/20 font-black text-xs uppercase tracking-widest transition-all cursor-pointer disabled:opacity-40"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* ------------------------------------------- verified */}
                        {status === "verified" && (
                            <motion.div
                                key="verified"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.25 }}
                                className="space-y-6"
                            >
                                <div className="glass rounded-2xl border-emerald-500/20 bg-emerald-500/[0.03] p-5 md:p-6">
                                    <div className="flex items-start justify-between gap-4 flex-wrap">
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-3 flex-wrap mb-2">
                                                <span className="font-mono text-lg text-white font-bold break-all">
                                                    {domain}
                                                </span>
                                                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                                                    <FiCheck size={11} />
                                                    Live
                                                </span>
                                            </div>
                                            <p className="text-white/40 text-xs">
                                                Canonical URL now points here. devbio.co still works.
                                            </p>
                                        </div>
                                        <a
                                            href={`https://${domain}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="shrink-0 inline-flex items-center gap-2 px-5 py-3 glass rounded-xl border-white/10 text-white/70 hover:text-white hover:border-white/30 text-xs font-black uppercase tracking-widest transition-all"
                                        >
                                            Visit <FiExternalLink size={13} />
                                        </a>
                                    </div>
                                </div>

                                {!confirmRemove ? (
                                    <div className="flex flex-wrap gap-3">
                                        <button
                                            onClick={() => setDnsOpen(true)}
                                            className="inline-flex items-center gap-2 px-5 py-3 glass rounded-xl border-white/5 text-white/40 hover:text-white hover:border-white/20 text-xs font-black uppercase tracking-widest transition-all cursor-pointer"
                                        >
                                            <FiSettings size={13} />
                                            DNS records
                                        </button>
                                        <button
                                            onClick={() => setConfirmRemove(true)}
                                            className="inline-flex items-center gap-2 px-5 py-3 glass rounded-xl border-white/5 text-red-500/60 hover:text-white hover:bg-red-500 hover:border-red-500 text-xs font-black uppercase tracking-widest transition-all cursor-pointer"
                                        >
                                            <FiTrash2 size={13} />
                                            Remove domain
                                        </button>
                                    </div>
                                ) : (
                                    <div className="glass rounded-2xl border-red-500/20 p-5 space-y-4">
                                        <p className="text-white/70 text-sm">
                                            Remove <span className="font-mono font-bold">{domain}</span>?
                                            Your profile stays live at devbio.co.
                                        </p>
                                        <div className="flex gap-3">
                                            <button
                                                onClick={handleRemove}
                                                disabled={busy}
                                                className="px-5 py-3 bg-red-500 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-red-600 transition-all cursor-pointer flex items-center gap-2 disabled:opacity-40"
                                            >
                                                {busy && <FiLoader className="animate-spin" size={12} />}
                                                Remove
                                            </button>
                                            <button
                                                onClick={() => setConfirmRemove(false)}
                                                className="px-5 py-3 glass rounded-xl border-white/5 text-white/40 hover:text-white text-xs font-black uppercase tracking-widest transition-all cursor-pointer"
                                            >
                                                Keep it
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <AnimatePresence>
                {dnsOpen && domain && (
                    <DomainDnsModal
                        domain={domain}
                        records={records}
                        checking={busy}
                        verified={status === "verified"}
                        reason={status === "pending" ? reason : null}
                        onCheck={handleCheck}
                        onClose={() => setDnsOpen(false)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

export default DomainSettings;
