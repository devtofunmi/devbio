import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiLoader } from 'react-icons/fi';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../lib/AuthContext';
import { toast } from 'react-toastify';

const themes = [
    { id: 'onyx', name: 'Onyx Dark', preview: 'bg-black border border-white/10' },
    { id: 'ghost', name: 'Ghost', preview: 'bg-zinc-950 border border-zinc-900' },
    { id: 'midnight', name: 'Midnight Royal', preview: 'bg-[#020617] border border-blue-900/30' },
    { id: 'forest', name: 'Deep Forest', preview: 'bg-[#051f1b] border border-emerald-900/30' },
    { id: 'dracula', name: 'Velvet Plum', preview: 'bg-[#130912] border border-purple-900/30' },
    { id: 'cobalt', name: 'Royal Blue', preview: 'bg-[#040a1d] border border-blue-800/20' },
    { id: 'carbon', name: 'Titanium Grey', preview: 'bg-[#141414] border border-white/5' },
    { id: 'nord', name: 'Nordic Slate', preview: 'bg-[#1a202c] border border-slate-700/20' },
    { id: 'ember', name: 'Terracotta', preview: 'bg-[#17110e] border border-orange-900/20' },
    { id: 'alabaster', name: 'Slate Deep', preview: 'bg-[#1e293b] border border-slate-700' },
    { id: 'dim', name: 'Platinum Dim', preview: 'bg-[#15151a] border border-white/5' },
];

const ThemeSettings = () => {
    const { user } = useAuth();
    const [selectedTheme, setSelectedTheme] = useState('onyx');
    // const [beamsEnabled, setBeamsEnabled] = useState(true); // Removed
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchThemeSettings = async () => {
            if (!user) return;
            const { data, error } = await supabase
                .from('profiles')
                .select('theme, beams_enabled')
                .eq('id', user.id)
                .single();

            if (data && !error) {
                if (data.theme) setSelectedTheme(data.theme);
                // if (data.beams_enabled !== null) setBeamsEnabled(data.beams_enabled); // Removed
            }
        };

        fetchThemeSettings();
    }, [user]);

    const autoSaveSettings = async (updates: any) => {
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
    };

    /* // Removed toggleBeams
    const toggleBeams = () => {
        const newState = !beamsEnabled;
        setBeamsEnabled(newState);
        autoSaveSettings({ beams_enabled: newState });
        // Still dispatch event for local parity if needed
        window.dispatchEvent(new Event('background-beams-toggle'));
    };
    */

    return (
        <section className="mb-20 md:mb-0 relative">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {themes.map((theme, index) => (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        key={theme.id}
                        onClick={() => handleThemeSelect(theme.id)}
                        className="group relative flex flex-col cursor-pointer"
                    >
                        <div className={`w-full h-48 rounded-[2rem] mb-4 relative overflow-hidden transition-all duration-500 border-2 ${selectedTheme === theme.id
                            ? 'border-blue-500'
                            : 'border-transparent group-hover:border-white/10'
                            } ${theme.preview}`}>

                            <div className="absolute inset-0 p-6 flex flex-col gap-3 justify-center">
                                <div className="h-4 rounded-lg bg-white/5 w-3/4" />
                                <div className="h-4 rounded-lg bg-white/5 w-1/2" />
                                <div className="h-4 rounded-lg bg-white/5 w-full" />
                            </div>

                            <AnimatePresence>
                                {selectedTheme === theme.id && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="absolute top-4 right-4 w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center text-white"
                                    >
                                        <FiCheck size={16} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <p className={`text-center font-bold tracking-tight transition-colors ${selectedTheme === theme.id ? 'text-white' : 'text-white/30 group-hover:text-white/60'
                            }`}>
                            {theme.name}
                        </p>
                    </motion.button>
                ))}
            </div>

            {/* Beams toggle removed */}
        </section>
    )
}

export default ThemeSettings;