import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';

const themes = [
    { id: 'onyx', name: 'Onyx Dark', preview: 'bg-black border border-white/10' },
    { id: 'alabaster', name: 'Alabaster', preview: 'bg-white shadow-inner border border-gray-200' },
    { id: 'carbon', name: 'Carbon', preview: 'bg-gray-900 border border-white/5' },
    { id: 'monokai', name: 'Monokai', preview: 'bg-[#272822] border border-[#f8f8f2]/10' },
    { id: 'dracula', name: 'Dracula', preview: 'bg-[#282a36] border border-[#bd93f9]/20' },
    { id: 'nord', name: 'Nord', preview: 'bg-[#2e3440] border border-[#88c0d0]/20' },
    { id: 'oceanic', name: 'Oceanic', preview: 'bg-slate-900 border border-blue-500/20' },
    { id: 'ember', name: 'Ember', preview: 'bg-stone-900 border border-orange-500/20' },
    { id: 'ghost', name: 'Ghost', preview: 'bg-zinc-950 border border-zinc-800' },
    { id: 'midnight', name: 'Midnight', preview: 'bg-slate-950 border border-slate-800' },
    { id: 'forest', name: 'Deep Forest', preview: 'bg-emerald-950 border border-emerald-900/30' },
    { id: 'cobalt', name: 'Cobalt', preview: 'bg-blue-950 border border-blue-900/40' },
];

const ThemeSettings = () => {
    const [selectedTheme, setSelectedTheme] = useState('onyx');
    const [beamsEnabled, setBeamsEnabled] = useState(true);

    useEffect(() => {
        // Mock persistence or global state trigger
        const savedBeams = localStorage.getItem('background-beams-enabled');
        if (savedBeams !== null) {
            setBeamsEnabled(savedBeams === 'true');
        }
    }, []);

    const toggleBeams = () => {
        const newState = !beamsEnabled;
        setBeamsEnabled(newState);
        localStorage.setItem('background-beams-enabled', newState.toString());
        // Trigger a custom event for BackgroundBeams to listen to
        window.dispatchEvent(new Event('background-beams-toggle'));
    };

    return (
        <section className="mb-20 md:mb-0">
            <div className="mb-10 text-center md:text-left">
                <h3 className="text-2xl font-black text-white tracking-tighter">Visual Interface</h3>
                <p className="text-white/40 text-sm font-medium uppercase tracking-widest mt-1">Select your profile's core signature</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {themes.map((theme, index) => (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        key={theme.id}
                        onClick={() => setSelectedTheme(theme.id)}
                        className="group relative flex flex-col cursor-pointer"
                    >
                        <div className={`w-full h-48 rounded-[2rem] mb-4 relative overflow-hidden transition-all duration-500 border-2 ${selectedTheme === theme.id
                            ? 'border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.2)]'
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
                                        className="absolute top-4 right-4 w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center text-white shadow-xl"
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

            <div className="mt-16 p-8 glass rounded-[2rem] border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 cursor-pointer" onClick={toggleBeams}>
                <div>
                    <h4 className="text-lg font-bold text-white tracking-tight">Custom Background Beams</h4>
                    <p className="text-white/30 text-sm font-light">Toggle animated mesh gradients for maximum impact.</p>
                </div>
                <div
                    className={`w-14 h-8 rounded-full flex items-center p-1 transition-all duration-300 ${beamsEnabled ? 'bg-blue-500' : 'bg-white/10'}`}
                >
                    <motion.div
                        animate={{ x: beamsEnabled ? 24 : 0 }}
                        className="w-6 h-6 bg-white rounded-full shadow-md"
                    />
                </div>
            </div>
        </section>
    )
}

export default ThemeSettings;