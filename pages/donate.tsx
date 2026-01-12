import React from 'react';
import Navbar from '../components/landingpage/Navbar';
import Footer from '../components/landingpage/Footer';
import { motion } from 'framer-motion';
import { FaHeart, FaGithub, FaCoffee, FaRocket } from 'react-icons/fa';

const DonatePage: React.FC = () => {
    return (
        <div className="bg-black flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-1 flex items-center justify-center p-6 py-32">
                <div className="max-w-4xl w-full">
                    <div className="text-center mb-16">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-20 h-20 bg-red-500/10 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-8"
                        >
                            <FaHeart size={32} />
                        </motion.div>
                        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 uppercase">
                            Keep us <span className="text-gradient">Going</span>
                        </h1>
                        <p className="text-xl text-white/40 font-light max-w-2xl mx-auto">
                            DevBio is built by developers, for developers. Your support helps us maintain the infrastructure and build new features.
                        </p>
                    </div>

                    <div className="max-w-xl mx-auto">
                        {/* GitHub Sponsors */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="glass-card p-12 rounded-[3rem] border-white/5 flex flex-col items-center text-center group hover:border-blue-500/30 transition-all duration-500"
                        >
                            <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center text-white mb-8 group-hover:bg-white group-hover:text-black transition-all duration-500">
                                <FaGithub size={28} />
                            </div>
                            <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">GitHub Sponsors</h3>
                            <p className="text-white/40 font-medium text-sm mb-8">
                                Become a official backer of DevBio and get a badge on your profile.
                            </p>
                            <a
                                href="https://github.com/sponsors/devtofunmi"
                                target="_blank"
                                rel="noreferrer"
                                className="w-full py-5 bg-white text-black font-black rounded-2xl hover:scale-[1.02] transition-all uppercase tracking-widest text-xs shadow-2xl"
                            >
                                Sponsor on GitHub
                            </a>
                        </motion.div>
                    </div>

                    <div className="mt-16 text-center">
                        <div className="inline-flex items-center gap-2 px-6 py-3 glass rounded-full border-white/5 text-[10px] font-black uppercase tracking-widest text-white/20">
                            <FaRocket className="text-blue-500" />
                            Next Goal: Custom Domains for All
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default DonatePage;
