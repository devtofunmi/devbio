import React, { useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaTwitter } from 'react-icons/fa';

const animation = { duration: 30000, easing: (t: number) => t }

const CRACKED_DEVS = [
    {
        name: "Jay",
        handle: "codebreak_er",
        avatar: "/1.jpeg",
        tags: ["Web Developer"]
    },
    {
        name: "Titanium",
        handle: "xt42io",
        avatar: "/2.jpeg",
        tags: ["Cracked Dev"]
    },
    {
        name: "Hicode",
        handle: "_hicode",
        avatar: "/3.jpeg",
        tags: ["Elite Dev"]
    },
    {
        name: "Emmanuel",
        handle: "obiabo_immanuel",
        avatar: "/4.jpeg",
        tags: ["Cracked Dev"]
    },
    {
        name: "Emmanuel",
        handle: " Emmysoft_Tm",
        avatar: "/5.jpeg",
        tags: ["Cracked Dev"]
    },
    {
        name: "Phantom",
        handle: "phantom",
        avatar: "/6.jpeg",
        tags: ["Web Developer"]
    },
    {
        name: "Vicky Jay",
        handle: "heyVickyJay",
        avatar: "/7.jpeg",
        tags: ["Software Engr"]
    },
    {
        name: "Stella",
        handle: "devstella",
        avatar: "/8.jpeg",
        tags: ["Software Engr"]
    },
    {
        name: "JayPro",
        handle: "JayPro_01",
        avatar: "/9.jpeg",
        tags: ["Web Developer"]
    },
    {
        name: "Eric",
        handle: "@enri-code",
        avatar: "/10.jpeg",
        tags: ["Web Developer"]
    },
    {
        name: "Abiola",
        handle: "darnyy_abiola",
        avatar: "/11.jpeg",
        tags: ["Electrical Engr"]
    },
    {
        name: "Ben",
        handle: "benlad_1",
        avatar: "/12.jpeg",
        tags: ["Software Developer"]
    }
]

interface CrackedDevCardProps {
    name: string;
    handle: string;
    avatar: string;
    tags: string[];
    onHoverChange: (isHovered: boolean) => void;
}

const CrackedDevCard: React.FC<CrackedDevCardProps> = ({ name, handle, avatar, tags, onHoverChange }) => (
    <motion.div
        whileHover={{ y: -5 }}
        onMouseEnter={() => onHoverChange(true)}
        onMouseLeave={() => onHoverChange(false)}
        onClick={() => onHoverChange(true)}
        className="relative w-[300px] h-[400px] glass-card rounded-[2.5rem] overflow-hidden border-white/5 group transition-all duration-500 cursor-pointer"
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
                onClick={(e) => e.stopPropagation()}
            >
                <FaTwitter size={12} className="group-hover/link:animate-pulse" />
                @{handle}
            </a>
        </div>
    </motion.div>
);

const CrackedDevs: React.FC = () => {
    const [isPaused, setIsPaused] = useState(false);
    
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        loop: true,
        renderMode: "performance",
        drag: true,
        created(s) {
            s.moveToIdx(5, true, animation)
        },
        updated(s) {
            if (!isPaused) {
                s.moveToIdx(s.track.details.abs + 5, true, animation)
            }
        },
        animationEnded(s) {
            if (!isPaused) {
                s.moveToIdx(s.track.details.abs + 5, true, animation)
            }
        },
        slides: {
            perView: "auto",
            spacing: 24,
        },
    })

    const handleHoverChange = (isHovered: boolean) => {
        setIsPaused(isHovered);
        if (instanceRef.current) {
            if (isHovered) {
                instanceRef.current.animator.stop();
            } else {
                instanceRef.current.moveToIdx(instanceRef.current.track.details.abs + 5, true, animation);
            }
        }
    }

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
                            <CrackedDevCard {...dev} onHoverChange={handleHoverChange} />
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