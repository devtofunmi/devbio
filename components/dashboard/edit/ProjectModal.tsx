import React, { useState } from "react";
import { FaTimes, FaPlus, FaRocket } from "react-icons/fa";
import { motion } from "framer-motion";

type Project = {
  title: string;
  description: string;
  url: string;
  image?: string;
  tech: string[];
};

type ProjectModalProps = {
  projects: Project[];
  onClose: () => void;
  onSave: (projects: Project[]) => void;
};

const ProjectModal: React.FC<ProjectModalProps> = ({
  projects,
  onClose,
  onSave,
}) => {
  const [editedProjects, setEditedProjects] = useState<Project[]>(projects);

  const handleProjectChange = (
    index: number,
    field: keyof Project,
    value: string | string[]
  ) => {
    const newProjects = [...editedProjects];
    if (field === "tech") {
      newProjects[index] = {
        ...newProjects[index],
        [field]: Array.isArray(value) ? value : value.split(",").map((s) => s.trim()),
      };
    } else {
      newProjects[index] = { ...newProjects[index], [field]: value };
    }
    setEditedProjects(newProjects);
  };

  const addProject = () => {
    // Force a new array reference to ensure re-render
    setEditedProjects(prev => [
      ...prev,
      { title: "", description: "", url: "", image: "", tech: [] },
    ]);
  };

  const removeProject = (index: number) => {
    const newProjects = [...editedProjects];
    newProjects.splice(index, 1);
    setEditedProjects(newProjects);
  };

  return (
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
        className="glass-card rounded-[2.5rem] border-white/10 p-10 w-full max-w-2xl relative shadow-2xl flex flex-col max-h-[90vh]"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 glass rounded-full flex items-center justify-center text-white/40 hover:text-white transition-all cursor-pointer z-10"
        >
          <FaTimes size={16} />
        </button>

        <div className="mb-8 shrink-0">
          <h2 className="text-3xl font-black text-white tracking-tighter text-gradient">Your Projects</h2>
          <p className="text-white/40 text-sm font-medium uppercase tracking-widest mt-1">Showcase your engineering work</p>
        </div>

        <div className="flex-1 overflow-y-auto pr-4 space-y-6 custom-scrollbar px-1">
          {editedProjects.map((project, index) => (
            <motion.div
              layout
              key={index}
              className="p-8 glass rounded-[2rem] border border-white/5 relative group"
            >
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400/60">Project {index + 1}</span>
                <button
                  onClick={() => removeProject(index)}
                  className="w-8 h-8 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-red-500 hover:text-white"
                >
                  <FaTimes size={12} />
                </button>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) => handleProjectChange(index, "title", e.target.value)}
                  placeholder="Project Title"
                  className="w-full p-4 glass rounded-xl focus:outline-none border-white/5 text-white font-bold"
                />
                <textarea
                  value={project.description}
                  onChange={(e) => handleProjectChange(index, "description", e.target.value)}
                  placeholder="A brief story of what you built..."
                  className="w-full p-4 glass rounded-xl focus:outline-none border-white/5 text-white/60 font-medium resize-none custom-scrollbar"
                  rows={2}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={project.url}
                    onChange={(e) => handleProjectChange(index, "url", e.target.value)}
                    placeholder="Live URL"
                    className="w-full p-4 glass rounded-xl focus:outline-none border-white/5 text-blue-400 font-medium text-sm truncate"
                  />
                  <input
                    type="text"
                    value={project.image || ""}
                    onChange={(e) => handleProjectChange(index, "image", e.target.value)}
                    placeholder="Image URL (e.g. Unsplash)"
                    className="w-full p-4 glass rounded-xl focus:outline-none border-white/5 text-white/40 font-medium text-sm truncate"
                  />
                </div>
                <input
                  type="text"
                  value={project.tech.join(", ")}
                  onChange={(e) => handleProjectChange(index, "tech", e.target.value)}
                  placeholder="Tech stack (csv)"
                  className="w-full p-4 glass rounded-xl focus:outline-none border-white/5 text-white/40 font-medium text-sm truncate"
                />
              </div>
            </motion.div>
          ))}

          {editedProjects.length === 0 && (
            <div className="text-center py-20 bg-white/5 rounded-[2rem] border border-dashed border-white/10">
              <p className="text-white/20 font-bold">No projects added yet.</p>
            </div>
          )}
        </div>

        <div className="mt-8 flex gap-4 shrink-0">
          <button
            onClick={addProject}
            className="flex-1 py-5 glass border-dashed border-white/10 text-white/40 hover:text-white hover:border-white/30 rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer font-bold"
          >
            <FaPlus size={14} /> Add Project
          </button>
          <button
            onClick={() => onSave(editedProjects)}
            className="flex-1 py-5 bg-white text-black font-black rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-xl flex items-center justify-center gap-2"
          >
            <FaRocket size={14} /> Save Projects
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectModal;
