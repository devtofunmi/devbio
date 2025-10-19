
import React, { useState } from 'react';
import { FaEdit, FaReact, FaPlus } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiSupabase } from 'react-icons/si';

const allTech = [
  { name: 'React', icon: <FaReact /> },
  { name: 'Next.js', icon: <SiNextdotjs /> },
  { name: 'TypeScript', icon: <SiTypescript /> },
  { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
  { name: 'Supabase', icon: <SiSupabase /> },
];

const TechStackCard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [techStack, setTechStack] = useState<any[]>([]);
  const [showTechIcons, setShowTechIcons] = useState(true);

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleSave = () => {
    setIsModalOpen(false);
  };

  const toggleTech = (tech: any) => {
    setTechStack(prev => 
      prev.find(t => t.name === tech.name) 
        ? prev.filter(t => t.name !== tech.name) 
        : [...prev, tech]
    );
  };

  return (
    <div className="relative group transition-transform duration-300 ease-in-out hover:-rotate-1 focus:-rotate-1 rounded-2xl overflow-hidden">
      <div className="relative bg-white rounded-2xl p-6 shadow-xl group-hover:shadow-none transition-shadow border border-gray-200 w-full h-full">
        {techStack.length === 0 ? (
          <div className="text-center cursor-pointer flex flex-col items-center justify-center h-full" onClick={handleEdit}>
            <FaPlus className="text-4xl text-gray-400 mb-2" />
            <h3 className="text-lg font-bold text-gray-800">Add your tech stack</h3>
          </div>
        ) : (
          <div className="text-center">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Tech Stack</h3>
            <div className="flex flex-wrap gap-4 justify-center">
              {techStack.map((tech) => (
                <div key={tech.name} className="flex flex-col items-center">
                  {showTechIcons ? <span className="text-4xl">{tech.icon}</span> : <span className="text-sm font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-600">{tech.name}</span>}
                </div>
              ))}
            </div>
          </div>
        )}
        <button onClick={handleEdit} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <FaEdit />
        </button>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300"></div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6">Edit Tech Stack</h2>
            <div className="flex items-center mb-4">
              <input type="checkbox" checked={showTechIcons} onChange={() => setShowTechIcons(!showTechIcons)} className="mr-2" />
              <label>Show as icons</label>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {allTech.map(tech => (
                <div 
                  key={tech.name} 
                  onClick={() => toggleTech(tech)} 
                  className={`cursor-pointer p-4 border rounded-lg flex flex-col items-center justify-center ${techStack.find(t => t.name === tech.name) ? 'border-blue-500' : 'border-gray-300'}`}>
                  <span className="text-3xl mb-2">{tech.icon}</span>
                  <span className="text-sm">{tech.name}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end">
              <button onClick={handleSave} className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TechStackCard;
