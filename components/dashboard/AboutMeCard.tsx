import React from "react";
import { FaInfoCircle } from "react-icons/fa";
import InlineEdit from "./edit/InlineEdit";

interface AboutMeCardProps {
    aboutMe: string;
    onSave: (val: string) => void;
}

const AboutMeCard: React.FC<AboutMeCardProps> = ({ aboutMe, onSave }) => {
    return (
        <div className={`glass-card bg-[var(--theme-card-bg)] border-[var(--theme-border)] rounded-[2rem] p-10 border group bg-white/[0.01]`}>
            <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-purple-400">
                    <FaInfoCircle size={18} />
                </div>
                <h4 className={`text-xl font-black text-[var(--theme-text)] tracking-tight`}>About Me</h4>
            </div>
            <InlineEdit
                value={aboutMe}
                onSave={onSave}
                as="textarea"
                className={`text-sm text-[var(--theme-text-secondary)] leading-relaxed font-light min-h-[120px]`}
                placeholder="Tell your story..."
            />
        </div>
    );
};

export default AboutMeCard;