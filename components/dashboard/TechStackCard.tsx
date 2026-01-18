import React from "react";
import { FaCode, FaPlus } from "react-icons/fa";

interface TechItem {
  name: string;
  icon: React.ReactNode;
}

interface TechStackCardProps {
  techStack: TechItem[];
  onAddClick: () => void;
}

const TechStackCard: React.FC<TechStackCardProps> = ({ techStack, onAddClick }) => {
  return (
    <div className={`glass-card bg-[var(--theme-card-bg)] border-[var(--theme-border)] rounded-[2rem] p-6 md:p-10 border group`}>
      <div className="flex justify-between items-center mb-6 md:mb-8">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-[var(--theme-accent)]">
            <FaCode size={18} />
          </div>
          <h4 className={`text-xl md:text-2xl font-black text-[var(--theme-text)] tracking-tight leading-none`}>Tech Stack</h4>
        </div>
        <button
          onClick={onAddClick}
          className="w-10 h-10 rounded-xl glass flex items-center justify-center text-[var(--theme-text-secondary)] hover:text-[var(--theme-text)] transition-all"
        >
          <FaPlus size={14} />
        </button>
      </div>
      <div className="flex flex-wrap gap-2 md:gap-3">
        {techStack.map(tech => (
          <span
            key={tech.name}
            className={`px-4 py-2 md:px-6 md:py-3 glass rounded-xl md:rounded-2xl text-[10px] md:text-sm font-bold text-[var(--theme-text-secondary)] hover:text-[var(--theme-accent)] border-[var(--theme-border)] cursor-pointer transition-all hover:scale-110 active:scale-95 whitespace-nowrap flex items-center gap-2`}
          >
            <span className="text-lg opacity-80">{tech.icon}</span>
            <span>{tech.name}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TechStackCard;