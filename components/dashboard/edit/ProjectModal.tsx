import React, { useState, useEffect } from "react";
import { FaTimes, FaRocket, FaCamera, FaSpinner, FaGlobe, FaMagic } from "react-icons/fa";
import { motion } from "framer-motion";
import NextImage from "next/image";
import { toast } from 'react-toastify';
import { useAuth } from '../../../lib/AuthContext';
import Portal from "@/components/Portal";

type Project = {
  id?: string;
  title: string;
  description: string;
  url: string;
  tech: string[];
  image?: string;
  sort_order?: number;
};

type ProjectModalProps = {
  existingProject?: Project;
  onClose: () => void;
  onSave: (project: Project) => void;
};

const ProjectModal: React.FC<ProjectModalProps> = ({
  existingProject,
  onClose,
  onSave,
}) => {
  const { user, supabase } = useAuth();

  const [projectData, setProjectData] = useState<Project>(existingProject || {
    title: "",
    description: "",
    url: "",
    tech: [],
    image: ""
  });

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `project-${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      setProjectData(prev => ({ ...prev, image: publicUrl }));
      toast.success("Logo uploaded!");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      toast.error("Upload failed: " + message);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    if (!projectData.title.trim()) {
      toast.error("Project title is required");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        user_id: user.id,
        title: projectData.title,
        description: projectData.description,
        url: projectData.url,
        image_url: projectData.image,
        tech_tags: projectData.tech
      };

      let savedProject: Project;

      if (projectData.id) {
        // Update
        const { data, error } = await supabase
          .from('projects')
          .update(payload)
          .eq('id', projectData.id)
          .select()
          .single();

        if (error) throw error;
        savedProject = { ...data, tech: data.tech_tags, image: data.image_url };
        toast.success("Project updated!");
      } else {
        // Insert
        const { data, error } = await supabase
          .from('projects')
          .insert(payload)
          .select()
          .single();

        if (error) throw error;
        savedProject = { ...data, tech: data.tech_tags, image: data.image_url };
        toast.success("Project added!");
      }

      onSave(savedProject);
    } catch (error: unknown) {
      console.error(error);
      toast.error("Failed to save project");
    } finally {
      setSaving(false);
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
          className="glass-card rounded-[2.5rem] border-white/10 p-10 w-full max-w-xl relative shadow-2xl flex flex-col"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 glass rounded-full flex items-center justify-center text-white/40 hover:text-white transition-all cursor-pointer z-10"
          >
            <FaTimes size={16} />
          </button>

          <div className="mb-8 shrink-0">
            <h2 className="text-3xl font-black text-white tracking-tighter text-gradient">
              {existingProject ? 'Edit Project' : 'New Project'}
            </h2>
            <p className="text-white/40 text-sm font-medium uppercase tracking-widest mt-1">
              {existingProject ? 'Update your masterpiece' : 'Showcase your engineering work'}
            </p>
          </div>

          <div className="space-y-6">
            <div className={`p-3 rounded-[2rem] border border-white/5 relative group transition-all ${saving ? 'opacity-50 pointer-events-none' : ''}`}>
              <div className="space-y-4">
                <input
                  type="text"
                  value={projectData.title}
                  onChange={(e) => setProjectData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Project Title"
                  className="w-full p-4 glass rounded-xl focus:outline-none border-white/5 text-white font-bold"
                />
                <textarea
                  value={projectData.description}
                  onChange={(e) => setProjectData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="A brief story of what you built..."
                  className="w-full p-4 glass rounded-xl focus:outline-none border-white/5 text-white/60 font-medium resize-none custom-scrollbar"
                  rows={3}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={projectData.url}
                      onChange={(e) => setProjectData(prev => ({ ...prev, url: e.target.value }))}
                      placeholder="https://example.com"
                      className="w-full p-4 pr-28 glass rounded-xl focus:outline-none border-white/5 text-blue-400 font-medium text-sm truncate"
                    />
                    {projectData.url && (
                      <button
                        onClick={() => {
                          try {
                            const domain = new URL(projectData.url).hostname;
                            const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
                            setProjectData(prev => ({ ...prev, image: faviconUrl }));
                            toast.success("Favicon fetched!");
                          } catch {
                            toast.error("Invalid URL");
                          }
                        }}
                        className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white/60 hover:text-white transition-all px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2"
                        title="Auto-fetch logo from URL"
                      >
                        <FaMagic /> Fetch
                      </button>
                    )}
                  </div>

                  <div className="relative group/image">
                    <div className="flex items-center gap-2 w-full p-4 glass rounded-xl border-white/5 text-white/40 font-medium text-sm overflow-hidden h-[56px]">
                      {projectData.image ? (
                        <NextImage src={projectData.image} alt="Logo" width={24} height={24} className="rounded object-cover" unoptimized />
                      ) : (
                        <FaCamera className="text-white/20" />
                      )}
                      <span className="truncate flex-1">{projectData.image ? 'Logo set' : 'Upload Logo'}</span>
                      {uploading && <FaSpinner className="animate-spin text-blue-500" />}
                      {projectData.image && (
                        <button
                          onClick={(e) => { e.stopPropagation(); setProjectData(prev => ({ ...prev, image: "" })); }}
                          className="text-white/20 hover:text-red-500 transition-colors bg-white/5 p-1 rounded-full z-20"
                          title="Remove Logo"
                        >
                          <FaTimes size={10} />
                        </button>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      disabled={uploading}
                    />
                  </div>
                </div>
                <input
                  type="text"
                  value={projectData.tech.join(", ")}
                  onChange={(e) => setProjectData(prev => ({ ...prev, tech: e.target.value.split(',').map(t => t.trim()) }))}
                  placeholder="Tech stack (e.g. React, Next.js)"
                  className="w-full p-4 glass rounded-xl focus:outline-none border-white/5 text-white/40 font-medium text-sm truncate"
                />
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full py-5 bg-white text-black font-black rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-xl flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait"
            >
              {saving ? <FaSpinner className="animate-spin" /> : <FaRocket size={14} />}
              {saving ? "Saving..." : (existingProject ? "Update Project" : "Launch Project")}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </Portal>
  );
};

export default ProjectModal;