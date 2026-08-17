import React from "react";
import { FaPlus } from "react-icons/fa";

interface StatusCardProps {
    isAvailable: boolean;
    statusText: string;
    onClick: () => void;
}

const StatusCard: React.FC<StatusCardProps> = ({ isAvailable, statusText, onClick }) => {
    return (
        <div
            onClick={onClick}
            className={`glass-card bg-[var(--theme-card-bg)] border-[var(--theme-border)] rounded-[1.5rem] p-6 md:p-8 border flex items-center justify-between gap-4 group cursor-pointer hover:border-[var(--theme-accent)] transition-all`}
        >
            <div className="flex flex-col min-w-0">
                <span className="text-[10px] uppercase tracking-widest text-[var(--theme-text-secondary)] mb-2">Current Status</span>
                <div className="flex flex-col gap-1 min-w-0">
                    <span className={`text-sm font-black flex items-center gap-3 text-[var(--theme-text)]`}>
                        <span className={`w-2.5 h-2.5 shrink-0 rounded-full ${isAvailable ? 'bg-green-500' : 'bg-red-500'} ${isAvailable ? 'animate-pulse' : ''}`} />
                        {isAvailable ? 'Available' : 'Focused'}
                    </span>
                    <span className="text-xs text-[var(--theme-text-secondary)] font-medium truncate">
                        {statusText || (isAvailable ? "Set availability text..." : "Set focus text...")}
                    </span>
                </div>
            </div>
            <div className="w-10 h-10 shrink-0 glass rounded-xl flex items-center justify-center text-[var(--theme-text-secondary)] group-hover:text-[var(--theme-accent)] group-hover:bg-blue-500/10 transition-all">
                <FaPlus size={14} />
            </div>
        </div>
    );
};

export default StatusCard;