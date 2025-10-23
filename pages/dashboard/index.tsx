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
  SiFacebook,
  SiJavascript,
  SiAngular,
  SiNodedotjs,
  SiExpress,
  SiHono
} from "react-icons/si";

const DashboardPage = () => {
  const [cards, setCards] = useState([
    { id: "profile", content: "Profile" },
    { id: "techstack", content: "Tech Stack" },
    { id: "socials", content: "Socials" },
    { id: "github", content: "GitHub" },
  ]);

  const [profile, setProfile] = useState({
    name: "Your name",
    profession: "Your profession",
    description: "Your description",
    image: "",
  });

  const [githubUsername, setGithubUsername] = useState("");

  const [techStack, setTechStack] = useState([
    { name: "React", icon: <FaReact /> },
    { name: "Next.js", icon: <SiNextdotjs /> },
    { name: "TypeScript", icon: <SiTypescript /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss /> },
    { name: "Supabase", icon: <SiSupabase /> },
  ]);

  const [socials, setSocials] = useState([
    { name: "Twitter", icon: <FaTwitter />, href: "#" },
    { name: "GitHub", icon: <FaGithub />, href: "#" },
    { name: "LinkedIn", icon: <FaLinkedin />, href: "#" },
  ]);

  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isTechModalOpen, setTechModalOpen] = useState(false);
  const [isSocialModalOpen, setSocialModalOpen] = useState(false);
  const [isGithubModalOpen, setGithubModalOpen] = useState(false);

  const [newTech, setNewTech] = useState({ name: "", icon: "" });
  const [newSocial, setNewSocial] = useState({ name: "", href: "", icon: "" });

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(cards);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setCards(items);
  };

  const stackIconOptions: { [key: string]: React.ReactElement } = {
    React: <FaReact />,
    "Next.js": <SiNextdotjs />,
    TypeScript: <SiTypescript />,
    "Tailwind CSS": <SiTailwindcss />,
    Supabase: <SiSupabase />,
    JavaScript: <SiJavascript />,
    Angular: <SiAngular />,
    "Node.js": <SiNodedotjs />,
    Express: <SiExpress />,
    Hono: <SiHono />,
  };

  const socialIconOptions: { [key: string]: React.ReactElement } = {
    Twitter: <FaTwitter />,
    GitHub: <FaGithub />,
    LinkedIn: <FaLinkedin />,
    Facebook: <SiFacebook />,
  };

  const handleAddTech = () => {
    if (newTech.name && newTech.icon) {
      setTechStack([...techStack, { name: newTech.name, icon: stackIconOptions[newTech.icon] }]);
      setNewTech({ name: "", icon: "" });
      setTechModalOpen(false);
    }
  };

  const handleAddSocial = () => {
    if (newSocial.name && newSocial.href && newSocial.icon) {
      setSocials([...socials, { name: newSocial.name, href: newSocial.href, icon: socialIconOptions[newSocial.icon] }]);
      setNewSocial({ name: "", href: "", icon: "" });
      setSocialModalOpen(false);
    }
  };

  const handleSetGithubUsername = () => {
    setGithubModalOpen(false);
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          setProfile({ ...profile, image: event.target.result as string });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <DashboardLayout>
      <div className={`font-sans border-1 p-5 rounded-3xl min-h-screen border-gray-200`}>
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
                        <div className="w-20 h-20 rounded-full bg-blue-400 flex items-center justify-center">
                          {profile.image ? (
                            <Image
                              src={profile.image}
                              alt="Profile"
                              width={80}
                              height={80}
                              className="w-20 h-20 rounded-full object-cover"
                            />
                          ) : (
                            <FaPlus className="text-white " />
                          )}
                        </div>
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
                      <div className="flex justify-center text-center items-center">
                        <h3 className="text-xl text-center font-bold text-gray-600 mb-4">
                          Add your tech stack
                        </h3>
                       
                      </div>
                    );
                    onEditClick = () => setTechModalOpen(true);
                  } else if (card.id === "socials") {
                    content = (
                      <div className="flex justify-center text-center items-center">
                        <h3 className="text-xl text-center font-bold text-gray-600 mb-4">
                         Add your social links
                        </h3>
                        
                      </div>
                    );
                    onEditClick = () => setSocialModalOpen(true);
                  } else if (card.id === "github") {
                    content = (
                      <div className="flex flex-col justify-center text-center items-center">
                        <h3 className="text-xl text-center font-bold text-gray-600 mb-4">
                          GitHub Contribution Graph
                        </h3>
                        <img
                         src={`https://ghchart.rshah.org/${githubUsername}`}
                         alt="GitHub Chart"
                         className="w-full h-auto max-h-[250px] object-contain rounded-lg"
                         onError={(e) => {
                          e.currentTarget.alt = "";
                         }}
                       />

                      </div>
                    );
                    onEditClick = () => setGithubModalOpen(true);
                  }

                  return (
                    <Draggable key={card.id} draggableId={card.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          onClick={onEditClick}
                          className={`relative group transition-transform duration-300 ease-in-out hover:-rotate-1 focus:-rotate-1 rounded-2xl overflow-hidden ${
                            snapshot.isDragging
                              ? "rotate-1 scale-105 shadow-md"
                              : ""
                          }`}
                        >
                          <div className="relative bg-white rounded-2xl p-6 shadow-xl border border-gray-200 w-full h-full">
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
              <div className="flex flex-col items-center mb-5">
                <div className="w-24 h-24 rounded-full bg-blue-400 flex items-center justify-center mb-4">
                  {profile.image ? (
                    <Image
                      src={profile.image}
                      alt="Profile Preview"
                      width={96}
                      height={96}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  ) : (
                    <FaPlus className="text-white" />
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfileImageChange}
                  className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
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

        {/* GitHub Modal */}
        {isGithubModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md m-4">
              <input
                type="text"
                value={githubUsername}
                onChange={(e) => setGithubUsername(e.target.value)}
                className="flex-1 p-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black placeholder-gray-500 w-full"
                placeholder="Enter your GitHub username"
              />
              <div className="flex justify-end space-x-4 mt-5">
                <button
                  onClick={() => setGithubModalOpen(false)}
                  className="px-6 py-4 w-[200px] cursor-pointer bg-gray-100 text-center text-gray-800 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSetGithubUsername}
                  className="px-6 py-4 w-[200px] cursor-pointer bg-blue-400 text-white rounded-xl hover:bg-blue-500 transition-colors shadow-md"
                >
                  Set
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
                <label className="block text-gray-800 text-sm font-bold mb-2">Or click on an icon:</label>
                <div className="flex flex-wrap gap-3">
                  {Object.keys(stackIconOptions).map(iconKey => (
                    <button 
                      key={iconKey} 
                      onClick={() => setNewTech({ ...newTech, icon: iconKey })} 
                      className={`p-4 text-2xl text-black rounded-lg border-2 ${newTech.icon === iconKey ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-gray-50'} transition-all`}
                    >
                      {stackIconOptions[iconKey]}
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
                <label className="block text-gray-800 text-sm font-bold mb-2">Or click on an Icon:</label>
                <div className="flex flex-wrap gap-3">
                  {Object.keys(socialIconOptions).map(iconKey => (
                    <button 
                      key={iconKey} 
                      onClick={() => setNewSocial({ ...newSocial, icon: iconKey })} 
                      className={`p-4 text-2xl text-black rounded-lg border-2 ${newSocial.icon === iconKey ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-gray-50'} transition-all`}
                    >
                      {socialIconOptions[iconKey]}
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