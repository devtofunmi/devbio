import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiLoader } from 'react-icons/fi';
import { useAuth } from '../../lib/AuthContext';
import { toast } from 'react-toastify';

const themes = [
    { id: 'onyx', name: 'Onyx Dark', type: 'solid', preview: 'bg-black border border-white/10' },
    { id: 'ghost', name: 'Ghost', type: 'solid', preview: 'bg-zinc-950 border border-zinc-900' },
    { id: 'midnight', name: 'Midnight Royal', type: 'solid', preview: 'bg-[#020617] border border-blue-900/30' },
    { id: 'forest', name: 'Deep Forest', type: 'solid', preview: 'bg-[#051f1b] border border-emerald-900/30' },
    { id: 'dracula', name: 'Velvet Plum', type: 'solid', preview: 'bg-[#130912] border border-purple-900/30' },
    { id: 'cobalt', name: 'Royal Blue', type: 'solid', preview: 'bg-[#040a1d] border border-blue-800/20' },
    { id: 'carbon', name: 'Titanium Grey', type: 'solid', preview: 'bg-[#141414] border border-white/5' },
    { id: 'nord', name: 'Nordic Slate', type: 'solid', preview: 'bg-[#1a202c] border border-slate-700/20' },
    { id: 'ember', name: 'Terracotta', type: 'solid', preview: 'bg-[#17110e] border border-orange-900/20' },
    { id: 'alabaster', name: 'Slate Deep', type: 'solid', preview: 'bg-[#1e293b] border border-slate-700' },
    { id: 'dim', name: 'Platinum Dim', type: 'solid', preview: 'bg-[#15151a] border border-white/5' },
    { id: 'matrix', name: 'Midnight Mesh', type: 'image', preview: 'https://images.unsplash.com/photo-1550684848-86a5d8727436?w=800&q=80' },
    { id: 'circuit', name: 'Dark Nebula', type: 'image', preview: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=800&q=80' },
    { id: 'terminal', name: 'Cosmic Dusk', type: 'image', preview: 'https://images.unsplash.com/photo-1519750783826-e2420f4d687f?w=800&q=80' },
    { id: 'workspace', name: 'Abstract Flow', type: 'image', preview: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80' },
    { id: 'nodes', name: 'Deep Gradient', type: 'gradient', preview: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&q=80' },
    { id: 'glass', name: 'Frosted Glass', type: 'gradient', preview: 'https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?w=800&q=80' },
    { id: 'velvet', name: 'Indigo Velvet', type: 'gradient', preview: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&q=80' },
    { id: 'aurora', name: 'Dark Aurora', type: 'gradient', preview: 'https://images.unsplash.com/photo-1536431311719-398b6704d4cc?w=800&q=80' },
    { id: 'silence', name: 'Silent Mist', type: 'gradient', preview: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80' },
    { id: 'prism', name: 'Crystal Prism', type: 'gradient', preview: 'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=800&q=80' },
    { id: 'cloud', name: 'Silver Luster', type: 'gradient', preview: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=800&q=80' },
    { id: 'smoke', name: 'Dark Ethereal', type: 'gradient', preview: 'https://images.unsplash.com/photo-1541450805268-4822a3a774ca?w=800&q=80' },
    { id: 'mesh', name: 'Cyber Silk', type: 'gradient', preview: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&q=80' },
    { id: 'flow', name: 'Liquid Metal', type: 'gradient', preview: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80' },
];

const ThemeSettings: React.FC<{ compact?: boolean; onThemeChange?: (theme: string) => void }> = ({ compact = false, onThemeChange }) => {
    const { user, supabase } = useAuth();
    const [selectedTheme, setSelectedTheme] = useState('onyx');
    const [saving, setSaving] = useState(false);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const fetchThemeSettings = async () => {
            if (!user) return;
            const { data, error } = await supabase
                .from('profiles')
                .select('theme ')
                .eq('id', user.id)
                .single();

            if (data && !error) {
                if (data.theme) setSelectedTheme(data.theme);
            }
        };

        fetchThemeSettings();
    }, [user, supabase]);

    const autoSaveSettings = async (updates: Record<string, unknown>) => {
        if (!user) return;
        setSaving(true);
        try {
            const { error } = await supabase
                .from('profiles')
                .update({
                    ...updates,
                    updated_at: new Date().toISOString()
                })
                .eq('id', user.id);

            if (error) throw error;
        } catch (err) {
            console.error("Failed to save theme settings", err);
            toast.error("Failed to sync theme to cloud");
        } finally {
            setTimeout(() => setSaving(false), 800);
        }
    };

    const handleThemeSelect = (themeId: string) => {
        setSelectedTheme(themeId);
        autoSaveSettings({ theme: themeId });
        if (onThemeChange) {
            onThemeChange(themeId);
        }
        window.dispatchEvent(new CustomEvent('theme-change', { detail: themeId }));
    };

    const filteredThemes = filter === 'all' ? themes : themes.filter(t => t.type === filter);

    return (
        <section className={`mb-20 md:mb-0 relative ${compact ? 'px-1' : ''}`}>
            <div className="mb-6 flex items-center gap-2 p-1 glass rounded-xl w-fit relative z-10">
                {['all', 'solid', 'gradient', 'image'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`relative px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors z-20 ${filter === f ? 'text-black' : 'text-white/40 hover:text-white'
                            }`}
                    >
                        {filter === f && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 bg-white rounded-lg -z-10 shadow-lg"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        {f}
                    </button>
                ))}
            </div>

            {!compact && (
                <div className="mb-10 flex items-end justify-between">
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-black text-white tracking-tighter">Visual Interface</h3>
                        <p className="text-white/40 text-sm font-medium uppercase tracking-widest mt-1">Select your profile&apos;s core signature</p>
                    </div>
                    {saving && (
                        <div className="flex items-center gap-2 text-yellow-500 font-bold text-xs uppercase tracking-widest animate-pulse">
                            <FiLoader className="animate-spin" />
                            <span>Syncing...</span>
                        </div>
                    )}
                </div>
            )}

            {compact && saving && (
                <div className="mb-4 flex items-center gap-2 text-yellow-500 font-bold text-xs uppercase tracking-widest animate-pulse justify-center">
                    <FiLoader className="animate-spin" />
                    <span>Syncing...</span>
                </div>
            )}

            <div className={compact ? "grid grid-cols-2 gap-3" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"}>
                {filteredThemes.map((theme, index) => (
                    <motion.button
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        key={theme.id}
                        onClick={() => handleThemeSelect(theme.id)}
                        className="group relative flex flex-col cursor-pointer"
                    >
                        <div className={`w-full ${compact ? 'h-24 rounded-2xl mb-2' : 'h-48 rounded-[2rem] mb-4'} relative overflow-hidden transition-all duration-500 border-2 ${selectedTheme === theme.id
                            ? 'border-blue-500'
                            : 'border-transparent group-hover:border-white/10'
                            } ${!theme.preview.startsWith('http') ? theme.preview : ''}`}>

                            {theme.preview.startsWith('http') && (
                                <Image
                                    src={theme.preview}
                                    alt={theme.name}
                                    fill
                                    className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                                />
                            )}

                            <div className={`absolute inset-0 ${compact ? 'p-3' : 'p-6'} flex flex-col gap-2 justify-center`}>
                                <div className="h-1.5 rounded-full bg-white/10 w-3/4" />
                                <div className="h-1.5 rounded-full bg-white/10 w-1/2" />
                            </div>

                            <AnimatePresence>
                                {selectedTheme === theme.id && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className={`absolute ${compact ? 'top-2 right-2 w-5 h-5 text-[10px]' : 'top-4 right-4 w-8 h-8 text-base'} bg-blue-500 rounded-lg flex items-center justify-center text-white`}
                                    >
                                        <FiCheck />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <p className={`text-center font-bold tracking-tight transition-colors ${compact ? 'text-[10px]' : 'text-base'} ${selectedTheme === theme.id ? 'text-white' : 'text-white/30 group-hover:text-white/60'
                            }`}>
                            {theme.name}
                        </p>
                    </motion.button>
                ))}
            </div>

        </section>
    )
}

export default ThemeSettings;