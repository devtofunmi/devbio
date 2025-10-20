import React, { useState } from "react";
import Image from "next/image";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import {
  FaReact,
  FaTwitter,
  FaGithub,
  FaLinkedin,
  FaPlus,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiSupabase,
} from "react-icons/si";
import { RiEditCircleLine } from "react-icons/ri";

const geistSans = { className: "font-sans" };
const geistMono = { className: "font-mono" };

interface Tech {
  name: string;
  icon: React.ReactElement;
}

interface SocialLink {
  name: string;
  icon: React.ReactElement;
  href: string;
}

const iconOptions: { [key: string]: React.ReactElement } = {
  FaReact: <FaReact />,
  SiNextdotjs: <SiNextdotjs />,
  SiTypescript: <SiTypescript />,
  SiTailwindcss: <SiTailwindcss />,
  SiSupabase: <SiSupabase />,
  FaTwitter: <FaTwitter />,
  FaGithub: <FaGithub />,
  FaLinkedin: <FaLinkedin />,
};

const DashboardPage: React.FC = () => {
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isTechModalOpen, setTechModalOpen] = useState(false);
  const [isSocialModalOpen, setSocialModalOpen] = useState(false);

  const [profile, setProfile] = useState({
    name: "Your Name",
    profession: "Your Profession",
    description:
      "Your description",
  });

  const [techStack, setTechStack] = useState<Tech[]>([
    { name: "React", icon: <FaReact /> },
    { name: "Next.js", icon: <SiNextdotjs /> },
    { name: "TypeScript", icon: <SiTypescript /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss /> },
    { name: "Supabase", icon: <SiSupabase /> },
  ]);

  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    { name: "Twitter", icon: <FaTwitter />, href: "https://twitter.com/" },
    { name: "GitHub", icon: <FaGithub />, href: "https://github.com/" },
    { name: "LinkedIn", icon: <FaLinkedin />, href: "https://linkedin.com/" },
  ]);

  const [newTech, setNewTech] = useState({ name: "", icon: "FaReact" });
  const [newSocial, setNewSocial] = useState({ name: "", href: "", icon: "FaTwitter" });

  const [cards, setCards] = useState([
    { id: "profile" },
    { id: "techstack" },
    { id: "socials" },
  ]);

  // Handle drag reorder
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reordered = Array.from(cards);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setCards(reordered);
  };

  const handleAddTech = () => {
    if (newTech.name.trim() !== "") {
      setTechStack([...techStack, { name: newTech.name, icon: iconOptions[newTech.icon] }]);
      setNewTech({ name: "", icon: "FaReact" });
      setTechModalOpen(false);
    }
  };

  const handleAddSocial = () => {
    if (newSocial.name.trim() !== "" && newSocial.href.trim() !== "") {
      setSocialLinks([...socialLinks, { ...newSocial, icon: iconOptions[newSocial.icon] }]);
      setNewSocial({ name: "", href: "", icon: "FaTwitter" });
      setSocialModalOpen(false);
    }
  };

  return (
    <DashboardLayout>
      <div className={`${geistSans.className} ${geistMono.className} font-sans`}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="cards">
            {(provided) => (
              <div
                className="space-y-5"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {cards.map((card, index) => {
                  let content: React.ReactElement | undefined;
                  let onEditClick: (() => void) | undefined;

                  if (card.id === "profile") {
                    content = (
                      <div className="flex flex-col items-center text-center space-y-3">
                        <Image
                          src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg"
                          alt="Profile"
                          width={80}
                          height={80}
                          className="w-20 h-20 rounded-full object-cover"
                        />
                        <div>
                          <h2 className="text-xl font-bold text-gray-600">
                            {profile.name}
                          </h2>
                          <p className="text-lg text-gray-600">
                            {profile.profession}
                          </p>
                        </div>
                        <p className="text-gray-600 text-base max-w-sm">
                          {profile.description}
                        </p>
                      </div>
                    );
                    onEditClick = () => setProfileModalOpen(true);
                  } else if (card.id === "techstack") {
                    content = (
                      <div className="text-center">
                        <h3 className="text-xl font-bold text-gray-600 mb-4">
                          Add your tech stack
                        </h3>
                       
                      </div>
                    );
                    onEditClick = () => setTechModalOpen(true);
                  } else if (card.id === "socials") {
                    content = (
                      <div className="text-center">
                        <h3 className="text-xl font-bold text-gray-600 mb-4">
                         Add your social links
                        </h3>
                        
                      </div>
                    );
                    onEditClick = () => setSocialModalOpen(true);
                  }

                  return (
                    <Draggable key={card.id} draggableId={card.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`relative group transition-transform duration-300 ease-in-out hover:-rotate-1 focus:-rotate-1 rounded-2xl overflow-hidden ${
                            snapshot.isDragging
                              ? "rotate-1 scale-105 shadow-2xl"
                              : ""
                          }`}
                        >
                          <div className="relative bg-white rounded-2xl p-6 shadow-xl border border-gray-200 w-full h-full">
                            <button
                              onClick={onEditClick}
                              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                              <RiEditCircleLine />
                            </button>
                            {content}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {/* Profile Modal */}
        {isProfileModalOpen && (
          <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md m-4">
              <input
                type="text"
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
                className="flex-1 p-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black placeholder-gray-500 w-full"
                placeholder="Name"
              />
              <input
                type="text"
                value={profile.profession}
                onChange={(e) =>
                  setProfile({ ...profile, profession: e.target.value })
                }
                className="flex-1 p-3 mt-5 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black placeholder-gray-500 w-full"
                placeholder="Profession"
              />
              <textarea
                value={profile.description}
                onChange={(e) =>
                  setProfile({ ...profile, description: e.target.value })
                }
                className="flex-1 p-3 mt-5 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black placeholder-gray-500 w-full"
                placeholder="Description"
                rows={4}
              />
              <div className="flex mt-5 justify-end space-x-4">
                <button
                  onClick={() => setProfileModalOpen(false)}
                 className="px-6 py-4 w-[200px] cursor-pointer bg-gray-100 text-center text-gray-800 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setProfileModalOpen(false)}
                  className="px-6 py-4 w-[200px] cursor-pointer bg-blue-400 text-white rounded-xl hover:bg-blue-500 transition-colors shadow-md"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tech Stack Modal */}
        {isTechModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md m-4">
              <input
                type="text"
                value={newTech.name}
                onChange={(e) => setNewTech({ ...newTech, name: e.target.value })}
                className="flex-1 p-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black placeholder-gray-500 w-full"
                placeholder="Enter stack name"
              />
              <div className="mb-6 mt-2">
                <label className="block text-gray-800 text-sm font-bold mb-2">Icon</label>
                <div className="flex flex-wrap gap-3">
                  {Object.keys(iconOptions).map(iconKey => (
                    <button 
                      key={iconKey} 
                      onClick={() => setNewTech({ ...newTech, icon: iconKey })} 
                      className={`p-4 text-2xl text-black rounded-lg border-2 ${newTech.icon === iconKey ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-gray-50'} transition-all`}
                    >
                      {iconOptions[iconKey]}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setTechModalOpen(false)}
                   className="px-6 py-4 w-[200px] cursor-pointer bg-gray-100 text-center text-gray-800 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddTech}
                  className="px-6 py-4 w-[200px] cursor-pointer bg-blue-400 flex justify-center text-white rounded-xl hover:bg-blue-500 transition-colors shadow-md  items-center"
                >
                  <FaPlus className="mr-2"/> Add
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Social Links Modal */}
        {isSocialModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md m-4">
              <input
                type="text"
                value={newSocial.name}
                onChange={(e) => setNewSocial({ ...newSocial, name: e.target.value })}
                className="flex-1 p-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black placeholder-gray-500 w-full"
                placeholder="Social media name"
              />
              <input
                type="text"
                value={newSocial.href}
                onChange={(e) => setNewSocial({ ...newSocial, href: e.target.value })}
                className="flex-1 p-3 border border-gray-200 rounded-lg bg-gray-50 mt-5 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black placeholder-gray-500 w-full"
                placeholder="Enter full URL"
              />
              <div className="mb-6 mt-2">
                <label className="block text-gray-800 text-sm font-bold mb-2">Icon</label>
                <div className="flex flex-wrap gap-3">
                  {Object.keys(iconOptions).map(iconKey => (
                    <button 
                      key={iconKey} 
                      onClick={() => setNewSocial({ ...newSocial, icon: iconKey })} 
                      className={`p-4 text-2xl text-black rounded-lg border-2 ${newSocial.icon === iconKey ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-gray-50'} transition-all`}
                    >
                      {iconOptions[iconKey]}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex justify-between space-x-4">
                <button
                  onClick={() => setSocialModalOpen(false)}
                  className="px-6 py-4 w-[200px] cursor-pointer bg-gray-100 text-center text-gray-800 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddSocial}
                  className="px-6 py-4 w-[200px] cursor-pointer bg-blue-400 flex justify-center text-white rounded-xl hover:bg-blue-500 transition-colors shadow-md  items-center"
                >
                  <FaPlus className="mr-2"/> Add
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
