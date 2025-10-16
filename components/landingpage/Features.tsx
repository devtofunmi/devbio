import React from 'react';
import { FaUser, FaChartBar, FaCode, FaLink, FaBolt } from 'react-icons/fa6';

interface FeatureItemProps {
    Icon: React.ElementType;
    title: string;
    description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ Icon, title, description }) => (
    <div className="relative flex flex-col items-center pt-16 pb-8 px-6 bg-white rounded-xl border border-gray-200 transition-all duration-300 hover:border-blue-400 hover:scale-[1.02]">
        {/* Floating Icon Container */}
        <div className="absolute -top-8 text-4xl p-4 rounded-full bg-blue-600 text-white shadow-lg shadow-blue-300/50">
            <Icon size={32} />
        </div>
        
        {/* Text Content */}
        <h3 className="text-xl font-bold mb-3 text-gray-900 text-center">{title}</h3>
        <p className="text-gray-600 text-center">{description}</p>
    </div>
);

const Features: React.FC = () => (
    <section id="features" className="py-20 px-6 bg-[#f7f9fb]">
        <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-gray-900 mb-16">
                Features <span className="text-blue-600">Developers Love</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                <FeatureItem
                    Icon={FaCode} 
                    title="Project List"
                    description="Showcase your projects with titles, descriptions, and links."
                />
                <FeatureItem
                    Icon={FaChartBar} 
                    title="Built-in Analytics"
                    description="See who is viewing your profile, which projects get the most attention, and where your traffic is coming from."
                />
                <FeatureItem
                    Icon={FaBolt}
                    title="Tech Stack Visuals"
                    description="Beautifully display your languages and frameworks with customizable icons and progress bars."
                />
                <FeatureItem
                    Icon={FaUser} 
                    title="Basic Profile"
                    description="Make a professional first impression with a customizable profile, including your name, a detailed 'about' section, and a profile picture."
                />
                <FeatureItem
                    Icon={FaLink} 
                    title="Custom Domains"
                    description="Link your own domain (e.g., alex.dev) to your DevBio for a truly professional and memorable brand."
                />
                <FeatureItem
                    Icon={FaCode} 
                    title="Code Snippets"
                    description="Embed live, interactive code snippets from services like GitHub Gists or CodePen to demonstrate your skills."
                />
            </div>
        </div>
    </section>
);

export default Features;