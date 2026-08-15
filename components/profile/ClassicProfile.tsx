import React from "react";
import { motion } from "framer-motion";
import ShareButton from "./ShareButton";
import ProfileHero from "./ProfileHero";
import ProfileSkills from "./ProfileSkills";
import ProjectsShowcase from "./ProjectsShowcase";
import type { UserProfile, ProjectRecord } from "../../lib/types";

type Props = {
    user: UserProfile;
    projects: ProjectRecord[];
    recordClick: (type: string, url: string) => void;
    onShare: () => void;
};

const ClassicProfile: React.FC<Props> = ({ user, projects, recordClick, onShare }) => (
    <>
        <ShareButton onShare={onShare} />

        <main className="max-w-7xl mx-auto px-6 py-12 md:py-16 relative z-10">
            <ProfileHero user={user} recordClick={recordClick} />

            {/* Main Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20">
                <ProfileSkills user={user} />
                <ProjectsShowcase user={user} projects={projects} recordClick={recordClick} />
            </div>

            <motion.footer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-16 text-center text-[var(--theme-text-secondary)] text-sm font-medium tracking-widest uppercase"
            >
                Built with{" "}
                <a
                    href="https://devbio.co"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--theme-text)] hover:text-[var(--theme-accent)] transition-colors"
                >
                    DevBio.co
                </a>
            </motion.footer>
        </main>
    </>
);

export default ClassicProfile;
