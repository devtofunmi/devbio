import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiHeart, FiArrowRight } from 'react-icons/fi';

const DonationCTA: React.FC = () => {
    return (
        <section className="bg-black py-24 px-6 relative overflow-hidden" id="donate">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="glass-card p-12 md:p-16 rounded-[2.5rem] border border-white/10 relative overflow-hidden group"
                >
                    {/* Inner Decorative Elements */}
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                        <FiHeart className="w-32 h-32 text-blue-500 rotate-12" />
                    </div>

                    <div className="flex flex-col items-center text-center relative z-10">
                        <motion.div
                            initial={{ scale: 0, rotate: -20 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            viewport={{ once: false }}
                            transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.1 }}
                            className="w-16 h-16 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center mb-8"
                        >
                            <FiHeart className="w-8 h-8 text-blue-500" />
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight"
                        >
                            Support the <span className="text-blue-500">Open Source</span> Mission
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-lg md:text-xl text-white/50 mb-10 max-w-2xl leading-relaxed"
                        >
                            DevBio is built for the community, by the community. Your support helps us keep the servers running, maintain the codebase, and ship new features faster.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex flex-col sm:flex-row items-center gap-4"
                        >
                            <Link href="/donate" className="w-full sm:w-auto">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="bg-white cursor-pointer text-black font-extrabold px-5  md:px-10 py-5 rounded-2xl text-lg flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors w-full sm:w-auto shadow-xl shadow-white/10"
                                >
                                    Make a Donation
                                    <FiArrowRight className="w-5 h-5" />
                                </motion.button>
                            </Link>

                            <a
                                href="https://github.com/devtofunmi/devbio"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto"
                            >
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="glass cursor-pointer text-white font-bold px-10 py-5 rounded-2xl text-lg border border-white/10 hover:bg-white/5 transition-colors w-full sm:w-auto"
                                >
                                    Star on GitHub
                                </motion.button>
                            </a>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: false }}
                            transition={{ duration: 1, delay: 0.6 }}
                            className="mt-12 flex flex-wrap justify-center gap-8 opacity-40"
                        >
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                                <span className="text-xs font-bold uppercase tracking-widest text-white">100% Free Forever</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                                <span className="text-xs font-bold uppercase tracking-widest text-white">Community Driven</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                                <span className="text-xs font-bold uppercase tracking-widest text-white">Open Source</span>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default DonationCTA;
