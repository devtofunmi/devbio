import React from 'react';
import Link from 'next/link';
import Navbar from '../components/landingpage/Navbar';
import Footer from '../components/landingpage/Footer';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiHeart, FiArrowRight } from 'react-icons/fi';
import ReactConfetti from 'react-confetti';
import { useEffect, useState } from 'react';

const SuccessPage: React.FC = () => {
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
    const [showConfetti, setShowConfetti] = useState(true);

    useEffect(() => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        const timer = setTimeout(() => setShowConfetti(false), 9000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="bg-black flex flex-col min-h-screen selection:bg-blue-500/30">
            {showConfetti && <ReactConfetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={500} colors={['#3b82f6', '#ffffff', '#60a5fa']} />}
            <Navbar />

            <main className="flex-1 flex items-center justify-center p-6 py-32 relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-2xl w-full relative z-10 text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                        className="w-24 h-24 bg-blue-500/10 border border-blue-500/20 text-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-10"
                    >
                        <FiHeart className="w-12 h-12" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 uppercase"
                    >
                        Thank <span className="text-blue-500">You!</span>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="glass-card p-8 md:p-12 rounded-[2.5rem] border border-white/10 mb-12"
                    >
                        <p className="text-xl md:text-2xl text-white/70 font-light leading-relaxed mb-8">
                            Your support means the world to us. You&apos;re now officially a champion of the open-source developer community.
                        </p>

                        <div className="flex flex-col items-center gap-4 text-blue-400 font-bold bg-blue-500/5 py-4 rounded-2xl border border-blue-500/10">
                            <div className="flex items-center gap-2">
                                <FiCheckCircle className="w-5 h-5" />
                                <span>Donation Successful</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6"
                    >
                        <Link href="/dashboard" className="w-full sm:w-auto">
                            <button className="bg-white text-black font-extrabold px-10 py-5 rounded-2xl text-lg hover:bg-blue-50 transition-all w-full sm:w-auto flex items-center justify-center gap-2 group cursor-pointer">
                                Go to Dashboard
                                <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                        <Link href="/" className="w-full sm:w-auto">
                            <button className="glass text-white font-bold px-10 py-5 rounded-2xl text-lg border border-white/10 hover:bg-white/5 transition-all w-full sm:w-auto cursor-pointer">
                                Back to Home
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default SuccessPage;
