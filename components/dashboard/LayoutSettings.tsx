import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiLoader } from 'react-icons/fi';
import { useAuth } from '../../lib/AuthContext';
import { toast } from 'react-toastify';

const layouts = [
    {
        id: 'classic',
        name: 'Classic',
        description: 'Rich cards, GitHub graph, tech stack & CTA.',
    },
    {
        id: 'minimal',
        name: 'Minimal',
        description: 'Single-column, serif type, quiet and text-forward.',
    },
];

// Small wireframe previews so the difference is legible at a glance.
const ClassicPreview = () => (
    <div className="w-full h-full p-3 flex flex-col gap-2">
        <div className="h-6 rounded-md bg-white/10" />
        <div className="grid grid-cols-3 gap-2 flex-1">
            <div className="rounded-md bg-white/10" />
            <div className="rounded-md bg-white/10" />
            <div className="rounded-md bg-white/10" />
        </div>
    </div>
);

const MinimalPreview = () => (
    <div className="w-full h-full p-3 flex flex-col items-center gap-2">
        <div className="w-5 h-5 rounded-full bg-white/15 mt-1" />
        <div className="h-3 w-24 rounded bg-white/15" />
        <div className="h-1.5 w-16 rounded bg-white/10" />
        <div className="mt-1 h-1.5 w-28 rounded bg-white/10" />
        <div className="h-1.5 w-24 rounded bg-white/10" />
    </div>
);

// Boot screen durations, in ms. Discrete steps rather than a free slider so a
// profile can't end up behind an absurd wait. Must stay within the
// loader_delay_range constraint in SETUP_DB.sql (0–8000).
const LOADER_OPTIONS = [
    { ms: 0, label: 'Off' },
    { ms: 2000, label: '2s' },
    { ms: 2800, label: '2.8s' },
    { ms: 4000, label: '4s' },
    { ms: 6000, label: '6s' },
];

const LayoutSettings: React.FC = () => {
    const { user, supabase } = useAuth();
    const [selected, setSelected] = useState('classic');
    // Off unless the profile says otherwise — the boot screen is opt-in.
    const [loaderDelay, setLoaderDelay] = useState(0);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchLayout = async () => {
            if (!user) return;
            // select('*') rather than naming loader_delay_ms: before the
            // migration runs, naming a missing column errors the whole query
            // and would take the layout picker down with it.
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();
            if (data && !error) {
                if (data.layout) setSelected(data.layout);
                if (typeof data.loader_delay_ms === 'number') setLoaderDelay(data.loader_delay_ms);
            }
        };
        fetchLayout();
    }, [user, supabase]);

    const handleSelect = async (id: string) => {
        if (!user || id === selected) return;
        const previous = selected;
        setSelected(id);
        setSaving(true);
        try {
            const { error } = await supabase
                .from('profiles')
                .update({ layout: id, updated_at: new Date().toISOString() })
                .eq('id', user.id);
            if (error) throw error;
        } catch (err) {
            console.error('Failed to save layout', err);
            toast.error('Failed to save layout');
            setSelected(previous);
        } finally {
            setTimeout(() => setSaving(false), 800);
        }
    };

    const handleLoaderDelay = async (ms: number) => {
        if (!user || ms === loaderDelay) return;
        const previous = loaderDelay;
        setLoaderDelay(ms);
        setSaving(true);
        try {
            const { error } = await supabase
                .from('profiles')
                .update({ loader_delay_ms: ms, updated_at: new Date().toISOString() })
                .eq('id', user.id);
            if (error) throw error;
        } catch (err) {
            console.error('Failed to save loading screen delay', err);
            toast.error('Failed to save loading screen delay');
            setLoaderDelay(previous);
        } finally {
            setTimeout(() => setSaving(false), 800);
        }
    };

    return (
        <section className="mb-12">
            <div className="mb-6 flex items-end justify-between">
                <div className="text-center md:text-left">
                    <h3 className="text-2xl font-black text-white tracking-tighter">Layout</h3>
                    <p className="text-white/40 text-sm font-medium uppercase tracking-widest mt-1">
                        How your profile is structured
                    </p>
                </div>
                {saving && (
                    <div className="flex items-center gap-2 text-yellow-500 font-bold text-xs uppercase tracking-widest animate-pulse">
                        <FiLoader className="animate-spin" />
                        <span>Syncing...</span>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {layouts.map((layout) => (
                    <button
                        key={layout.id}
                        onClick={() => handleSelect(layout.id)}
                        className="group relative flex flex-col text-left cursor-pointer"
                    >
                        <div
                            className={`w-full h-40 rounded-[2rem] mb-4 relative overflow-hidden bg-[#0c0b09] transition-all duration-300 border-2 ${selected === layout.id
                                ? 'border-blue-500'
                                : 'border-transparent group-hover:border-white/10'
                                }`}
                        >
                            {layout.id === 'classic' ? <ClassicPreview /> : <MinimalPreview />}
                            {selected === layout.id && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="absolute top-4 right-4 w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white"
                                >
                                    <FiCheck />
                                </motion.div>
                            )}
                        </div>
                        <p
                            className={`font-bold tracking-tight transition-colors ${selected === layout.id ? 'text-white' : 'text-white/40 group-hover:text-white/70'
                                }`}
                        >
                            {layout.name}
                        </p>
                        <p className="text-white/30 text-xs mt-0.5">{layout.description}</p>
                    </button>
                ))}
            </div>

            {/* Only the minimal layout has a boot screen, so this is scoped to it. */}
            {selected === 'minimal' && (
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="mt-8 glass-card rounded-[2rem] border-white/5 p-6 md:p-8"
                >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="min-w-0">
                            <p className="font-bold text-white tracking-tight">Loading screen</p>
                            <p className="text-white/30 text-xs mt-0.5">
                                How long visitors see the boot screen before your profile.
                            </p>
                        </div>

                        <div className="flex items-center gap-1.5 glass p-1.5 rounded-2xl border-white/5 self-start sm:self-auto shrink-0">
                            {LOADER_OPTIONS.map((opt) => (
                                <button
                                    key={opt.ms}
                                    onClick={() => handleLoaderDelay(opt.ms)}
                                    className={`relative px-3 sm:px-4 py-2 cursor-pointer rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors ${loaderDelay === opt.ms
                                        ? 'text-black'
                                        : 'text-white/30 hover:text-white/60'
                                        }`}
                                >
                                    <span className="relative z-10">{opt.label}</span>
                                    {loaderDelay === opt.ms && (
                                        <motion.div
                                            layoutId="activeLoaderDelay"
                                            className="absolute inset-0 bg-white rounded-xl shadow-xl"
                                            transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    <p className="text-white/20 text-[10px] mt-4 leading-relaxed">
                        {loaderDelay === 0
                            ? 'Visitors go straight to your profile.'
                            : 'Shown once per visit. Visitors can skip it, and it is skipped entirely for anyone who prefers reduced motion.'}
                    </p>
                </motion.div>
            )}
        </section>
    );
};

export default LayoutSettings;
