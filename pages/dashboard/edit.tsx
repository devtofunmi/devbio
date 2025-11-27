// Import necessary dependencies from React and Next.js
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
// Import icons from react-icons library
import {
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaReact,
  FaArrowLeft,
  FaSave,
  FaCode,
  FaProjectDiagram,
  FaInfoCircle,
  FaTrash,
  FaLink,
} from "react-icons/fa";
import { LuUpload } from "react-icons/lu";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiSupabase,
  SiJavascript,
  SiAngular,
  SiNodedotjs,
  SiExpress,
  SiHono,
} from "react-icons/si";
// Import Drag and Drop components
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

// Import local utilities and components
import { getUserByUsername, User } from "../../lib/mockUsers";
import SocialModal from "../../components/dashboard/edit/SocialModal";
import TechStackModal from "../../components/dashboard/edit/TechStackModal";
import ProjectModal from "../../components/dashboard/edit/ProjectModal";
import GitHubModal from "../../components/dashboard/edit/GitHubModal";
import InlineEdit from "../../components/dashboard/edit/InlineEdit";

// A static list of all available technologies for the Tech Stack section
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

/**
 * The main component for the user's profile edit page.
 * It allows users to edit their profile information, manage content cards,
 * and customize the layout of their public profile.
 */
const EditPage: React.FC = () => {
  // #region State Management
  // Holds all user data. Null until fetched.
  const [user, setUser] = useState<User | null>(null);
  
  // State for controlling the visibility of various modals
  const [isSocialModalOpen, setSocialModalOpen] = useState(false);
  const [isTechStackModalOpen, setTechStackModalOpen] = useState(false);
  const [isProjectModalOpen, setProjectModalOpen] = useState(false);
  const [isGithubModalOpen, setGithubModalOpen] = useState(false);

  // Ref for the hidden file input to trigger image uploads
  const imageUploadRef = useRef<HTMLInputElement>(null);

  // State for the draggable cards that represent sections of the user's profile
  const [cards, setCards] = useState([
    { id: "about", content: "About" },
    { id: "techstack", content: "Tech Stack" },
    { id: "projects", content: "Projects" },
    { id: "github", content: "GitHub" },
  ]);
  // State for the tech stack search functionality
  const [techSearch, setTechSearch] = useState("");
  // State for the GitHub username input
  const [githubUsername, setGithubUsername] = useState("");
  // #endregion

  // #region Data Fetching and Initialization
  useEffect(() => {
    // This mocks fetching user data. In a real application, this would be an API call.
    const mockUser = getUserByUsername("bob");
    if (mockUser) {
      setUser({
        ...mockUser,
        headings: {
          about: "About",
          techstack: "Tech Stack",
          projects: "Projects",
          ...(mockUser.headings || {}),
        },
      });
      setGithubUsername(mockUser?.socials?.github || "");
    }
  }, []);
  // #endregion

  // #region Event Handlers
  /**
   * Handles the end of a drag-and-drop operation to reorder the cards.
   * @param {DropResult} result - The object containing information about the drag operation.
   */
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return; // Dropped outside the list

    const items = Array.from(cards);
    const [reorderedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderedItem);

    setCards(items); // Update the card order in state
  };

  /**
   * Adds or removes a technology from the user's tech stack.
   * @param tech - The technology object to toggle.
   */
  const handleTechToggle = (tech: { name: string; icon: React.ReactNode }) => {
    if (!user) return;
    const techName = tech.name;
    const currentTechStack = user.techStack || [];
    if (currentTechStack.includes(techName)) {
      setUser({ ...user, techStack: currentTechStack.filter((t) => t !== techName) });
    } else {
      setUser({ ...user, techStack: [...currentTechStack, techName] });
    }
  };
  
  /**
   * Updates a user's social media link.
   * @param name - The name of the social media platform (e.g., 'twitter').
   * @param href - The new URL for the profile.
   */
  const handleSocialChange = (name: string, href: string) => {
    if (!user) return;
    setUser({ ...user, socials: { ...user.socials, [name.toLowerCase()]: href } });
  };
  
  /**
   * Saves the GitHub username to the user's state.
   */
  const handleSetGithubUsername = () => {
    setGithubModalOpen(false);
  };
  
  /**
   * A generic handler to update a top-level field in the user's profile.
   * @param field - The key of the user property to update.
   * @param value - The new value.
   */
  const handleProfileUpdate = (field: keyof User, value: string) => {
    if (!user) return;
    setUser({ ...user, [field]: value });
  };

  /**
   * Updates the heading for a specific card section.
   * @param field - The key of the heading to update (e.g., 'about', 'projects').
   * @param value - The new heading text.
   */
  const handleHeadingUpdate = (field: string, value: string) => {
    if (!user) return;
    setUser({ ...user, headings: { ...user.headings, [field]: value } });
  };
  
  /**
   * Adds the "About" card to the page if it's currently not present.
   */
  const handleAddAbout = () => {
    if (user && !user.about) {
      setUser({ ...user, about: "Tell everyone about yourself." });
    }
  };

  // --- Section Delete Handlers ---
  const handleDeleteAbout = () => user && setUser({ ...user, about: "" });
  const handleDeleteTechStack = () => user && setUser({ ...user, techStack: [] });
  const handleDeleteProjects = () => user && setUser({ ...user, projects: [] });
  const handleDeleteGithub = () => {
    setGithubUsername("");
  };
  // --------------------------------

  /**
   * Handles the image file selection and updates the user's profile image.
   * @param e - The file input change event.
   */
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && user) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUser({ ...user, image: event.target.result as string });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Filters the list of all technologies based on the user's search input.
  const filteredTechs = allTechs.filter((tech) =>
    tech.name.toLowerCase().includes(techSearch.toLowerCase())
  );
  // #endregion

  const geistSans = { className: "font-sans" };

  // Display a loading spinner if user data hasn't been loaded yet.
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-blue-400 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  const mockProjects = user.projects || [];

  // #region Card Rendering Logic
  /**
   * Renders the content for a specific card based on its ID.
   * Returns null if the card has no content, effectively hiding it.
   * @param cardId - The unique identifier for the card (e.g., 'about', 'projects').
   * @returns The JSX element for the card content or null.
   */
  const renderCardContent = (cardId: string) => {
    // The structure for each card includes an editable heading and a delete button.
    switch (cardId) {
      case "about":
        if (!user.about) return null;
        return (
          <div className="w-full p-6 ">
            <div className="flex items-start justify-between gap-2">
              <InlineEdit
                value={user.headings?.about || "About"}
                onSave={(value) => handleHeadingUpdate("about", value)}
                className="text-2xl font-bold text-gray-900 mb-4"
                placeholder="About section title"
                showCursor={true}
              />
              <button onClick={handleDeleteAbout} className="p-1 rounded-full hover:bg-gray-200 cursor-pointer" title="Delete Section">
                <FaTrash size={16} className="text-gray-500 hover:text-red-500" />
              </button>
            </div>
            <InlineEdit as="textarea" value={user.about || ""} onSave={(value) => handleProfileUpdate("about", value)} className="text-lg text-gray-700 mb-6 w-full" placeholder="Tell everyone about yourself" />
          </div>
        );
      case "techstack":
        if (!user.techStack || user.techStack.length === 0) return null;
        return (
          <div className="w-full p-6">
            <div className="flex items-start justify-between gap-2">
              <InlineEdit
                value={user.headings?.techstack || "Tech Stack"}
                onSave={(value) => handleHeadingUpdate("techstack", value)}
                className="text-2xl font-bold text-gray-900 mb-4"
                placeholder="Tech stack section title"
                showCursor={true}
              />
              <button onClick={handleDeleteTechStack} className="p-1 rounded-full hover:bg-gray-200 cursor-pointer" title="Delete Section">
                <FaTrash size={16} className="text-gray-500 hover:text-red-500" />
              </button>
            </div>
            <div className="flex flex-wrap gap-3 mb-8">
              {user.techStack.map((tech) => ( <span key={tech} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"> {tech} </span> ))}
            </div>
          </div>
        );
      case "projects":
        if (!mockProjects || mockProjects.length === 0) return null;
        return (
                    <div className="p-6">
                       <div className="flex items-start justify-between gap-2">
                          <InlineEdit value={user.headings?.projects || "Projects"} onSave={(value) => handleHeadingUpdate("projects", value)} className="text-2xl font-bold text-gray-900 mb-4" placeholder="Projects section title" showCursor={true}/>
                          <button onClick={handleDeleteProjects} className="p-1 rounded-full hover:bg-gray-200 cursor-pointer" title="Delete Section">
                              <FaTrash size={16} className="text-gray-500 hover:text-red-500" />
                          </button>
                      </div>
                      <div className="grid grid-cols-1 gap-6">
                        {mockProjects.map((project) => (
                          <div key={project.url} tabIndex={0} className="relative group transition-transform duration-300 ease-in-out hover:-rotate-2 focus:-rotate-2 rounded-2xl overflow-hidden">
                            <div className="relative bg-white rounded-2xl p-6 border border-gray-200 w-full h-full">
                              <a href={project.url} target="_blank" rel="noreferrer" className="text-xl font-bold text-black hover:underline">{project.title}</a>
                              <p className="text-gray-700 mt-1 mb-2">{project.description}</p>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {project.tech.map((t) => ( <span key={t} className="bg-blue-100 text-blue-400 px-2 py-0.5 rounded text-xs font-medium">{t}</span> ))}
                              </div>
                            </div>
                            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                case "github":
                  if (!githubUsername) return null;
                          return (
                              <div style={{ resize: 'both', overflow: 'auto', border: '1px solid #ddd', padding: '1rem' }}>
                                  <div className="flex items-center justify-end mb-1">
                                      <button onClick={handleDeleteGithub} className="p-1 rounded-full hover:bg-gray-200 cursor-pointer" title="Delete Section" >
                                          <FaTrash size={16} className="text-gray-500 hover:text-red-500" />
                                      </button>
                                  </div>
                                  <img src={`https://ghchart.rshah.org/${githubUsername}`} alt="GitHub Contributions" className="w-full h-auto" />
                              </div>
                          );                default:
                  return null;
              }
            };
            // #endregion
          
            // #region Main Component JSX
            return (
              <div className={`${geistSans.className} min-h-screen bg-gray-50 p-8 sm:p-12 md:p-16 text-gray-800`}>
                <div className="max-w-7xl mx-auto pb-24">
                  <div className="lg:flex lg:gap-8">
                    {/* --- Sidebar --- */}
                    <div className="lg:w-1/3 lg:fixed lg:top-16 lg:h-screen lg:overflow-y-auto">
                      
                      {/* Save and Back buttons are fixed at the top of the sidebar */}
                      <div className="absolute top-5 md:top-0 flex items-center gap-4">
                        <Link href={`/dashboard`} className="p-2 rounded-full text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors" title="Back to dashboard">
                          <FaArrowLeft size={22} />
                        </Link>
                        <button onClick={() => { /* Implement save logic */ }} className="p-2 cursor-pointer rounded-full text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors" title="Save changes">
                          <FaSave size={22} />
                        </button>
                      </div>
          
                      <div className="flex flex-col md:mt-16 mt-20 items-start mb-10 md:mb-0 space-y-4">
                        
                        {/* Hidden file input for image upload */}
                        <input type="file" ref={imageUploadRef} onChange={handleImageUpload} accept="image/*" className="hidden"/>
                        
                        {/* Profile Image with Upload Placeholder */}
                        <div className="relative w-[7rem] h-[7rem] sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-gray-200 cursor-pointer flex items-center justify-center" onClick={() => imageUploadRef.current?.click()}>
                          {user.image ? (
                            <Image src={user.image} alt={user.name} fill className="object-cover" />
                          ) : (
                            <div className="text-center text-gray-500 flex flex-col items-center">
                              <LuUpload size={32} />
                              <span className="mt-2 text-sm font-medium">Add Photo</span>
                            </div>
                          )}
                        </div>
                        
                        {/* User Name and Profession */}
                        <div>
                          <InlineEdit value={user.name} onSave={(value) => handleProfileUpdate("name", value)} className="text-4xl font-extrabold text-gray-900" placeholder="Your Name" showCursor={true} />
                          <InlineEdit value={user.profession} onSave={(value) => handleProfileUpdate("profession", value)} className="text-xl text-gray-600" placeholder="Your Profession" showCursor={true} />
                        </div>
                        
                        {/* Displayed Social Links */}
                        <div className="flex items-center space-x-4 pt-2">
                                              {user.socials?.github && <button onClick={() => setSocialModalOpen(true)} className="text-gray-700 hover:text-black"><FaGithub size={22} /></button>}
                                              {user.socials?.twitter && <a href={`https://twitter.com/${user.socials.twitter}`} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-700"><FaTwitter size={22} /></a>}                            {user.socials?.linkedin && <a href={`https://www.linkedin.com/in/${user.socials.linkedin}`} target="_blank" rel="noreferrer" className="text-blue-700 hover:text-blue-900"><FaLinkedin size={22} /></a>}
                        </div>
                        
                        {/* User Description */}
                        <InlineEdit as="textarea" value={user.description || ""} onSave={(value) => handleProfileUpdate("description", value)} className="mt-4 text-gray-700 leading-relaxed text-base max-w-sm" placeholder="Add a short description about yourself" showCursor={true}/>
                      </div>
                    </div>
          
                    <div className="hidden lg:block lg:w-1/3"></div>
          
                    {/* --- Main Content Area (Draggable Cards) --- */}
                    <div className="lg:w-2/3">
                      <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="cards">
                          {(provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              {cards.map((card, index) => {
                                const cardContent = renderCardContent(card.id);
                                if (!cardContent) {
                                  // Render a placeholder to maintain DND indices if card is hidden
                                  return <div key={card.id} style={{ display: "none" }} />;
                                }
                                return (
                                  <Draggable key={card.id} draggableId={card.id} index={index}>
                                    {(provided) => (
                                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={`${card.id === 'github' ? 'md:col-span-2' : 'md:col-span-1'} flex items-center gap-2 outline-none`}>
                                        <div className="w-full">
                                          {cardContent}
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
                    </div>
                  </div>
                  
                </div>

      {/* --- Bottom Action Bar --- */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-blue-400 backdrop-blur-sm z-50 flex items-center justify-center gap-x-4 sm:gap-x-6 border border-gray-200 rounded-full px-4">
        <button onClick={() => setSocialModalOpen(true)} className="bg-blue-400  text-white rounded-full p-4 transition-colors cursor-pointer" title="Add Social Links">
          <FaLink size={22} />
        </button>
        <button onClick={handleAddAbout} className="bg-blue-400  text-white rounded-full p-4 transition-colors cursor-pointer" title="Add About Section">
          <FaInfoCircle size={22} />
        </button>
        <button onClick={() => setTechStackModalOpen(true)} className="bg-blue-400  text-white rounded-full p-4 transition-colors cursor-pointer" title="Add Tech Stack">
          <FaCode size={22} />
        </button>
        <button onClick={() => setProjectModalOpen(true)} className="bg-blue-400  text-white rounded-full p-4 transition-colors cursor-pointer" title="Add Projects">
          <FaProjectDiagram size={22} />
        </button>
        <button onClick={() => setGithubModalOpen(true)} className="bg-blue-400  text-white rounded-full p-4 transition-colors cursor-pointer" title="Add GitHub Contributions">
          <FaGithub size={22} />
        </button>
      </div>

      {/* --- Modals --- */}
     
      {isSocialModalOpen && (
        <SocialModal socials={[{ name: "Twitter", icon: <FaTwitter />, href: user.socials?.twitter || "" }, { name: "GitHub", icon: <FaGithub />, href: user.socials?.github || "" }, { name: "LinkedIn", icon: <FaLinkedin />, href: user.socials?.linkedin || "" }]} handleSocialChange={handleSocialChange} setSocialModalOpen={setSocialModalOpen}/>
      )}
      {isTechStackModalOpen && (
        <TechStackModal techStack={allTechs.filter((tech) => user.techStack?.includes(tech.name)) || []} techSearch={techSearch} setTechSearch={setTechSearch} filteredTechs={filteredTechs} handleTechToggle={handleTechToggle} setTechModalOpen={setTechStackModalOpen} />
      )}
      {isProjectModalOpen && user.projects && (
        <ProjectModal projects={user.projects} onClose={() => setProjectModalOpen(false)} onSave={(newProjects) => { setUser((prevUser) => (prevUser ? { ...prevUser, projects: newProjects } : null)); setProjectModalOpen(false); }}/>
      )}
      {isGithubModalOpen && (
        <GitHubModal githubUsername={githubUsername} setGithubUsername={setGithubUsername} setGithubModalOpen={setGithubModalOpen} handleSetGithubUsername={handleSetGithubUsername} />
      )}
    </div>
  );
};
// #endregion

export default EditPage;