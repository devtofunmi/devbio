import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaCode, FaRocket, FaCheckCircle } from 'react-icons/fa';

const Hero: React.FC = () => {
    const [isRevealed, setIsRevealed] = React.useState(false);

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full opacity-50" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            {/* Floating Elements - Visualizing the "Payoff" */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
                animate={{ opacity: 1, scale: 1, rotate: -15 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="hidden lg:block absolute top-[15%] left-[1%] w-50 glass-card rounded-2xl p-5 rotate-[-15deg] opacity-90 hover:opacity-100 transition-all hover:scale-110 z-20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-white/10"
            >
                <div className="flex items-center gap-4 mb-4 border-b border-white/5 pb-4">
                    <div className="w-11 h-11 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 shrink-0 shadow-[0_0_20px_rgba(34,197,94,0.15)] border border-green-500/20">
                        <FaCheckCircle size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-[12px] font-black text-white uppercase tracking-[0.2em] leading-none mb-2">New Callback</div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden relative">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "70%" }}
                                transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                                className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500 to-emerald-400"
                            />
                        </div>
                    </div>
                </div>
                <div className="space-y-2">
                    <p className="text-[11px] text-white/60 font-medium leading-tight">&quot;We saw your DevBio profile. Your &apos;SafeScore&apos; project is exactly what we need...&quot;</p>

                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
                animate={{ opacity: 1, scale: 1, rotate: 10 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="hidden lg:block absolute bottom-[20%] right-[1%] w-50 h-auto glass-card rounded-2xl p-6 rotate-[10deg] opacity-90 hover:opacity-100 transition-all hover:scale-110 z-20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-white/10"
            >
                <div className="flex items-center justify-between mb-4">
                    <FaRocket size={12} className="text-blue-400" />
                </div>
                <div className="grid grid-cols-6 gap-1.5 mb-4">
                    {Array.from({ length: 18 }).map((_, i) => (
                        <div key={i} className={`aspect-square rounded-sm ${i < 12 ? 'bg-blue-400' : 'bg-white/10'}`} />
                    ))}
                </div>
                <div className="flex flex-col gap-2">
                    <div className="h-1.5 w-full bg-white/10 rounded-full" />
                    <div className="h-1.5 w-2/3 bg-white/10 rounded-full" />
                </div>
            </motion.div>

            <div className="relative z-10 max-w-5xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* <span className="inline-flex items-center mt-16 gap-2 px-4 py-2 glass rounded-full text-xs font-black tracking-[0.2em] uppercase text-blue-400 mb-8 border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
                    <FaBriefcase size={10} className="animate-bounce" />
                    Build Your Career Leverage
                </span> */}

                    <div className="relative inline-block max-w-[100vw]">
                        <h1 className="text-6xl md:text-[5.5rem] lg:text-[6rem] font-black  mb-8 leading-[0.85] relative">
                            {/* Interactive "Proof" Group */}
                            <span
                                className="inline-block relative group align-middle"
                                onClick={() => setIsRevealed(!isRevealed)}
                            >
                                {/* Reveal Layer - Same H/W as Proof, Scrollable */}
                                <div className={`absolute inset-0 bg-[#050505] rounded-3xl mb-5 border border-white/10 overflow-hidden z-0 transition-all duration-300 flex flex-col justify-center items-center ${isRevealed ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto'}`}>
                                    <ul className="w-full p-2  font-mono text-sm md:text-lg  text-white/90  ">
                                        <li className="">
                                            <span>Build your profile</span>
                                        </li>
                                        <li className="">
                                            <span>Showcase your work</span>
                                        </li>
                                        <li className="">
                                            <span>Network with people</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Interactive "Proof" Sticker - Top Layer */}
                                <span className={`inline-block px-5 py-2 mb-5 border border-white/20 rounded-3xl bg-black/10 backdrop-blur-sm text-white cursor-pointer relative z-10 transition-all duration-500 ease-out origin-bottom-left ${isRevealed ? '-rotate-[45deg] -translate-y-2 -translate-x-2' : 'group-hover:-rotate-[45deg] group-hover:-translate-y-2 group-hover:-translate-x-2'}`}>
                                    Proof
                                </span>
                            </span>
                            <span className="text-gradient"> of Work for</span>
                            <br />
                            <span className="text-white">Modern Developers.</span>
                        </h1>
                    </div>

                    <p className="text-xl md:text-2xl text-white/50 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
                        Stop playing it safe with static resumes. Build a living professional identity that earns you <span className="text-white font-medium italic">credibility</span>, <span className="text-white font-medium italic">callbacks</span>, and the <span className="text-white font-medium italic">leverage</span> to land the roles you actually want.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link
                            href="/signup"
                            className="group relative px-10 py-5 bg-white text-black rounded-full font-black text-xl hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)] flex items-center gap-3 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-10 transition-opacity" />
                            <span>Claim Your Username</span>
                            <FaCode size={18} />
                        </Link>

                        <Link
                            href="/login"
                            className="px-8 py-5 glass hover:bg-white/5 text-white/70 hover:text-white rounded-full font-bold transition-all uppercase tracking-widest text-sm border-white/5"
                        >
                            See Verified Profiles
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;