import React from "react";
import { FaGithub, FaCog } from "react-icons/fa";
import InlineEdit from "./edit/InlineEdit";
import GithubCard from "../GitHubCard";

interface GitHubDNACardProps {
    githubUsername: string;
    githubGraphTitle: string;
    onTitleSave: (val: string) => void;
    onSettingsClick: () => void;
}

const GitHubDNACard: React.FC<GitHubDNACardProps> = ({
    githubUsername,
    githubGraphTitle,
    onTitleSave,
    onSettingsClick
}) => {
    return (
        <div className={`glass-card bg-[var(--theme-card-bg)] border-[var(--theme-border)] rounded-[2rem] p-6 md:p-8 border group relative min-h-[200px]`}>
            {githubUsername && (
                <button
                    onClick={onSettingsClick}
                    className="absolute top-4 right-4 z-30 w-8 h-8 glass rounded-full flex items-center justify-center text-[var(--theme-text-secondary)] hover:text-[var(--theme-text)] transition-all opacity-0 group-hover:opacity-100"
                >
                    <FaCog size={14} />
                </button>
            )}

            <div className="flex justify-between items-start mb-2 z-20 relative">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-[var(--theme-text)]">
                        <FaGithub size={20} />
                    </div>
                    <InlineEdit
                        value={githubGraphTitle}
                        onSave={onTitleSave}
                        className={`text-xl md:text-2xl font-black text-[var(--theme-text)] tracking-tight cursor-text hover:text-[var(--theme-accent)] transition-colors`}
                        placeholder="GitHub DNA"
                    />
                </div>
            </div>

            {!githubUsername && (
                <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center backdrop-blur-[2px] rounded-[2rem]">
                    <button
                        onClick={onSettingsClick}
                        className="bg-white text-black px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:scale-110 transition-all shadow-xl"
                    >
                        Sync GitHub DNA
                    </button>
                </div>
            )}

            <div className="w-full flex items-center justify-center relative z-0 mt-2">
                <GithubCard githubUsername={githubUsername} size={48} />
            </div>
        </div>
    );
};

export default GitHubDNACard;
