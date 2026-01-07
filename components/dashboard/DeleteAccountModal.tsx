import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

import Portal from "../Portal";

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({ isOpen, onClose, onConfirm }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Portal>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-2xl flex justify-center items-center p-4 z-[110]"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="glass-card rounded-[2.5rem] border-red-500/20 p-12 w-full max-w-lg relative shadow-2xl"
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center text-red-500 mx-auto mb-8">
                  <FiX size={40} />
                </div>

                <h2 className="text-3xl font-black text-white tracking-tighter mb-4">Final Confirmation</h2>
                <p className="text-white/40 text-sm font-medium leading-relaxed mb-10">
                  This operation is destructive and irreversible. Your engineering legacy on DevBio will be permanently erased.
                </p>

                <div className="flex flex-col gap-3">
                  <button
                    className="w-full py-5 bg-red-500 text-white font-black rounded-2xl hover:bg-red-600 transition-all cursor-pointer shadow-xl shadow-red-500/10"
                    onClick={() => {
                      onConfirm();
                      onClose();
                    }}
                  >
                    Erase My Identity
                  </button>
                  <button
                    className="w-full py-5 glass text-white/40 hover:text-white transition-all rounded-2xl cursor-pointer font-bold border-white/5"
                    onClick={onClose}
                  >
                    Abort Operation
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </Portal>
      )}
    </AnimatePresence>
  );
};

export default DeleteAccountModal;
