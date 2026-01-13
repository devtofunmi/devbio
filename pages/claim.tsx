import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useAuth } from '../lib/AuthContext';
import { toast } from 'react-toastify';
import LoadingSpinner from '../components/LoadingSpinner';
import Link from 'next/link';

const ClaimPage: React.FC = () => {
    const { user, supabase } = useAuth();
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [checking, setChecking] = useState(false);
    const [claiming, setClaiming] = useState(false);
    const [available, setAvailable] = useState<boolean | null>(null);

    useEffect(() => {
        if (!user) {
            router.push('/signup');
            return;
        }

        // Check if user already has a username
        const checkExistingUsername = async () => {
            const { data } = await supabase
                .from('profiles')
                .select('username')
                .eq('id', user.id)
                .single();

            if (data?.username) {
                // User already claimed, redirect to dashboard
                router.push('/dashboard?welcome=true');
            }
        };

        checkExistingUsername();
    }, [user, router, supabase]);

    const checkAvailability = async (value: string) => {
        if (!value || value.length < 3) {
            setAvailable(null);
            return;
        }

        setChecking(true);
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('username')
                .eq('username', value.toLowerCase())
                .maybeSingle();

            if (error) throw error;
            setAvailable(!data);
        } catch (error) {
            console.error('Error checking username:', error);
            setAvailable(null);
        } finally {
            setChecking(false);
        }
    };

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, '');
        setUsername(value);

        // Debounce check
        if (value.length >= 3) {
            const timer = setTimeout(() => checkAvailability(value), 500);
            return () => clearTimeout(timer);
        } else {
            setAvailable(null);
        }
    };

    const handleClaim = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!username || username.length < 3) {
            toast.error('Username must be at least 3 characters');
            return;
        }

        if (available === false) {
            toast.error('This username is already taken');
            return;
        }

        setClaiming(true);

        try {
            // Update profile with username
            const { error: updateError } = await supabase
                .from('profiles')
                .update({ username })
                .eq('id', user!.id);

            if (updateError) throw updateError;

            toast.success('Username claimed! 🎉');
            router.push('/dashboard?welcome=true');
        } catch (error: unknown) {
            console.error('Error claiming username:', error);
            const message = error instanceof Error ? error.message : 'Failed to claim username';
            toast.error(message);
        } finally {
            setClaiming(false);
        }
    };

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10" />
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]" />

            {/* Logo */}
            <div className="fixed top-8 left-8 z-50">
                <Link href="/" className="inline-block group">
                    <div className="flex items-center gap-3 transition-all group-hover:scale-105">
                        <div className="relative w-10 h-10 flex items-center justify-center">
                            <div className="absolute inset-0 bg-blue-500 rounded-xl rotate-6 group-hover:rotate-0 transition-transform duration-300 shadow-lg shadow-blue-500/20" />
                            <div className="relative w-full h-full bg-black border border-white/10 rounded-xl flex items-center justify-center font-black text-blue-500 text-xs tracking-tighter">
                                D/B
                            </div>
                        </div>
                        <span className="text-xl font-black text-white tracking-tight group-hover:text-blue-400 transition-colors">DevBio</span>
                    </div>
                </Link>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 w-full max-w-2xl"
            >
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', delay: 0.2 }}
                        className="text-6xl mb-6"
                    >
                        🥳
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Welcome, early bird!
                    </h1>
                    <p className="text-xl text-white/60 font-light">
                        How do you want to name your page?
                    </p>
                </div>

                <form onSubmit={handleClaim} className="space-y-6">
                    <div className="relative">
                        <div className="glass-card rounded-3xl p-2 border-white/10 bg-white/5">
                            <div className="flex items-center gap-4 px-6 py-4">
                                <span className="text-white/40 font-bold text-lg whitespace-nowrap">devbio.co/</span>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={handleUsernameChange}
                                    placeholder="yourname"
                                    autoFocus
                                    required
                                    minLength={3}
                                    maxLength={30}
                                    className="flex-1 bg-transparent text-white text-2xl font-bold focus:outline-none placeholder:text-white/20"
                                />
                                {checking && (
                                    <div className="w-6 h-6">
                                        <LoadingSpinner />
                                    </div>
                                )}
                                {!checking && available === true && username.length >= 3 && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="text-green-500 text-2xl"
                                    >
                                        ✓
                                    </motion.div>
                                )}
                                {!checking && available === false && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="text-red-500 text-2xl"
                                    >
                                        ✗
                                    </motion.div>
                                )}
                            </div>
                        </div>

                        {/* Validation Messages */}
                        <div className="mt-4 px-6">
                            {username.length > 0 && username.length < 3 && (
                                <p className="text-yellow-500 text-sm font-medium">At least 3 characters required</p>
                            )}
                            {available === false && (
                                <p className="text-red-500 text-sm font-medium">This username is already taken</p>
                            )}
                            {available === true && (
                                <p className="text-green-500 text-sm font-medium">Perfect! This username is available 🎉</p>
                            )}
                        </div>
                    </div>

                    <motion.button
                        type="submit"
                        disabled={claiming || !available || username.length < 3}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6 rounded-3xl font-black text-xl hover:shadow-2xl hover:shadow-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                        {claiming ? (
                            <>
                                <LoadingSpinner />
                                <span>Claiming...</span>
                            </>
                        ) : (
                            <>
                                <span>Claim My Page</span>
                                <span className="text-2xl">🚀</span>
                            </>
                        )}
                    </motion.button>

                    <p className="text-center text-white/40 text-sm">
                        You can change this later in your settings
                    </p>
                </form>
            </motion.div>
        </div>
    );
};

export default ClaimPage;
