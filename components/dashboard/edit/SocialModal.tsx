import React, { useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";

type Social = {
  name: string;
  icon: React.ReactNode;
  href: string;
};

type SocialModalProps = {
  socials: Social[];
  handleSocialChange: (name: string, href: string) => void;
  setSocialModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

import Portal from "../../Portal";

const SocialModal: React.FC<SocialModalProps> = ({
  socials,
  handleSocialChange,
  setSocialModalOpen,
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  return (
    <Portal>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-xl flex justify-center items-center p-4 z-[100]"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="glass-card rounded-[2.5rem] border-white/10 p-10 w-full max-w-lg relative shadow-2xl flex flex-col max-h-[80vh]"
        >
          <button
            onClick={() => setSocialModalOpen(false)}
            className="absolute top-6 right-6 w-10 h-10 glass rounded-full flex items-center justify-center text-white/40 hover:text-white transition-all cursor-pointer z-10"
          >
            <FaTimes size={16} />
          </button>

          <div className="mb-10 shrink-0">
            <h2 className="text-3xl font-black text-white tracking-tighter">Social Links</h2>
            <p className="text-white/40 text-sm font-medium uppercase tracking-widest mt-1">Connect your identities</p>
          </div>

          <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar flex-1">
            {socials.map((social, index) => (
              <div key={social.name} className="flex items-center glass rounded-2xl p-2 border-white/5 group focus-within:border-blue-500/50 transition-all">
                <div className="w-12 h-12 flex items-center justify-center text-white/40 group-focus-within:text-blue-400 transition-colors">
                  {social.icon}
                </div>
                <input
                  ref={(el) => { inputRefs.current[index] = el; }}
                  type="text"
                  value={social.href}
                  onChange={(e) => handleSocialChange(social.name, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const nextInput = inputRefs.current[index + 1];
                      if (nextInput) {
                        nextInput.focus();
                      } else {
                        setSocialModalOpen(false);
                      }
                    }
                  }}
                  className="flex-1 p-3 bg-transparent focus:outline-none text-white placeholder:text-white/20 font-medium"
                  placeholder={`@username`}
                />
              </div>
            ))}
          </div>

          <button
            onClick={() => setSocialModalOpen(false)}
            className="w-full mt-10 py-5 bg-white text-black font-black rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-xl shrink-0"
          >
            Done
          </button>
        </motion.div>
      </motion.div>
    </Portal>
  );
};

export default SocialModal;
