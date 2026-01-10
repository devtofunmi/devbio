import { FaTimes, FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import { ALL_TECHS, Tech } from "../../../lib/constants";
import Portal from "../../Portal";

type TechStackModalProps = {
  techStack: Tech[];
  techSearch: string;
  setTechSearch: React.Dispatch<React.SetStateAction<string>>;
  filteredTechs: Tech[];
  handleTechToggle: (tech: Tech) => void;
  setTechModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const TechStackModal: React.FC<TechStackModalProps> = ({
  techStack,
  techSearch,
  setTechSearch,
  filteredTechs,
  handleTechToggle,
  setTechModalOpen,
}) => {
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
          className="glass-card rounded-[2.5rem] border-white/10 p-8 w-full max-w-lg relative shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar"
        >
          <button
            onClick={() => setTechModalOpen(false)}
            className="absolute top-5 right-5 w-8 h-8 glass rounded-full flex items-center justify-center text-white/40 hover:text-white transition-all cursor-pointer"
          >
            <FaTimes size={14} />
          </button>

          <div className="mb-6">
            <h2 className="text-2xl font-black text-white tracking-tighter">Tech Stack</h2>
            <p className="text-[10px] text-white/40 font-medium uppercase tracking-widest mt-1">Your Engineering DNA</p>
          </div>

          <div className="flex flex-wrap gap-2 mb-6 min-h-[40px]">
            {techStack.map((tech) => (
              <motion.div
                layout
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                key={tech.name}
                className="flex items-center glass text-blue-400 rounded-xl px-4 py-2 border border-white/5 font-bold text-sm"
              >
                {tech.name}
                <button
                  onClick={() => handleTechToggle(tech)}
                  className="ml-2 text-white/20 hover:text-red-500 transition-colors cursor-pointer"
                >
                  <FaTimes size={10} />
                </button>
              </motion.div>
            ))}
          </div>

          <div className="relative mb-6">
            <input
              type="text"
              value={techSearch}
              onChange={(e) => setTechSearch(e.target.value)}
              className="w-full p-5 glass rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white placeholder:text-white/20 border-white/5 font-medium"
              placeholder="Search technologies..."
            />
          </div>

          <div className="max-h-60 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
            {filteredTechs.map((tech) => (
              <div
                key={tech.name}
                onClick={() => handleTechToggle(tech)}
                className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all border border-transparent ${techStack.some(t => t.name === tech.name)
                  ? 'bg-blue-500/10 border-blue-500/30'
                  : 'hover:bg-white/5'
                  }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl glass flex items-center justify-center ${techStack.some(t => t.name === tech.name) ? 'text-blue-400' : 'text-white/20'}`}>
                    {tech.icon}
                  </div>
                  <div className="flex flex-col">
                    <div className={`font-bold tracking-tight ${techStack.some(t => t.name === tech.name) ? 'text-white' : 'text-white/40'}`}>
                      {tech.name}
                    </div>
                    {techSearch && tech.name === techSearch && !ALL_TECHS.some(t => t.name === tech.name) && (
                      <span className="text-[8px] font-black uppercase tracking-[0.2em] text-blue-500 mt-0.5">Custom Identity</span>
                    )}
                  </div>
                </div>
                {techStack.some(t => t.name === tech.name) ? (
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </div>
                ) : (
                  techSearch && tech.name === techSearch && !ALL_TECHS.some(t => t.name === tech.name) && (
                    <div className="w-8 h-8 rounded-lg glass flex items-center justify-center text-blue-500 animate-pulse">
                      <FaPlus size={10} />
                    </div>
                  )
                )}
              </div>
            ))}
          </div>

          <button
            onClick={() => setTechModalOpen(false)}
            className="w-full mt-10 py-5 bg-white text-black font-black rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-xl"
          >
            Done
          </button>
        </motion.div>
      </motion.div>
    </Portal>
  );
};

export default TechStackModal;
