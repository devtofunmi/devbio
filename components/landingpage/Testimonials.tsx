import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const TESTIMONIALS = [
    {
        name: "Sarah Chen",
        handle: "@devchamp",
        avatar: "https://xsgames.co/randomusers/assets/avatars/female/2.jpg",
        quote: "DevBio revolutionized how I present my work. The automatic integration with GitHub and clean presentation of my tech stack makes my profile stand out.",
    },
    {
        name: "Marcus Rodriguez",
        handle: "@codeartist",
        avatar: "https://xsgames.co/randomusers/assets/avatars/male/3.jpg",
        quote: "As a full-stack developer, I love how DevBio showcases both my frontend and backend projects. The analytics integration is brilliant.",
    },
    {
        name: "Emma Thompson",
        handle: "@emmacodes",
        avatar: "https://xsgames.co/randomusers/assets/avatars/female/4.jpg",
        quote: "DevBio is my go-to for sharing my developer journey. The blog integration and code snippet features help me showcase my expertise effectively.",
    },
    {
        name: "Alex Rivera",
        handle: "@rust_aficionado",
        avatar: "https://xsgames.co/randomusers/assets/avatars/male/12.jpg",
        quote: "The GitHub graph integration is pixel perfect. It's the first thing recruiters mention when they see my link.",
    },
    {
        name: "Jessica Wu",
        handle: "@frontendfae",
        avatar: "https://xsgames.co/randomusers/assets/avatars/female/18.jpg",
        quote: "Finally a profile that looks as good as the code I write. The glassmorphism theme is absolutely stunning.",
    },
    {
        name: "David Smith",
        handle: "@backendbeast",
        avatar: "https://xsgames.co/randomusers/assets/avatars/male/25.jpg",
        quote: "Setting up my DevBio took less than 2 minutes and it looks better than the portfolio I spent 2 weeks building.",
    },
];

const Testimonials: React.FC = () => (
    <section id="testimonials" className="py-24 px-6 bg-black relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-20 tracking-tight">
                Trusted by the <span className="text-blue-400">Next Generation.</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {TESTIMONIALS.map((t, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-card rounded-[2.5rem] p-8 flex flex-col gap-6 hover:scale-[1.02] transition-transform duration-500"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl overflow-hidden glass border-white/10 p-0.5">
                                <Image src={t.avatar} alt={t.name} width={56} height={56} className="object-cover rounded-[calc(1rem-2px)]" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white leading-tight text-lg">{t.name}</h4>
                                <p className="text-white/40 text-sm font-medium tracking-wide">{t.handle}</p>
                            </div>
                        </div>
                        <p className="text-white/70 leading-relaxed font-light italic text-lg">
                            &ldquo;{t.quote}&rdquo;
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

export default Testimonials;