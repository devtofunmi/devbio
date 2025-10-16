import React from 'react';
import { FaGithub, FaCode, FaRegNewspaper, FaStar, FaTwitter, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa6";
import { IoLayersSharp } from "react-icons/io5";

const MOCK_IMAGES = {
    avatar1: "https://xsgames.co/randomusers/assets/avatars/male/1.jpg", // Using GitHub's default avatar as a more reliable source
};

interface ContentCardProps {
    title: string;
    content: string;
    icon: React.ReactElement;
    className?: string;
}

const ContentCard: React.FC<ContentCardProps> = ({ title, content, icon, className = "" }) => (
    <div className={`bg-white rounded-xl shadow-md p-4 flex flex-col items-start space-y-2 border border-gray-200 ${className}`}>
        <div className="flex items-center space-x-2">
            <span className="w-5 h-5 text-blue-600">
                {icon}
            </span>
            <span className="text-sm font-medium text-gray-700">{title}</span>
        </div>
        <p className="text-xs text-gray-500 line-clamp-2">{content}</p>
        
        {title === "GitHub Repo" && (
            <div className="mt-2 w-full h-16 bg-gray-100 rounded-lg flex flex-wrap gap-0.5 p-1 border border-gray-200">
                {Array(20).fill(0).map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-sm ${i % 5 === 0 ? 'bg-green-600' : i % 3 === 0 ? 'bg-green-400' : 'bg-green-200'}`}></div>
                ))}
            </div>
        )}
        {title === "Code Snippet" && (
            <div className="mt-2 w-full h-24 bg-gray-800 rounded-lg p-3 text-xs text-green-400 font-mono overflow-hidden">
                <pre>
                    {`function DevBio() {
  return (
    <ProfileCard />
  )
}`}
                </pre>
            </div>
        )}
        {title === "Tech Stacks" && (
            <div className="flex flex-wrap gap-2 mt-2">
                {['React', 'TypeScript', 'Tailwind', 'Node.js', 'PostgreSQL'].map((tag, index) => (
                    <span key={index} className={`px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full`}>
                        {tag}
                    </span>
                ))}
            </div>
        )}
        {title === "Social Links" && (
            <div className="flex gap-4 mt-2 text-2xl">
                <FaTwitter className="text-blue-500 hover:text-blue-600 transition duration-150" />
                <FaInstagram className="text-pink-500 hover:text-pink-600 transition duration-150" />
                <FaYoutube className="text-red-500 hover:text-red-600 transition duration-150" />
                <FaLinkedin className="text-gray-800 hover:text-gray-900 transition duration-150" />
            </div>
        )}
    </div>
);

const SimulatedProfile: React.FC = () => (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-2xl border border-gray-200 mt-12 mb-24">
        <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-gray-200 mb-3 overflow-hidden">
                <img 
                    src={MOCK_IMAGES.avatar1} 
                    alt="Dev Avatar" 
                    width={80} 
                    height={80} 
                    className="object-cover w-full h-full" 
                />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Alex Johnson</h2>
            <p className="text-sm text-gray-500 text-center mb-6 max-w-xs">Senior Frontend Engineer building open-source tools and sharing my journey.</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <ContentCard 
                title="Dev Blog" 
                content="Latest post: Deep dive into React Server Components performance." 
                icon={<FaRegNewspaper />}
            />
            <ContentCard 
                title="Code Snippet" 
                content="A reusable utility hook for local storage management." 
                icon={<FaCode />}
            />
            <ContentCard 
                title="GitHub Repo" 
                content="My weekly commit streak and recent contributions to `oss-kit`." 
                icon={<FaGithub />}
                className="col-span-2 md:col-span-1"
            />
            <ContentCard 
                title="Tech Stacks" 
                content="Current focus: Next.js, Serverless, and PostgreSQL." 
                icon={<IoLayersSharp />}
                className="col-span-2 md:col-span-2"
            />
            <ContentCard 
                title="Social Links" 
                content="Follow my daily thread on Twitter and development streams." 
                icon={<FaStar />}
                className="col-span-2"
            />
        </div>
    </div>
);

export default SimulatedProfile;