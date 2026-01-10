import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { HiMenu, HiX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../lib/AuthContext';

const Navbar: React.FC = () => {
    const { user } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4 ${isScrolled ? 'md:py-3' : 'md:py-6'
                    }`}
            >
                <div className={`max-w-5xl mx-auto flex justify-between items-center px-6 py-2 rounded-full border transition-all duration-500 ${isScrolled
                    ? 'bg-black/40 backdrop-blur-xl border-white/10 shadow-2xl px-8'
                    : 'bg-transparent border-transparent'
                    }`}>
                    <div className="text-xl font-black tracking-tighter text-white flex items-center gap-3 group cursor-pointer">
                        <div className="relative w-10 h-10 flex items-center justify-center">
                            <div className="absolute inset-0 bg-blue-500 rounded-xl rotate-6 group-hover:rotate-0 transition-transform duration-300 shadow-lg shadow-blue-500/20" />
                            <div className="relative w-full h-full bg-black border border-white/10 rounded-xl flex items-center justify-center font-black text-blue-500 text-xs tracking-tighter">
                                D/B
                            </div>
                        </div>
                        <Link href="/" className="group-hover:text-blue-400 transition-colors">DevBio</Link>
                    </div>

                    <nav className="hidden md:flex items-center space-x-10">
                        {['Features', 'Testimonials', 'FAQ'].map((item) => (
                            <Link
                                key={item}
                                href={`/#${item.toLowerCase()}`}
                                className="text-sm font-medium text-white/50 hover:text-white transition-colors tracking-wide"
                            >
                                {item}
                            </Link>
                        ))}
                        {user ? (
                            <Link
                                href="/dashboard"
                                className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-blue-700 transition active:scale-95 shadow-lg shadow-blue-600/20"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="text-sm font-medium text-white/50 hover:text-white transition-colors"
                                >
                                    Log In
                                </Link>
                                <Link
                                    href="/signup"
                                    className="bg-white text-black px-6 py-2 rounded-full text-sm font-bold hover:scale-105 transition active:scale-95"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </nav>

                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(true)} className="text-white focus:outline-none glass p-2 rounded-xl">
                            <HiMenu className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </motion.header>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-2xl flex flex-col p-8"
                    >
                        <div className="flex justify-between items-center mb-12">
                            <div className="flex items-center gap-3">
                                <div className="relative w-10 h-10 flex items-center justify-center">
                                    <div className="absolute inset-0 bg-blue-500 rounded-xl rotate-6 shadow-lg shadow-blue-500/20" />
                                    <div className="relative w-full h-full bg-black border border-white/10 rounded-xl flex items-center justify-center font-black text-blue-500 text-xs tracking-tighter">
                                        D/B
                                    </div>
                                </div>
                                <div className="text-xl font-black text-white">DevBio</div>
                            </div>
                            <button onClick={() => setIsMenuOpen(false)} className="text-white glass p-2 rounded-xl">
                                <HiX className="w-5 h-5" />
                            </button>
                        </div>
                        <nav className="flex flex-col space-y-8">
                            {['Features', 'Testimonials', 'FAQ'].map((item) => (
                                <Link
                                    key={item}
                                    href={`/#${item.toLowerCase()}`}
                                    className="text-4xl font-bold text-white/40 hover:text-white transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item}
                                </Link>
                            ))}
                            <div className="h-px bg-white/10 my-4" />
                            {user ? (
                                <Link href="/dashboard" className="text-2xl font-bold text-blue-400" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                            ) : (
                                <>
                                    <Link href="/login" className="text-2xl font-bold text-white/40" onClick={() => setIsMenuOpen(false)}>Log In</Link>
                                    <Link href="/signup" className="text-2xl font-bold text-white" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                                </>
                            )}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
