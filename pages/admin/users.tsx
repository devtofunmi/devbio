import React, { useCallback, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { FiSearch, FiRefreshCw, FiExternalLink } from "react-icons/fi";
import { toast } from "react-toastify";
import AdminLayout from "../../components/admin/AdminLayout";
import { Skeleton } from "../../components/admin/ui";
import { getAdminUser } from "../../lib/adminAuth";
import type { AdminUserRow } from "../api/admin/users";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const admin = await getAdminUser(ctx);
    if (!admin) return { redirect: { destination: "/dashboard", permanent: false } };
    return { props: {} };
};

const AdminUsers: React.FC = () => {
    const [users, setUsers] = useState<AdminUserRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [updating, setUpdating] = useState<string | null>(null);
    const [sortKey, setSortKey] = useState<"projects" | "views" | "clicks" | null>(null);
    const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

    const handleSort = (key: "projects" | "views" | "clicks") => {
        if (sortKey === key) {
            setSortDir((d) => (d === "desc" ? "asc" : "desc"));
        } else {
            setSortKey(key);
            setSortDir("desc");
        }
    };

    const load = useCallback(async () => {
        try {
            const res = await fetch("/api/admin/users");
            if (!res.ok) throw new Error();
            const data = await res.json();
            setUsers(data.users || []);
        } catch {
            toast.error("Failed to load users");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { load(); }, [load]);

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

    const metric = (u: AdminUserRow) =>
        sortKey === "projects" ? u.projectCount : sortKey === "views" ? u.viewCount : u.clickCount;
    const sorted = sortKey
        ? [...filtered].sort((a, b) => (sortDir === "desc" ? metric(b) - metric(a) : metric(a) - metric(b)))
        : filtered;

    const arrow = (key: "projects" | "views" | "clicks") =>
        sortKey === key ? (sortDir === "desc" ? " ↓" : " ↑") : "";

    return (
        <AdminLayout title="Users">
            <div className="flex items-center justify-between gap-4 mb-10">
                <div className="min-w-0">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter">Users</h1>
                    <p className="text-white/30 text-sm font-medium mt-2">{filtered.length} total</p>
                </div>
                <button
                    onClick={load}
                    className="glass rounded-2xl px-4 sm:px-5 py-3 text-xs font-black uppercase tracking-widest text-white/60 hover:text-white border-white/10 flex items-center gap-2 transition-colors cursor-pointer shrink-0 whitespace-nowrap"
                >
                    <FiRefreshCw /> Refresh
                </button>
            </div>

            <div className="glass-card rounded-[2rem] border-white/5 overflow-hidden">
                <div className="p-6 md:p-8 border-b border-white/5">
                    <div className="relative max-w-sm">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search name, username, email"
                            className="glass rounded-2xl pl-11 pr-4 py-3 text-sm w-full border-white/10 focus:outline-none focus:border-white/30 transition-colors"
                        />
                    </div>
                </div>

                <div className="max-h-[560px] overflow-auto">
                    {/* min-width so the 7 columns scroll horizontally on narrow
                        screens instead of being crushed into unreadable wraps */}
                    <table className="w-full min-w-[900px] text-sm">
                        <thead className="sticky top-0 z-10">
                            <tr className="text-white/30 text-[10px] uppercase tracking-widest">
                                <th className="text-left font-black px-6 py-4 bg-[#0d0d0d]">User</th>
                                <th className="text-left font-black px-6 py-4 bg-[#0d0d0d]">Joined</th>
                                <th onClick={() => handleSort("projects")} className={`text-right font-black px-6 py-4 bg-[#0d0d0d] cursor-pointer select-none hover:text-white/60 transition-colors ${sortKey === "projects" ? "text-white" : ""}`}>Projects{arrow("projects")}</th>
                                <th onClick={() => handleSort("views")} className={`text-right font-black px-6 py-4 bg-[#0d0d0d] cursor-pointer select-none hover:text-white/60 transition-colors ${sortKey === "views" ? "text-white" : ""}`}>Views{arrow("views")}</th>
                                <th onClick={() => handleSort("clicks")} className={`text-right font-black px-6 py-4 bg-[#0d0d0d] cursor-pointer select-none hover:text-white/60 transition-colors ${sortKey === "clicks" ? "text-white" : ""}`}>Clicks{arrow("clicks")}</th>
                                <th className="text-center font-black px-6 py-4 bg-[#0d0d0d]">Portfolio</th>
                                <th className="text-right font-black px-6 py-4 bg-[#0d0d0d]">Donor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading && Array.from({ length: 8 }).map((_, i) => (
                                <tr key={`skeleton-${i}`} className="border-t border-white/5">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <Skeleton className="w-9 h-9 rounded-full shrink-0" />
                                            <div className="space-y-2">
                                                <Skeleton className="h-3 w-28" />
                                                <Skeleton className="h-2 w-40" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4"><Skeleton className="h-3 w-20" /></td>
                                    <td className="px-6 py-4"><Skeleton className="h-3 w-6 ml-auto" /></td>
                                    <td className="px-6 py-4"><Skeleton className="h-3 w-6 ml-auto" /></td>
                                    <td className="px-6 py-4"><Skeleton className="h-3 w-6 ml-auto" /></td>
                                    <td className="px-6 py-4"><Skeleton className="h-3 w-12 mx-auto" /></td>
                                    <td className="px-6 py-4"><Skeleton className="h-6 w-16 ml-auto rounded-lg" /></td>
                                </tr>
                            ))}
                            {!loading && sorted.map((u) => (
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
                                    <td className="px-6 py-4 text-center">
                                        {u.username ? (
                                            <a
                                                href={`/${u.username}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 text-[10px] font-black uppercase tracking-widest transition-colors"
                                            >
                                                View <FiExternalLink size={11} />
                                            </a>
                                        ) : (
                                            <span className="text-white/20 text-[10px]">—</span>
                                        )}
                                    </td>
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
                                <tr><td colSpan={7} className="text-center text-white/20 py-16 uppercase tracking-widest font-black text-xs">No users found</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminUsers;
