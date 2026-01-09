import React from 'react';
import { FaGithub, FaTwitter, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <section id="about" className="relative py-24 overflow-hidden bg-black">
            <div className="max-w-7xl mx-auto px-6 py-32 relative z-10">
                {/* Hero Section */}
                <div className="flex flex-col lg:flex-row gap-16 items-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:w-7/12"
                    >
                        <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-tight">
                            The Developer <br />
                            <span className="text-gradient">Standard.</span>
                        </h1>
                        <p className="text-2xl text-white/50 font-light leading-relaxed max-w-2xl">
                            DevBio is the all-in-one link for developers to showcase their work, stack, and identity. Built by engineers, for engineers who care about aesthetics.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="lg:w-5/12 w-full"
                    >
                        <div className="glass-card p-10 rounded-[3rem] border-white/10 relative group">
                            <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full scale-75 group-hover:scale-100 transition-transform duration-700" />
                            <h3 className="text-2xl font-bold text-white mb-8 relative z-10">Join the movement</h3>
                            <div className="space-y-4 relative z-10">
                                <a href="https://github.com/devtofunmi/devbio" className="flex items-center justify-between p-5 glass rounded-2xl border-white/5 hover:border-blue-500/50 transition-all group/item">
                                    <div className="flex items-center gap-4">
                                        <FaGithub size={24} className="text-white" />
                                        <div>
                                            <p className="font-bold text-white text-lg">GitHub</p>
                                            <p className="text-white/40 text-sm">Star the foundation</p>
                                        </div>
                                    </div>
                                    <FaArrowRight size={14} className="text-white/20 group-hover/item:text-blue-400 group-hover/item:translate-x-1 transition-all" />
                                </a>
                                <a href="https://twitter.com/devbio" className="flex items-center justify-between p-5 glass rounded-2xl border-white/5 hover:border-blue-400/50 transition-all group/item">
                                    <div className="flex items-center gap-4">
                                        <FaTwitter size={24} className="text-blue-400" />
                                        <div>
                                            <p className="font-bold text-white text-lg">Twitter</p>
                                            <p className="text-white/40 text-sm">@devbio</p>
                                        </div>
                                    </div>
                                    <FaArrowRight size={14} className="text-white/20 group-hover/item:text-blue-400 group-hover/item:translate-x-1 transition-all" />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Content Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        className="glass-card p-12 rounded-[3.5rem] border-white/5"
                    >
                        <span className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-4 block">Our DNA</span>
                        <h3 className="text-3xl font-bold text-white mb-6">Why DevBio?</h3>
                        <div className="space-y-6 text-xl text-white/50 font-light leading-relaxed">
                            <p>
                                In a crowded digital world, developers struggle to stand out. Your GitHub profile shows your code, but what about the developer behind it?
                            </p>
                            <p>
                                DevBio solves this by providing a single, beautiful page to showcase your projects, your skills, and your story. It&apos;s more than just a tool—it&apos;s your professional identity.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ delay: 0.1 }}
                        className="glass-card p-12 rounded-[3.5rem] border-white/5"
                    >
                        <span className="text-purple-400 font-bold uppercase tracking-widest text-xs mb-4 block">Our Pulse</span>
                        <h3 className="text-3xl font-bold text-white mb-6">The Mission</h3>
                        <div className="space-y-6 text-xl text-white/50 font-light leading-relaxed">
                            <p>
                                We empower developers to take control of their online presence. We believe a great presentation can transform a career.
                            </p>
                            <p>
                                Our theme is designed to be clean, professional, and uncompromisingly high-end. Built for those who understand that details aren&apos;t just details—they are the product.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default About;
