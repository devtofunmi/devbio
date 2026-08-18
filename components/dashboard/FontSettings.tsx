import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiLoader } from 'react-icons/fi';
import { useAuth } from '../../lib/AuthContext';
import { toast } from 'react-toastify';
import { PROFILE_FONTS, DEFAULT_PROFILE_FONT } from '../../lib/profileFonts';

/**
 * Typography picker for the public profile. Each tile renders its own specimen
 * in the face it selects, which is the only preview that actually tells you
 * anything — a font name set in a different font is useless.
 */
const FontSettings: React.FC = () => {
    const { user, supabase } = useAuth();
    const [selected, setSelected] = useState(DEFAULT_PROFILE_FONT);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchFont = async () => {
            if (!user) return;
            // select('*') rather than naming the column: naming one that does not
            // exist fails the whole query, which would break this panel on a
            // database where the migration has not been applied yet.
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();
            if (data && !error && data.profile_font) setSelected(data.profile_font);
        };
        fetchFont();
    }, [user, supabase]);

    const handleSelect = async (id: string) => {
        if (!user || id === selected) return;
        const previous = selected;
        setSelected(id);
        setSaving(true);
        try {
            const { error } = await supabase
                .from('profiles')
                .update({ profile_font: id, updated_at: new Date().toISOString() })
                .eq('id', user.id);
            if (error) throw error;
        } catch (err) {
            console.error('Failed to save font', err);
            toast.error('Failed to save font');
            setSelected(previous);
        } finally {
            setTimeout(() => setSaving(false), 800);
        }
    };

    return (
        <section className="mb-12">
            <div className="mb-6 flex items-end justify-between gap-4">
                <div className="text-center md:text-left">
                    <h3 className="text-2xl font-black text-white tracking-tighter">Typography</h3>
                    <p className="text-white/40 text-sm font-medium uppercase tracking-widest mt-1">
                        The type on your public profile
                    </p>
                </div>
                {saving && (
                    <div className="flex items-center gap-2 text-yellow-500 font-bold text-xs uppercase tracking-widest animate-pulse shrink-0">
                        <FiLoader className="animate-spin" />
                        <span>Syncing...</span>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PROFILE_FONTS.map((font) => {
                    const active = selected === font.id;
                    return (
                        <button
                            key={font.id}
                            onClick={() => handleSelect(font.id)}
                            className={`group relative text-left cursor-pointer rounded-[1.5rem] border-2 p-5 bg-[#0c0b09] transition-all duration-300 ${active
                                ? 'border-blue-500'
                                : 'border-white/5 hover:border-white/15'
                                }`}
                        >
                            {active && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="absolute top-4 right-4 w-7 h-7 bg-blue-500 rounded-lg flex items-center justify-center text-white"
                                >
                                    <FiCheck size={14} />
                                </motion.div>
                            )}

                            {/* Specimen, set in the face this option applies */}
                            <div
                                className="text-white text-3xl leading-none pr-10"
                                style={{ fontFamily: `var(${font.previewVar})` }}
                            >
                                Ag
                            </div>
                            <div
                                className="text-white/50 text-sm mt-2 pr-10 truncate"
                                style={{ fontFamily: `var(${font.previewVar})` }}
                            >
                                The quick brown fox
                            </div>

                            <p
                                className={`mt-4 font-bold tracking-tight transition-colors ${active ? 'text-white' : 'text-white/40 group-hover:text-white/70'
                                    }`}
                            >
                                {font.name}
                            </p>
                            <p className="text-white/30 text-xs mt-0.5">{font.description}</p>
                        </button>
                    );
                })}
            </div>
        </section>
    );
};

export default FontSettings;
