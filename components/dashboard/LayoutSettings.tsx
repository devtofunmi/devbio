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

const LayoutSettings: React.FC = () => {
    const { user, supabase } = useAuth();
    const [selected, setSelected] = useState('classic');
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchLayout = async () => {
            if (!user) return;
            const { data, error } = await supabase
                .from('profiles')
                .select('layout')
                .eq('id', user.id)
                .single();
            if (data && !error && data.layout) setSelected(data.layout);
        };
        fetchLayout();
    }, [user, supabase]);

    const handleSelect = async (id: string) => {
        if (!user || id === selected) return;
        const previous = selected;
        setSelected(id);
        setSaving(true);

        // Dispatch a custom event for layout change
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('layout-change', { detail: id }));
        }

        try {
            const { error } = await supabase
                .from('profiles')
                .update({ layout: id })
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
        </section>
    );
};

export default LayoutSettings;
