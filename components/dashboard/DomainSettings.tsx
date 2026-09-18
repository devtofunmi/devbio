import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiGlobe,
    FiLoader,
    FiCheck,
    FiTrash2,
    FiExternalLink,
    FiSettings,
} from "react-icons/fi";
import { toast } from "react-toastify";
import DomainDnsModal, { DnsRecord } from "./DomainDnsModal";

/**
 * Custom domain panel — UI ONLY, backed by local mock state.
 *
 * Nothing here touches Supabase or the Vercel API yet. The DNS records shown
 * are plausible placeholders; the real values are project-specific and must be
 * read from Vercel per domain. Verification is faked: the first check reports
 * "not propagated" so the pending state can actually be seen, the second
 * succeeds.
 */

type Status = "empty" | "pending" | "verified";

// Matches example.com, blog.example.com, my-site.co.uk. No protocol, no path.
const DOMAIN_RE = /^(?!-)[a-z0-9-]{1,63}(?<!-)(\.(?!-)[a-z0-9-]{1,63}(?<!-))+$/;

const normalise = (raw: string) =>
    raw
        .trim()
        .toLowerCase()
        .replace(/^https?:\/\//, "")
        .replace(/\/.*$/, "")
        .replace(/\.$/, "");

/**
 * How many trailing labels make up the registrable domain: two normally, three
 * for two-part TLDs like co.uk. Good enough for display; the real split would
 * want the public suffix list.
 */
const apexLabelCount = (parts: string[]) =>
    parts.length >= 3 && /^(co|com|org|net|ac|gov)$/.test(parts[parts.length - 2]) ? 3 : 2;

const isApex = (domain: string) => {
    const parts = domain.split(".");
    return parts.length <= apexLabelCount(parts);
};

/**
 * Placeholder records. The real apex IP and the project-specific CNAME target
 * both come from Vercel's API at registration time.
 */
const mockRecords = (domain: string): DnsRecord[] => {
    if (isApex(domain)) {
        return [{ type: "A", name: "@", value: "76.76.21.21" }];
    }
    const parts = domain.split(".");
    // Everything to the left of the registrable domain, so a.b.example.com
    // yields "a.b" rather than just "a".
    const name = parts.slice(0, parts.length - apexLabelCount(parts)).join(".");
    return [
        {
            type: "CNAME",
            name: name || "@",
            value: "d1d4fc829fe7bc7c.vercel-dns-017.com",
        },
    ];
};

const DomainSettings: React.FC = () => {
    const [status, setStatus] = useState<Status>("empty");
    const [input, setInput] = useState("");
    const [domain, setDomain] = useState("");
    const [busy, setBusy] = useState(false);
    const [checks, setChecks] = useState(0);
    const [dnsOpen, setDnsOpen] = useState(false);
    const [confirmRemove, setConfirmRemove] = useState(false);

    const records = useMemo(() => (domain ? mockRecords(domain) : []), [domain]);

    const handleAdd = async () => {
        const candidate = normalise(input);
        if (!DOMAIN_RE.test(candidate)) {
            toast.error("That doesn't look like a valid domain");
            return;
        }
        if (candidate.startsWith("www.")) {
            toast.info("Add the root domain; www is configured for you");
            return;
        }
        setBusy(true);
        // Stand-in for POST /api/domains/add
        await new Promise((r) => setTimeout(r, 700));
        setDomain(candidate);
        setStatus("pending");
        setChecks(0);
        setBusy(false);
        // Straight into the DNS instructions, which is the next thing to do.
        setDnsOpen(true);
    };

    const handleCheck = async () => {
        setBusy(true);
        // Stand-in for GET /api/domains/status
        await new Promise((r) => setTimeout(r, 1100));
        const next = checks + 1;
        setChecks(next);
        setBusy(false);
        // First check fails on purpose so the pending state is reachable.
        if (next >= 2) {
            setStatus("verified");
            setDnsOpen(false);
            toast.success("Domain verified");
        }
    };

    const handleRemove = async () => {
        setBusy(true);
        // Stand-in for DELETE /api/domains/remove
        await new Promise((r) => setTimeout(r, 600));
        setStatus("empty");
        setDomain("");
        setInput("");
        setChecks(0);
        setDnsOpen(false);
        setConfirmRemove(false);
        setBusy(false);
        toast.success("Domain removed");
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
                                            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
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
                                    Waiting on your DNS records. Open the setup steps to copy them
                                    and check again.
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
                        lastCheckFailed={checks > 0 && status === "pending"}
                        onCheck={handleCheck}
                        onClose={() => setDnsOpen(false)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

export default DomainSettings;
