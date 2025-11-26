import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

type Project = {
  title: string;
  description: string;
  url: string;
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
  const [editedProjects, setEditedProjects] = useState(projects);

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
    setEditedProjects([
      ...editedProjects,
      { title: "", description: "", url: "", tech: [] },
    ]);
  };

  const removeProject = (index: number) => {
    const newProjects = [...editedProjects];
    newProjects.splice(index, 1);
    setEditedProjects(newProjects);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl m-4">
        <div className="max-h-96 overflow-y-auto">
          {editedProjects.map((project, index) => (
            <div key={index} className="mb-4 p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">Project {index + 1}</h3>
                <button
                  onClick={() => removeProject(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTimes />
                </button>
              </div>
              <input
                type="text"
                value={project.title}
                onChange={(e) =>
                  handleProjectChange(index, "title", e.target.value)
                }
                placeholder="Title"
                className="flex-1 p-3 mb-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black placeholder-gray-500 w-full"
              />
              <textarea
                value={project.description}
                onChange={(e) =>
                  handleProjectChange(index, "description", e.target.value)
                }
                placeholder="Description"
                className="flex-1 p-3 mb-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black placeholder-gray-500 w-full"
                rows={3}
              />
              <input
                type="text"
                value={project.url}
                onChange={(e) =>
                  handleProjectChange(index, "url", e.target.value)
                }
                placeholder="URL"
                className="flex-1 p-3 mb-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black placeholder-gray-500 w-full"
              />
              <input
                type="text"
                value={project.tech.join(", ")}
                onChange={(e) =>
                  handleProjectChange(index, "tech", e.target.value)
                }
                placeholder="Tech stack (comma separated)"
                className="flex-1 p-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black placeholder-gray-500 w-full"
              />
            </div>
          ))}
        </div>
        <button
          onClick={addProject}
          className="w-full mt-4 px-6 py-3 bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition-colors"
        >
          Add Project
        </button>
        <div className="flex mt-5 justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-6 py-4 w-[200px] cursor-pointer bg-gray-100 text-center text-gray-800 rounded-full hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(editedProjects)}
            className="px-6 py-4 w-[200px] cursor-pointer bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors shadow-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
