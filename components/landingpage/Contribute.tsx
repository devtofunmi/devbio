import React from 'react';
import { FaCode, FaUsers, FaGavel, FaBug, FaLightbulb } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { BackgroundBeams } from '../BackgroundBeams';

interface ContributionCardProps {
    icon: React.ElementType;
    title: string;
    description: string;
    link: string;
    linkText: string;
    delay?: number;
}

const ContributionCard: React.FC<ContributionCardProps> = ({ icon: Icon, title, description, link, linkText, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ delay }}
        className="glass-card p-10 rounded-[2.5rem] border-white/5 flex flex-col justify-between group hover:border-blue-500/30 transition-all duration-500"
    >
        <div>
            <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center text-blue-400 mb-8 border-white/10 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500">
                <Icon size={28} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
            <p className="text-white/50 font-light leading-relaxed mb-8">{description}</p>
        </div>
        <a href={link} target="_blank" rel="noopener noreferrer" className="w-full py-4 glass rounded-2xl text-center font-bold text-white hover:bg-white hover:text-black transition-all border-white/5">
            {linkText}
        </a>
    </motion.div>
);

const Contribute: React.FC = () => {
    return (
        <div className="bg-black min-h-screen relative overflow-hidden">
            <BackgroundBeams />

            <div className="max-w-7xl mx-auto px-6 py-32 relative z-10">
                <div className="text-center mb-24">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter"
                    >
                        Build the <br />
                        <span className="text-gradient">Future.</span>
                    </motion.h1>
                    <p className="text-2xl text-white/50 font-light max-w-2xl mx-auto">
                        DevBio is open-source and community-driven. Help us build the ultimate platform for the world&apos;s best engineer.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <ContributionCard
                        icon={FaBug}
                        title="Report a Bug"
                        description="Found a glitch in the matrix? Help us improve by documenting issues you encounter."
                        link="https://github.com/devtofunmi/devbio/issues/new"
                        linkText="Create Issue"
                        delay={0.1}
                    />
                    <ContributionCard
                        icon={FaLightbulb}
                        title="Suggest Features"
                        description="Have an idea for a mind-blowing feature? We'd love to hear your vision for DevBio."
                        link="https://github.com/devtofunmi/devbio/issues/new"
                        linkText="Request Feature"
                        delay={0.2}
                    />
                    <ContributionCard
                        icon={FaCode}
                        title="Write Code"
                        description="Ready to ship? Fork the repo and submit a PR. We value every single contribution."
                        link="https://github.com/devtofunmi/devbio/pulls"
                        linkText="View Pull Requests"
                        delay={0.3}
                    />

                    <ContributionCard
                        icon={FaUsers}
                        title="Community"
                        description="Connect with other elite engineers and share ideas in our discussions forum."
                        link="https://github.com/devtofunmi/devbio/discussions"
                        linkText="Join Discussions"
                        delay={0.5}
                    />
                    <ContributionCard
                        icon={FaGavel}
                        title="Our Pledge"
                        description="We are committed to a welcoming and inclusive community. Read our Code of Conduct."
                        link="https://github.com/devtofunmi/devbio/blob/main/CODE_OF_CONDUCT.md"
                        linkText="Read Code of Conduct"
                        delay={0.6}
                    />
                </div>
            </div>
        </div>
    );
};

export default Contribute;
