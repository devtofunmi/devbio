import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { GetServerSideProps } from "next";
import { motion } from "framer-motion";
import { FiUsers, FiEye, FiMousePointer, FiFolder, FiArrowLeft, FiRefreshCw, FiSearch } from "react-icons/fi";
import { toast } from "react-toastify";
import { getAdminUser } from "../../lib/adminAuth";
import type { AdminUserRow } from "../api/admin/users";
import type { AdminAnalytics } from "../api/admin/analytics";

// Non-admins never reach this page — gate at the server before render.
export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const admin = await getAdminUser(ctx);
    if (!admin) {
        return { redirect: { destination: "/dashboard", permanent: false } };
    }
    return { props: {} };
};

const flagUrl = (code?: string) => {
    const cc = (code || "").toLowerCase();
    return /^[a-z]{2}$/.test(cc) && cc !== "un" ? `https://flagcdn.com/24x18/${cc}.png` : null;
};

const timeAgo = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime();
    const m = Math.floor(diff / 60000);
    if (m < 1) return "just now";
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    return `${Math.floor(h / 24)}d ago`;
};

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: number; accent: string }> = ({ icon, label, value, accent }) => (
    <div className="glass-card p-6 rounded-3xl border-white/5">
        <div className={`w-10 h-10 glass rounded-xl flex items-center justify-center mb-4 ${accent}`}>{icon}</div>
        <p className="text-3xl font-black text-white tracking-tight">{value.toLocaleString()}</p>
        <p className="text-white/30 text-[10px] uppercase font-black tracking-widest mt-1">{label}</p>
    </div>
);

const AdminPage: React.FC = () => {
    const [users, setUsers] = useState<AdminUserRow[]>([]);
    const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [updating, setUpdating] = useState<string | null>(null);

    const loadUsers = useCallback(async () => {
        try {
            const res = await fetch("/api/admin/users");
            if (!res.ok) throw new Error("users");
            const data = await res.json();
            setUsers(data.users || []);
        } catch {
            toast.error("Failed to load users");
        }
    }, []);

    const loadAnalytics = useCallback(async () => {
        try {
            const res = await fetch("/api/admin/analytics");
            if (!res.ok) throw new Error("analytics");
            setAnalytics(await res.json());
        } catch {
            /* keep last snapshot on transient failure */
        }
    }, []);

    useEffect(() => {
        (async () => {
            await Promise.all([loadUsers(), loadAnalytics()]);
            setLoading(false);
        })();
    }, [loadUsers, loadAnalytics]);

    // Poll analytics for a live-ish feel.
    useEffect(() => {
        const id = setInterval(loadAnalytics, 12000);
        return () => clearInterval(id);
    }, [loadAnalytics]);

    const toggleDonor = async (u: AdminUserRow) => {
        setUpdating(u.id);
        const next = !u.is_donor;
        setUsers((prev) => prev.map((x) => (x.id === u.id ? { ...x, is_donor: next } : x)));
        try {
            const res = await fetch("/api/admin/toggle-donor", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: u.id, isDonor: next }),
            });
            if (!res.ok) throw new Error();
            toast.success(next ? "Donor badge granted" : "Donor badge removed");
        } catch {
            setUsers((prev) => prev.map((x) => (x.id === u.id ? { ...x, is_donor: !next } : x)));
            toast.error("Failed to update donor status");
        } finally {
            setUpdating(null);
        }
    };

    const filtered = users.filter((u) => {
        const q = search.toLowerCase().trim();
        if (!q) return true;
        return (
            (u.username || "").toLowerCase().includes(q) ||
            (u.full_name || "").toLowerCase().includes(q) ||
            (u.email || "").toLowerCase().includes(q)
        );
    });

    return (
        <div className="min-h-screen bg-black text-white px-4 md:px-10 py-10">
            <Head>
                <title>Admin · DevBio</title>
                <meta name="robots" content="noindex" />
            </Head>

            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <Link href="/dashboard" className="inline-flex items-center gap-2 text-white/40 hover:text-white text-xs font-bold uppercase tracking-widest mb-3 transition-colors">
                            <FiArrowLeft /> Dashboard
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter">Admin</h1>
                    </div>
                    <button
                        onClick={() => { loadUsers(); loadAnalytics(); }}
                        className="glass rounded-2xl px-5 py-3 text-xs font-black uppercase tracking-widest text-white/60 hover:text-white border-white/10 flex items-center gap-2 transition-colors cursor-pointer"
                    >
                        <FiRefreshCw /> Refresh
                    </button>
                </div>

                {/* Platform analytics */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <StatCard icon={<FiUsers size={18} />} label="Users" value={analytics?.totals.users ?? 0} accent="text-blue-400" />
                    <StatCard icon={<FiEye size={18} />} label="Total Views" value={analytics?.totals.views ?? 0} accent="text-emerald-400" />
                    <StatCard icon={<FiMousePointer size={18} />} label="Total Clicks" value={analytics?.totals.clicks ?? 0} accent="text-purple-400" />
                    <StatCard icon={<FiFolder size={18} />} label="Projects" value={analytics?.totals.projects ?? 0} accent="text-orange-400" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
                    {/* Top profiles */}
                    <div className="glass-card p-8 rounded-[2rem] border-white/5">
                        <h2 className="text-lg font-black tracking-tight mb-6">Top Profiles</h2>
                        <div className="space-y-4">
                            {(analytics?.topProfiles || []).map((p, i) => (
                                <div key={i} className="flex justify-between items-center text-sm">
                                    <span className="text-white/70 truncate">{p.username || "—"}</span>
                                    <span className="text-emerald-400 font-bold text-xs">{p.views}</span>
                                </div>
                            ))}
                            {analytics && analytics.topProfiles.length === 0 && <p className="text-white/20 text-xs uppercase tracking-widest">No views yet</p>}
                        </div>
                    </div>

                    {/* Geo */}
                    <div className="glass-card p-8 rounded-[2rem] border-white/5">
                        <h2 className="text-lg font-black tracking-tight mb-6">By Country</h2>
                        <div className="space-y-4">
                            {(analytics?.geo || []).map((g, i) => {
                                const f = flagUrl(g.code);
                                return (
                                    <div key={i} className="flex justify-between items-center text-sm">
                                        <span className="flex items-center gap-2 text-white/70 truncate">
                                            {f ? <Image src={f} alt={g.country} width={20} height={15} className="rounded-sm shrink-0" unoptimized /> : <span className="w-5 text-center">🏳️</span>}
                                            {g.country}
                                        </span>
                                        <span className="text-white/40 font-bold text-xs">{g.count}</span>
                                    </div>
                                );
                            })}
                            {analytics && analytics.geo.length === 0 && <p className="text-white/20 text-xs uppercase tracking-widest">No geo data</p>}
                        </div>
                    </div>

                    {/* Recent activity */}
                    <div className="glass-card p-8 rounded-[2rem] border-white/5">
                        <h2 className="text-lg font-black tracking-tight mb-6 flex items-center gap-2">
                            Live Activity <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        </h2>
                        <div className="space-y-3">
                            {(analytics?.recent || []).map((r, i) => (
                                <div key={i} className="flex justify-between items-center text-xs">
                                    <span className="text-white/60 truncate">
                                        <span className="text-white/90">{r.username || "—"}</span> · {r.country}
                                    </span>
                                    <span className="text-white/20 shrink-0 ml-2">{timeAgo(r.at)}</span>
                                </div>
                            ))}
                            {analytics && analytics.recent.length === 0 && <p className="text-white/20 text-xs uppercase tracking-widest">No activity yet</p>}
                        </div>
                    </div>
                </div>

                {/* Users */}
                <div className="glass-card rounded-[2rem] border-white/5 overflow-hidden">
                    <div className="p-6 md:p-8 flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-white/5">
                        <h2 className="text-2xl font-black tracking-tight">Users <span className="text-white/20 text-lg">({filtered.length})</span></h2>
                        <div className="relative">
                            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search name, username, email"
                                className="glass rounded-2xl pl-11 pr-4 py-3 text-sm w-full sm:w-72 border-white/10 focus:outline-none focus:border-white/30 transition-colors"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm min-w-[720px]">
                            <thead>
                                <tr className="text-white/30 text-[10px] uppercase tracking-widest">
                                    <th className="text-left font-black px-6 py-4">User</th>
                                    <th className="text-left font-black px-6 py-4">Joined</th>
                                    <th className="text-right font-black px-6 py-4">Projects</th>
                                    <th className="text-right font-black px-6 py-4">Views</th>
                                    <th className="text-right font-black px-6 py-4">Clicks</th>
                                    <th className="text-right font-black px-6 py-4">Donor</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading && (
                                    <tr><td colSpan={6} className="text-center text-white/20 py-16 uppercase tracking-widest font-black text-xs">Loading…</td></tr>
                                )}
                                {!loading && filtered.map((u) => (
                                    <tr key={u.id} className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full overflow-hidden bg-white/5 shrink-0 flex items-center justify-center relative">
                                                    {u.avatar_url ? (
                                                        // eslint-disable-next-line @next/next/no-img-element
                                                        <img src={u.avatar_url} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <span className="text-white/30 text-xs font-black">{(u.full_name || u.username || "?").charAt(0).toUpperCase()}</span>
                                                    )}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="font-bold text-white truncate">{u.full_name || "—"}</p>
                                                    <p className="text-white/30 text-xs truncate">
                                                        {u.username ? `@${u.username}` : "no username"}{u.email ? ` · ${u.email}` : ""}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-white/40">{u.created_at ? new Date(u.created_at).toLocaleDateString() : "—"}</td>
                                        <td className="px-6 py-4 text-right text-white/70">{u.projectCount}</td>
                                        <td className="px-6 py-4 text-right text-emerald-400 font-bold">{u.viewCount}</td>
                                        <td className="px-6 py-4 text-right text-purple-400 font-bold">{u.clickCount}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => toggleDonor(u)}
                                                disabled={updating === u.id}
                                                className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all disabled:opacity-50 cursor-pointer ${u.is_donor ? "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30" : "glass text-white/40 hover:text-white border-white/10"}`}
                                            >
                                                {u.is_donor ? "★ Donor" : "Grant"}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {!loading && filtered.length === 0 && (
                                    <tr><td colSpan={6} className="text-center text-white/20 py-16 uppercase tracking-widest font-black text-xs">No users found</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-white/20 text-[10px] uppercase tracking-widest mt-8">
                    Admin · analytics refresh every 12s
                </motion.p>
            </div>
        </div>
    );
};

export default AdminPage;
