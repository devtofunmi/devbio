import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { GetServerSideProps } from "next";
import { motion } from "framer-motion";
import { FiUsers, FiEye, FiMousePointer, FiFolder } from "react-icons/fi";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import AdminLayout from "../../components/admin/AdminLayout";
import { StatCard, StatCardSkeleton, ListSkeleton, Skeleton, flagUrl } from "../../components/admin/ui";
import { getAdminUser } from "../../lib/adminAuth";
import type { AdminAnalytics } from "../api/admin/analytics";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const admin = await getAdminUser(ctx);
    if (!admin) return { redirect: { destination: "/dashboard", permanent: false } };
    return { props: {} };
};

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) => {
    if (active && payload && payload.length) {
        return (
            <div className="glass-card p-4 border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl">
                <p className="text-white/40 text-[10px] uppercase font-black mb-2 tracking-widest">{label}</p>
                <div className="space-y-1">
                    <p className="text-blue-400 text-sm font-black flex items-center justify-between gap-8">
                        Views <span className="text-white">{payload[0]?.value}</span>
                    </p>
                    <p className="text-purple-400 text-sm font-black flex items-center justify-between gap-8">
                        Clicks <span className="text-white">{payload[1]?.value}</span>
                    </p>
                </div>
            </div>
        );
    }
    return null;
};

const AdminAnalyticsPage: React.FC = () => {
    const [data, setData] = useState<AdminAnalytics | null>(null);

    const load = useCallback(async () => {
        try {
            const res = await fetch("/api/admin/analytics");
            if (res.ok) setData(await res.json());
        } catch { /* keep last snapshot */ }
    }, []);

    useEffect(() => { load(); }, [load]);
    useEffect(() => {
        const id = setInterval(load, 12000);
        return () => clearInterval(id);
    }, [load]);

    const loading = !data;

    return (
        <AdminLayout title="Analytics">
            <div className="mb-10">
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter">Analytics</h1>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {loading ? (
                    Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
                ) : (
                    <>
                        <StatCard icon={<FiUsers size={18} />} label="Users" value={data.totals.users} accent="text-blue-400" />
                        <StatCard icon={<FiEye size={18} />} label="Total Views" value={data.totals.views} accent="text-emerald-400" />
                        <StatCard icon={<FiMousePointer size={18} />} label="Total Clicks" value={data.totals.clicks} accent="text-purple-400" />
                        <StatCard icon={<FiFolder size={18} />} label="Projects" value={data.totals.projects} accent="text-orange-400" />
                    </>
                )}
            </div>

            {/* Trend chart — same design as the user dashboard */}
            <div className="glass-card p-6 md:p-8 rounded-[2rem] border-white/5 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6">
                    <h2 className="text-base md:text-lg font-black tracking-tight">Views &amp; Clicks · last 14 days</h2>
                    <div className="flex gap-4 shrink-0">
                        <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500" /><span className="text-[10px] font-black uppercase text-white/40">Views</span></div>
                        <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-purple-500" /><span className="text-[10px] font-black uppercase text-white/40">Clicks</span></div>
                    </div>
                </div>
                <div className="h-[280px] md:h-[400px] w-full">
                    {loading ? (
                        <Skeleton className="w-full h-full rounded-2xl" />
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data.timeseries}>
                                <defs>
                                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                <XAxis
                                    dataKey="date"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "rgba(255,255,255,0.2)", fontSize: 10, fontWeight: 900 }}
                                    dy={10}
                                />
                                <YAxis hide />
                                <Tooltip content={<CustomTooltip />} />
                                <Area type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
                                <Area type="monotone" dataKey="clicks" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorClicks)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top profiles */}
                <div className="glass-card p-6 md:p-8 rounded-[2rem] border-white/5">
                    <h2 className="text-lg font-black tracking-tight mb-6">Top Profiles</h2>
                    {loading ? (
                        <ListSkeleton />
                    ) : (
                        <div className="space-y-4">
                            {data.topProfiles.map((p, i) => (
                                <div key={i} className="flex justify-between items-center text-sm">
                                    <span className="text-white/70 truncate min-w-0">{p.username || "—"}</span>
                                    <span className="text-emerald-400 font-bold text-xs shrink-0 ml-3">{p.views}</span>
                                </div>
                            ))}
                            {data.topProfiles.length === 0 && <p className="text-white/20 text-xs uppercase tracking-widest">No views yet</p>}
                        </div>
                    )}
                </div>

                {/* By country */}
                <div className="glass-card p-6 md:p-8 rounded-[2rem] border-white/5">
                    <h2 className="text-lg font-black tracking-tight mb-6">By Country</h2>
                    {loading ? (
                        <ListSkeleton />
                    ) : (
                        <div className="space-y-4">
                            {data.geo.map((g, i) => {
                                const f = flagUrl(g.code);
                                return (
                                    <div key={i} className="flex justify-between items-center text-sm">
                                        <span className="flex items-center gap-2 text-white/70 min-w-0">
                                            {f ? <Image src={f} alt={g.country} width={20} height={15} className="rounded-sm shrink-0" unoptimized /> : <span className="w-5 text-center">🏳️</span>}
                                            <span className="truncate">{g.country}</span>
                                        </span>
                                        <span className="text-white/40 font-bold text-xs shrink-0 ml-3">{g.count}</span>
                                    </div>
                                );
                            })}
                            {data.geo.length === 0 && <p className="text-white/20 text-xs uppercase tracking-widest">No geo data</p>}
                        </div>
                    )}
                </div>
            </div>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-white/20 text-[10px] uppercase tracking-widest mt-10">
                Refreshes every 12s
            </motion.p>
        </AdminLayout>
    );
};

export default AdminAnalyticsPage;
