import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Navbar from '../components/landingpage/Navbar';
import Footer from '../components/landingpage/Footer';
import { motion } from 'framer-motion';
import { FaHeart, FaGithub, FaRocket, FaBolt, FaUser } from 'react-icons/fa';
import { useUser } from '@supabase/auth-helpers-react';
import { supabase } from '../lib/supabaseClient';

const DonatePage: React.FC = () => {
    const user = useUser();
    const [checkoutUrl, setCheckoutUrl] = useState('https://buy.polar.sh/polar_cl_OrWX2PpfSMuM3kcz9485cUFN9toa9FTzL19Zl4ZFpQv');
    const [userAvatar, setUserAvatar] = useState<string | null>(null);

    useEffect(() => {
        // If user is logged in, append their user_id to the checkout link metadata
        if (user?.id) {
            const baseUrl = 'https://buy.polar.sh/polar_cl_OrWX2PpfSMuM3kcz9485cUFN9toa9FTzL19Zl4ZFpQv';
            const urlWithMetadata = `${baseUrl}?metadata[user_id]=${user.id}`;
            setCheckoutUrl(urlWithMetadata);

            // Fetch user's avatar from profiles
            supabase
                .from('profiles')
                .select('avatar_url')
                .eq('id', user.id)
                .single()
                .then(({ data }) => {
                    if (data?.avatar_url) {
                        setUserAvatar(data.avatar_url);
                    }
                });
        }
    }, [user]);

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
                        {/* Polar Support */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="glass-card p-12 rounded-[3rem] border-white/5 flex flex-col items-center text-center group hover:border-blue-500/30 transition-all duration-500"
                        >
                            <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center text-white mb-8 group-hover:bg-white group-hover:text-black transition-all duration-500">
                                <FaBolt size={28} />
                            </div>
                            <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">Support the Mission</h3>
                            <p className="text-white/40 font-medium text-sm mb-8">
                                DevBio is free and open-source. Your donations help us cover server costs and maintenance.
                                {user && <span className="block mt-2 text-blue-400 text-xs">✨ Donors get a gold border on their profile!</span>}
                            </p>
                            <a
                                href={checkoutUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-5 bg-white text-black font-black rounded-2xl hover:scale-[1.02] transition-all uppercase tracking-widest text-xs shadow-2xl flex items-center justify-center cursor-pointer"
                            >
                                Make a Donation
                            </a>
                        </motion.div>
                    </div>

                    {/* Gold Border Preview */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-20"
                    >
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-3">
                                Unlock the <span className="text-yellow-500">Gold Badge</span>
                            </h2>
                            <p className="text-white/40 text-sm">See the difference donors make on their profile</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                            {/* Before - Regular Profile */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                className="glass-card p-8 rounded-[2rem] border-white/10 text-center"
                            >
                                <p className="text-xs font-black uppercase tracking-widest text-white/30 mb-6">Regular Profile</p>
                                <div className="flex justify-center mb-4">
                                    <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden relative bg-white/5 flex items-center justify-center border-4 border-white/10">
                                        <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                                            <span className="text-5xl">👤</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-white/40 text-xs">Standard avatar border</p>
                            </motion.div>

                            {/* After - Donor Profile */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                                className="glass-card p-8 rounded-[2rem] border-yellow-500/20 text-center relative overflow-hidden group"
                            >
                                {/* Glow effect */}
                                <div className="absolute inset-0 bg-yellow-500/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="relative z-10">
                                    <div className="flex items-center justify-center gap-2 mb-6">
                                        <p className="text-xs font-black uppercase tracking-widest text-yellow-500">Donor Profile</p>
                                        <span className="text-yellow-500">✨</span>
                                    </div>
                                    <div className="flex justify-center mb-4">
                                        <motion.div
                                            animate={{
                                                boxShadow: [
                                                    '0 0 30px rgba(234,179,8,0.3)',
                                                    '0 0 40px rgba(234,179,8,0.5)',
                                                    '0 0 30px rgba(234,179,8,0.3)',
                                                ],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                            className="w-32 h-32 rounded-[2.5rem] overflow-hidden relative bg-white/5 flex items-center justify-center border-4 border-yellow-500/50 ring-4 ring-yellow-500/10"
                                        >
                                            <div className="absolute inset-0 border-[4px] border-yellow-400/20 rounded-[2.5rem] pointer-events-none" />
                                            {userAvatar ? (
                                                <Image
                                                    src={userAvatar}
                                                    alt="Your avatar"
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center">
                                                    <span className="text-5xl">👑</span>
                                                </div>
                                            )}
                                        </motion.div>
                                    </div>
                                    <p className="text-yellow-500/80 text-xs font-bold">
                                        {user ? 'Your profile with gold border!' : 'Premium gold border + glow'}
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

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
