import React from 'react';
import { FaUser, FaChartBar, FaCode, FaLink, FaBolt } from 'react-icons/fa6';

interface FeatureItemProps {
    Icon: React.ElementType;
    title: string;
    description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ Icon, title, description }) => (
    <div className="flex flex-col items-start p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-shadow hover:shadow-lg">
        <div className="text-4xl mb-4 p-3 rounded-lg bg-blue-50 text-blue-600">
            <Icon size={32} />
        </div>
        <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

const Features: React.FC = () => (
    <section id="features" className="py-20 px-6 bg-[#f7f9fb]">
        <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-gray-900 mb-16">
                Features <span className="text-blue-600">Developers Love</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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