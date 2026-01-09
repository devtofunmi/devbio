import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    message?: string;
    buttonText?: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
    isOpen,
    onClose,
    title = "Welcome Aboard!",
    message = "Your DevBio account has been successfully created.",
    buttonText = "Go to Dashboard"
}) => {
    const [windowWidth, setWindowWidth] = useState(0);
    const [windowHeight, setWindowHeight] = useState(0);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleResize = () => {
                setWindowWidth(window.innerWidth);
                setWindowHeight(window.innerHeight);
            };

            handleResize();
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            >
                <div className="absolute inset-0 pointer-events-none">
                    <Confetti width={windowWidth} height={windowHeight} recycle={false} numberOfPieces={500} gravity={0.15} />
                </div>

                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    className="bg-[#111] border border-white/10 p-8 rounded-[2rem] max-w-sm w-full text-center relative overflow-hidden shadow-2xl z-10"
                >
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

                    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <div className="text-4xl">🎉</div>
                    </div>

                    <h2 className="text-2xl font-black text-white mb-2">{title}</h2>
                    <p className="text-white/50 mb-8">{message}</p>

                    <button
                        onClick={onClose}
                        className="w-full bg-white text-black py-4 rounded-xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                    >
                        {buttonText}
                    </button>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default SuccessModal;