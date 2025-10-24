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
  FaTimes,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiSupabase,
  SiJavascript,
  SiAngular,
  SiNodedotjs,
  SiExpress,
  SiHono
} from "react-icons/si";

const allTechs = [
  { name: "React", icon: <FaReact /> },
  { name: "Next.js", icon: <SiNextdotjs /> },
  { name: "TypeScript", icon: <SiTypescript /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss /> },
  { name: "Supabase", icon: <SiSupabase /> },
  { name: "JavaScript", icon: <SiJavascript /> },
  { name: "Angular", icon: <SiAngular /> },
  { name: "Node.js", icon: <SiNodedotjs /> },
  { name: "Express", icon: <SiExpress /> },
  { name: "Hono", icon: <SiHono /> },
];

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

  type Tech = {
  name: string;
  icon: React.JSX.Element;
};


  const [githubUsername, setGithubUsername] = useState("");

  const [techStack, setTechStack] = useState<Tech[]>([]);

  const [socials, setSocials] = useState([
    { name: "Twitter", icon: <FaTwitter />, href: "https://twitter.com/" },
    { name: "GitHub", icon: <FaGithub />, href: "https://github.com/" },
    { name: "LinkedIn", icon: <FaLinkedin />, href: "https://linkedin.com/in/" },
  ]);

  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isTechModalOpen, setTechModalOpen] = useState(false);
  const [isSocialModalOpen, setSocialModalOpen] = useState(false);
  const [isGithubModalOpen, setGithubModalOpen] = useState(false);

  const [techSearch, setTechSearch] = useState("");

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(cards);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setCards(items);
  };

  const handleTechToggle = (tech: Tech) => {
    if (techStack.find((t) => t.name === tech.name)) {
      setTechStack(techStack.filter((t) => t.name !== tech.name));
    } else {
      setTechStack([...techStack, tech]);
    }
  };

  const handleSocialChange = (name: string, href: string) => {
    setSocials(
      socials.map((social) =>
        social.name === name ? { ...social, href } : social
      )
    );
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

  const filteredTechs = allTechs.filter((tech) =>
    tech.name.toLowerCase().includes(techSearch.toLowerCase())
  );

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
                      <div className="flex flex-col">
                        <h3 className="text-xl text-center font-bold text-gray-600">
                               Add your tech stack
                        </h3>
                      <div className="flex flex-wrap justify-center items-center">
                         
                        {techStack.map((tech) => (
                          <div key={tech.name} className="m-1 p-2 bg-gray-100 text-gray-800 rounded-2xl border border-gray-200">
                           
                            {tech.name}
                          </div>
                        ))}
                      </div>
                      </div>
                    );
                    onEditClick = () => setTechModalOpen(true);
                  } else if (card.id === "socials") {
                    content = (
                      <div className="flex justify-center items-center">
                        {socials.map((social) => (
                          <a key={social.name} href={social.href} className="m-2 text-2xl text-gray-600 hover:text-blue-400">
                            {social.icon}
                          </a>
                        ))}
                      </div>
                    );
                    onEditClick = () => setSocialModalOpen(true);
                  } else if (card.id === "github") {
                    content = (
                      <div className="flex flex-col justify-center text-center items-center">
                        <h3 className="text-xl text-center font-bold text-gray-600">
                          GitHub Contribution Graph
                        </h3>
                        {githubUsername && (
                          <img
                           src={`https://ghchart.rshah.org/${githubUsername}`}
                           alt="GitHub Chart"
                           className="w-full h-auto max-h-[250px] object-contain rounded-lg"
                         />
                        )}

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
              <button onClick={() => setTechModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                <FaTimes />
              </button>
              <div className="flex flex-wrap gap-2 mb-4">
                {techStack.map((tech) => (
                  <div key={tech.name} className="flex items-center bg-gray-100 text-gray-800 rounded-full px-3 py-1 border border-gray-200">
                    {tech.name}
                    <button onClick={() => handleTechToggle(tech)} className="ml-2 text-gray-400 hover:text-gray-600">x</button>
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
                  <div key={tech.name} onClick={() => handleTechToggle(tech)} className="flex items-center p-2 hover:bg-gray-100 cursor-pointer rounded-lg">
                    <div className="mr-2 text-gray-800">{tech.icon}</div>
                    <div className="text-gray-800">{tech.name}</div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end space-x-4 mt-5">
                <button
                  onClick={() => setTechModalOpen(false)}
                  className="px-6 py-4 w-full cursor-pointer bg-gray-100 text-center text-gray-800 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setTechModalOpen(false)}
                  className="px-6 py-4 w-full cursor-pointer bg-blue-400 text-white rounded-xl hover:bg-blue-500 transition-colors shadow-md"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Social Links Modal */}
        {isSocialModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md m-4 relative">
              <button onClick={() => setSocialModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                <FaTimes />
              </button>
              {socials.map((social) => (
                <div key={social.name} className="flex items-center mb-4">
                  <div className="text-2xl mr-4 text-gray-800">{social.icon}</div>
                  <input
                    type="text"
                    value={social.href}
                    onChange={(e) => handleSocialChange(social.name, e.target.value)}
                    className="flex-1 p-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black placeholder-gray-500 w-full"
                    placeholder={`Enter your ${social.name} handle`}
                  />
                </div>
              ))}
              <div className="flex justify-end space-x-4 mt-5">
                <button
                  onClick={() => setSocialModalOpen(false)}
                  className="px-6 py-4 w-full cursor-pointer bg-gray-100 text-center text-gray-800 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setSocialModalOpen(false)}
                  className="px-6 py-4 w-full cursor-pointer bg-blue-400 text-white rounded-xl hover:bg-blue-500 transition-colors shadow-md"
                >
                  Done
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