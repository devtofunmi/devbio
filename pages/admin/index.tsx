import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { GetServerSideProps } from "next";
import { motion } from "framer-motion";
import { FiUsers, FiEye, FiMousePointer, FiFolder } from "react-icons/fi";
import AdminLayout from "../../components/admin/AdminLayout";
import { StatCard, StatCardSkeleton, ListSkeleton, flagUrl } from "../../components/admin/ui";
import { getAdminUser } from "../../lib/adminAuth";
import type { AdminAnalytics } from "../api/admin/analytics";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const admin = await getAdminUser(ctx);
    if (!admin) return { redirect: { destination: "/dashboard", permanent: false } };
    return { props: {} };
};

const AdminOverview: React.FC = () => {
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
        <AdminLayout title="Overview">
            <div className="mb-10">
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter">Overview</h1>
                <p className="text-white/30 text-sm font-medium mt-2">Platform at a glance</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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

export default AdminOverview;
