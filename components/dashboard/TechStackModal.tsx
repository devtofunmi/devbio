
import React from "react";
import { FaTimes } from "react-icons/fa";

type Tech = {
  name: string;
  icon: React.JSX.Element;
};

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
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md m-4">
        <button
          onClick={() => setTechModalOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <FaTimes />
        </button>
        <div className="flex flex-wrap gap-2 mb-4">
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className="flex items-center bg-gray-100 text-gray-800 rounded-full px-3 py-1 border border-gray-200"
            >
              {tech.name}
              <button
                onClick={() => handleTechToggle(tech)}
                className="ml-2 text-gray-400 hover:text-gray-600"
              >
                x
              </button>
            </div>
          ))}
        </div>
        <input
          type="text"
          value={techSearch}
          onChange={(e) => setTechSearch(e.target.value)}
          className="flex-1 p-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black placeholder-gray-500 w-full"
          placeholder="Search for a tech stack..."
        />
        <div className="mt-4 max-h-40 overflow-y-auto">
          {filteredTechs.map((tech) => (
            <div
              key={tech.name}
              onClick={() => handleTechToggle(tech)}
              className="flex items-center p-2 hover:bg-gray-100 cursor-pointer rounded-lg"
            >
              <div className="mr-2 text-gray-800">{tech.icon}</div>
              <div className="text-gray-800">{tech.name}</div>
            </div>
          ))}
        </div>
        <div className="flex justify-end space-x-4 mt-5">
          <button
            onClick={() => setTechModalOpen(false)}
            className="px-6 py-4 w-full cursor-pointer bg-gray-100 text-center text-gray-800 rounded-full hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => setTechModalOpen(false)}
            className="px-6 py-4 w-full cursor-pointer bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors shadow-md"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default TechStackModal;
