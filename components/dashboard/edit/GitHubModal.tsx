import React, { useState } from "react";
import { FaTimes, FaGithub, FaCheck, FaExclamationCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import Portal from "../../Portal";

type GitHubModalProps = {
  githubUsername: string;
  onSave: (username: string) => void;
  onClose: () => void;
};

const GitHubModal: React.FC<GitHubModalProps> = ({
  githubUsername,
  onSave,
  onClose,
}) => {
  const [localUsername, setLocalUsername] = useState(githubUsername);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!localUsername.trim()) {
      setError("Username is required");
      return;
    }

    setVerifying(true);
    setError("");

    try {
      const res = await fetch(`https://api.github.com/users/${localUsername}`);
      if (res.ok) {
        onSave(localUsername);
      } else {
        setError("User not found on GitHub");
      }
    } catch (err) {
      setError("Failed to verify username");
    } finally {
      setVerifying(false);
    }
  };

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
          className="glass-card rounded-[2.5rem] border-white/10 p-10 w-full max-w-md relative shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 glass rounded-full flex items-center justify-center text-white/40 hover:text-white transition-all cursor-pointer"
          >
            <FaTimes size={16} />
          </button>

          <div className="mb-8 text-center">
            <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center text-white mx-auto mb-6">
              <FaGithub size={32} />
            </div>
            <h2 className="text-3xl font-black text-white tracking-tighter">Sync GitHub</h2>
            <p className="text-white/40 text-sm font-medium uppercase tracking-widest mt-1">Showcase your contributions</p>
          </div>

          <div className="relative group">
            <div className={`absolute inset-y-0 left-6 flex items-center transition-colors ${error ? 'text-red-500' : 'text-white/20 group-focus-within:text-blue-500'}`}>
              <FaGithub size={20} />
            </div>
            <input
              type="text"
              value={localUsername}
              onChange={(e) => {
                setLocalUsername(e.target.value);
                setError("");
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              className={`w-full pl-14 pr-6 py-5 glass rounded-2xl focus:outline-none focus:ring-2 ${error ? 'focus:ring-red-500/50 border-red-500/50' : 'focus:ring-blue-500/50 border-white/5'} text-white placeholder:text-white/20 font-bold transition-all`}
              placeholder="Username"
            />
          </div>

          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-red-500 text-xs font-bold mt-3 ml-2">
              <FaExclamationCircle />
              <span>{error}</span>
            </motion.div>
          )}

          <button
            onClick={handleSave}
            disabled={verifying}
            className="w-full mt-8 py-5 bg-white text-black font-black rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {verifying ? (
              <>Verifying...</>
            ) : (
              <>Connect Identity</>
            )}
          </button>

          <p className="text-center text-[10px] text-white/20 mt-6 font-medium uppercase tracking-[0.2em]">
            This will fetch your public contribution graph
          </p>
        </motion.div>
      </motion.div>
    </Portal>
  );
};

export default GitHubModal;
