import React from 'react';
import { useKeenSlider } from 'keen-slider/react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaTwitter } from 'react-icons/fa';

const animation = { duration: 30000, easing: (t: number) => t }

const CRACKED_DEVS = [
    {
        name: "Marc Lou",
        handle: "marclou",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
        tags: ["Indie Hacker"]
    },
    {
        name: "Pieter Levels",
        handle: "levelsio",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop",
        tags: ["Digital Nomad"]
    },
    {
        name: "Tofunmi",
        handle: "devtofunmi",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop",
        tags: ["Elite Dev"]
    },
    {
        name: "Sarah Edo",
        handle: "sdras",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop",
        tags: ["CSS Queen"]
    },
    {
        name: "Lee Robinson",
        handle: "leerob",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop",
        tags: ["Next.js"]
    },
    {
        name: "Patricia",
        handle: "patricia",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop",
        tags: ["DX Engineer"]
    },
    {
        name: "Dan Abramov",
        handle: "gaearon",
        avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=600&fit=crop",
        tags: ["React Core"]
    }
]

interface CrackedDevCardProps {
    name: string;
    handle: string;
    avatar: string;
    tags: string[];
}

const CrackedDevCard: React.FC<CrackedDevCardProps> = ({ name, handle, avatar, tags }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="relative w-[300px] h-[400px] glass-card rounded-[2.5rem] overflow-hidden border-white/5 group transition-all duration-500"
    >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
            <Image
                src={avatar}
                alt={`${name}'s avatar`}
                fill
                unoptimized
                className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 group-active:grayscale-0 opacity-50 group-hover:opacity-100 group-active:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>

        {/* Top Badges */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
            <div className="flex gap-2">
                {tags.map(tag => (
                    <span key={tag} className="px-3 py-1 glass rounded-full text-[10px] font-black uppercase tracking-widest text-blue-400 border-blue-500/20">
                        {tag}
                    </span>
                ))}
            </div>
        </div>

        {/* Content */}
        <div className="absolute bottom-8 left-8 right-8 z-10">
            <div className="flex items-center gap-2 mb-2">
                <h4 className="text-2xl font-black text-white tracking-tight">{name}</h4>
                <FaCheckCircle className="text-blue-500" size={16} />
            </div>
            <a
                href={`https://twitter.com/${handle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/40 hover:text-blue-400 font-mono text-sm transition-colors group/link"
            >
                <FaTwitter size={12} className="group-hover/link:animate-pulse" />
                @{handle}
            </a>
        </div>
    </motion.div>
);

const CrackedDevs: React.FC = () => {
    const [sliderRef] = useKeenSlider<HTMLDivElement>({
        loop: true,
        renderMode: "performance",
        drag: true,
        created(s) {
            s.moveToIdx(5, true, animation)
        },
        updated(s) {
            s.moveToIdx(s.track.details.abs + 5, true, animation)
        },
        animationEnded(s) {
            s.moveToIdx(s.track.details.abs + 5, true, animation)
        },
        slides: {
            perView: "auto",
            spacing: 24,
        },
    })

    return (
        <section className="py-32 bg-black relative overflow-hidden">
            {/* Subtle Gradient Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    className="text-2xl font-black uppercase tracking-[0.4em] text-white/20 mb-4"
                >
                    Elite Community
                </motion.h2>
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-8xl font-black text-white tracking-tighter"
                >
                    Loved by <br />
                    <span className="text-gradient">Cracked Engineers.</span>
                </motion.h3 >
            </div>

            <div className="relative">
                {/* Edge Fades */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

                <div ref={sliderRef} className="keen-slider !overflow-visible">
                    {CRACKED_DEVS.map((dev, index) => (
                        <div className="keen-slider__slide" key={index} style={{ minWidth: "300px", maxWidth: "300px" }}>
                            <CrackedDevCard {...dev} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-20 text-center">
                <p className="text-white/20 leading-[1.1] font-black uppercase tracking-[0.3em] text-xs">
                    Join 10,000+ engineers<br /> building their legacy
                </p>
            </div>
        </section>
    );
}

export default CrackedDevs;