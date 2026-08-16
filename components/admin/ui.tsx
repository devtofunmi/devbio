import React from "react";

// Shared bits for the admin dashboard pages.

export const flagUrl = (code?: string): string | null => {
    const cc = (code || "").toLowerCase();
    return /^[a-z]{2}$/.test(cc) && cc !== "un" ? `https://flagcdn.com/24x18/${cc}.png` : null;
};

export const StatCard: React.FC<{
    icon: React.ReactNode;
    label: string;
    value: number;
    accent: string;
}> = ({ icon, label, value, accent }) => (
    <div className="glass-card p-6 rounded-3xl border-white/5">
        <div className={`w-10 h-10 glass rounded-xl flex items-center justify-center mb-4 ${accent}`}>{icon}</div>
        <p className="text-3xl font-black text-white tracking-tight">{value.toLocaleString()}</p>
        <p className="text-white/30 text-[10px] uppercase font-black tracking-widest mt-1">{label}</p>
    </div>
);

export const Skeleton: React.FC<{ className?: string }> = ({ className = "" }) => (
    <div className={`animate-pulse bg-white/5 rounded-lg ${className}`} />
);

export const StatCardSkeleton: React.FC = () => (
    <div className="glass-card p-6 rounded-3xl border-white/5">
        <Skeleton className="w-10 h-10 rounded-xl mb-4" />
        <Skeleton className="h-8 w-20 mb-2" />
        <Skeleton className="h-2 w-14" />
    </div>
);

export const ListSkeleton: React.FC<{ rows?: number }> = ({ rows = 5 }) => (
    <div className="space-y-4">
        {Array.from({ length: rows }).map((_, i) => (
            <div key={i} className="flex justify-between items-center">
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-3 w-8" />
            </div>
        ))}
    </div>
);
