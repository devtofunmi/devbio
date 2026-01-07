import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaGithub, FaCode, FaRocket } from 'react-icons/fa';

const Hero: React.FC = () => (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full opacity-50" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* Floating Elements */}
        <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
            animate={{ opacity: 1, scale: 1, rotate: -15 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden lg:block absolute top-[20%] left-[10%] w-48 h-32 glass-card rounded-2xl p-4 rotate-[-15deg] opacity-40 hover:opacity-100 transition-opacity"
        >
            <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-full bg-blue-500" />
                <div className="h-2 w-16 bg-white/20 rounded-full" />
            </div>
            <div className="space-y-2">
                <div className="h-2 w-full bg-white/10 rounded-full" />
                <div className="h-2 w-2/3 bg-white/10 rounded-full" />
            </div>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
            animate={{ opacity: 1, scale: 1, rotate: 10 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="hidden lg:block absolute bottom-[25%] right-[10%] w-56 h-40 glass-card rounded-2xl p-6 rotate-[10deg] opacity-40 hover:opacity-100 transition-opacity"
        >
            <div className="grid grid-cols-6 gap-1.5 grayscale opacity-50">
                {Array.from({ length: 24 }).map((_, i) => (
                    <div key={i} className={`aspect-square rounded-sm ${i % 3 === 0 ? 'bg-blue-400' : 'bg-white/10'}`} />
                ))}
            </div>
            <div className="mt-4 flex items-center justify-between">
                <div className="h-2 w-12 bg-white/20 rounded-full" />
                <FaGithub size={12} className="text-white/20" />
            </div>
        </motion.div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <span className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-xs font-semibold tracking-widest uppercase text-blue-400 mb-8 border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
                    <FaRocket size={10} className="animate-pulse" />
                    devbio.co
                </span>

                <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8">
                    <span className="text-gradient">Showcase Your</span>
                    <br />
                    <span className="text-white">Code, Stats, and Stack.</span>
                </h1>

                <p className="text-xl md:text-2xl text-white/50 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
                    Your professional developer profile, all in one link. Connect, share, and grow your presence with a beautiful, customizable page.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Link
                        href="/signup"
                        className="group relative px-10 py-5 bg-white text-black rounded-full font-bold text-xl hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)] flex items-center gap-3 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-10 transition-opacity" />
                        <span>Claim Your Username</span>
                        <FaCode size={18} />
                    </Link>

                    <Link
                        href="/login"
                        className="px-8 py-5 glass hover:bg-white/5 text-white/70 hover:text-white rounded-full font-medium transition-all"
                    >
                        Explore Public Profiles
                    </Link>
                </div>
            </motion.div>
        </div>
    </section>
);

export default Hero;
