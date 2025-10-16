import React from 'react';

const TESTIMONIALS = [
    {
        name: "Sarah Chen",
        handle: "@devchamp",
        avatar: "https://xsgames.co/randomusers/assets/avatars/female/2.jpg",
        quote: "DevBio revolutionized how I present my work. The automatic integration with GitHub and clean presentation of my tech stack makes my profile stand out. It's exactly what developers need.",
    },
    {
        name: "Marcus Rodriguez",
        handle: "@codeartist",
        avatar: "https://xsgames.co/randomusers/assets/avatars/male/3.jpg",
        quote: "As a full-stack developer, I love how DevBio showcases both my frontend and backend projects. The analytics integration is brilliant, and the custom domain feature is the cherry on top.",
    },
    {
        name: "Emma Thompson",
        handle: "@emmacodes",
        avatar: "https://xsgames.co/randomusers/assets/avatars/female/4.jpg",
        quote: "DevBio is my go-to for sharing my developer journey. The blog integration and code snippet features help me showcase my expertise effectively. Plus, the UI is absolutely gorgeous!",
    },
    {
        name: "Raj Patel",
        handle: "@opensourcehero",
        avatar: "https://xsgames.co/randomusers/assets/avatars/male/5.jpg",
        quote: "Finally, a platform that understands developers! The GitHub stats integration and tech stack visualization are fantastic. DevBio has become an essential part of my professional identity.",
    },
    {
        name: "Lisa Wang",
        handle: "@webwizard",
        avatar: "https://xsgames.co/randomusers/assets/avatars/female/6.jpg",
        quote: "The way DevBio presents my projects and contributions is incredible. It's like having a living, breathing portfolio that updates itself. Absolutely love it!",
    },
    {
        name: "James Mitchell",
        handle: "@techlead",
        avatar: "https://xsgames.co/randomusers/assets/avatars/male/7.jpg",
        quote: "DevBio brings together everything I need in a dev profile. From GitHub stats to blog posts, it's all beautifully integrated. This is what a modern developer portfolio should be.",
    },
];

interface TestimonialCardProps {
    name: string;
    handle: string;
    quote: string;
    avatar: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, handle, quote, avatar }) => (
    <div 
        className="relative group transition-transform duration-300 ease-in-out  hover:-rotate-2 focus:-rotate-2 rounded-2xl overflow-hidden" 
        tabIndex={0}
    >
        <div className="relative bg-[#1c1c1c] rounded-2xl p-6 shadow-xl group-hover:shadow-none transition-shadow border border-[#2a2a2a] flex flex-col space-y-4 h-full">
            <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img
                        src={avatar}
                        alt={`${name}'s avatar`}
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                    />
                </div>
                <div>
                    <p className="text-white font-semibold text-base">{name}</p>
                    <p className="text-gray-400 text-sm">{handle}</p>
                </div>
            </div>
            <p className="text-gray-300 text-base leading-relaxed">
                {quote}
            </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300"></div>
    </div>
);

const Testimonials: React.FC = () => (
    <section id="testimonials" className="py-20 px-6 bg-[#0a0a0a] border-y border-[#2a2a2a]">
        <h2 className="text-2xl font-extrabold text-center text-white mb-16">
            What Devs Are <span className="text-blue-400">Saying</span>
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, index) => (
                <TestimonialCard key={index} {...t} />
            ))}
        </div>
    </section>
);

export default Testimonials;