import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCheck } from 'react-icons/fi';
import Portal from '../../Portal';

interface StatusModalProps {
    isOpen: boolean;
    onClose: () => void;
    isAvailable: boolean;
    statusText: string;
    statusIcon?: string;
    onSave: (isAvailable: boolean, statusText: string, statusIcon: string) => void;
}

const StatusModal: React.FC<StatusModalProps> = ({ isOpen, onClose, isAvailable, statusText, statusIcon, onSave }) => {
    const [localIsAvailable, setLocalIsAvailable] = useState(isAvailable);
    const [localStatusText, setLocalStatusText] = useState(statusText);
    const [localStatusIcon, setLocalStatusIcon] = useState(statusIcon || "💭");

    const handleSave = () => {
        onSave(localIsAvailable, localStatusText, localStatusIcon);
        onClose();
    };

    const availableOptions = ["Available for hire", "Open to collaborate", "Building in public", "Freelancing", "Mentoring"];
    const focusedOptions = ["Focused on current role", "Deep work", "Shit posting", "Learning", "Working on projects"];

    const [emojiOptions] = useState(["💭", "💻", "🎓", "⚡", "🍔", "🌴", "🤒", "🏠", "🎯", "🤔", "👀", "🚀", "🔥", "✨", "💤"]);

    return (
        <AnimatePresence>
            {isOpen && (
                <Portal>
                    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onClose}
                            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative glass-card border-white/10 rounded-[2.5rem] p-5 max-w-lg w-full overflow-hidden shadow-2xl"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Identity Status</h2>
                                <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                                    <FiX className="text-white/40" size={20} />
                                </button>
                            </div>

                            <div className="space-y-8">
                                {/* Toggle section */}
                                <div
                                    onClick={() => setLocalIsAvailable(!localIsAvailable)}
                                    className="flex items-center justify-between p-6 glass rounded-2xl border-white/5 cursor-pointer hover:border-blue-500/30 transition-all group"
                                >
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Availability Mode</span>
                                        <span className="text-lg font-black text-white flex items-center gap-3">
                                            <span className={`w-2.5 h-2.5 rounded-full ${localIsAvailable ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                                            {localIsAvailable ? 'Available' : 'Focused'}
                                        </span>
                                    </div>
                                    <div className={`w-12 h-6 rounded-full relative transition-colors ${localIsAvailable ? 'bg-blue-600' : 'bg-white/10'}`}>
                                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow-lg ${localIsAvailable ? 'left-[26px]' : 'left-1'}`} />
                                    </div>
                                </div>

                                {/* Input section */}
                                <div className="space-y-3">
                                    <span className="text-[10px] uppercase tracking-widest text-white/40 px-1">Status Message</span>
                                    <div className="flex bg-white/5 border border-white/10 rounded-2xl p-1 relative focus-within:border-blue-500/50 transition-all">
                                        <div className="flex items-center justify-center w-14 border-r border-white/5 text-2xl">
                                            {localStatusIcon}
                                        </div>
                                        <input
                                            type="text"
                                            value={localStatusText}
                                            onChange={(e) => setLocalStatusText(e.target.value)}
                                            placeholder={localIsAvailable ? "What are you available for?" : "What are you focused on?"}
                                            className="flex-1 bg-transparent px-4 py-3 text-base text-white placeholder:text-white/20 focus:outline-none"
                                        />
                                    </div>
                                    <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                                        {emojiOptions.map(emoji => (
                                            <button key={emoji} onClick={() => setLocalStatusIcon(emoji)} className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-all ${localStatusIcon === emoji ? 'bg-white text-black scale-110' : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white'}`}>
                                                {emoji}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Options section */}
                                <div className="space-y-3">
                                    <span className="text-[10px] uppercase tracking-widest text-white/40 px-1">Quick Picks</span>
                                    <div className="flex flex-wrap gap-2">
                                        {(localIsAvailable ? availableOptions : focusedOptions).map((option) => (
                                            <button
                                                key={option}
                                                onClick={() => setLocalStatusText(option)}
                                                className={`text-[10px] font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl border transition-all ${localStatusText === option
                                                    ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                                                    : 'bg-white/5 border-white/5 text-white/30 hover:text-white/60 hover:bg-white/10'
                                                    }`}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    onClick={handleSave}
                                    className="w-full py-5 bg-white text-black font-black rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-xl uppercase tracking-widest text-xs flex items-center justify-center gap-3"
                                >
                                    <FiCheck size={16} />
                                    Update Identity Status
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </Portal>
            )}
        </AnimatePresence>
    );
};

export default StatusModal;