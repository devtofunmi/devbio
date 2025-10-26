import React, { useState } from "react";
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
import ProfileCard from "../../components/dashboard/ProfileCard";
import TechStackCard from "../../components/dashboard/TechStackCard";
import SocialCard from "../../components/dashboard/SocialCard";
import GitHubCard from "../../components/dashboard/GitHubCard";

import TechStackModal from "../../components/dashboard/TechStackModal";
import SocialModal from "../../components/dashboard/SocialModal";
import GitHubModal from "../../components/dashboard/GitHubModal";

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

const YourPage = () => {
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



  const filteredTechs = allTechs.filter((tech) =>
    tech.name.toLowerCase().includes(techSearch.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className={`font-sans md:border-1 md:p-5 rounded-3xl min-h-screen md:border-gray-200`}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="cards">
            {(provided) => (
              <div
                className="space-y-5 md:p-5"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {cards.map((card, index) => {
                  let content: React.ReactElement | undefined;
                  let onEditClick: (() => void) | undefined;

                  if (card.id === "profile") {
                    content = <ProfileCard profile={profile} />;
                    
                  } else if (card.id === "techstack") {
                    content = <TechStackCard techStack={techStack} />;
                    onEditClick = () => setTechModalOpen(true);
                  } else if (card.id === "socials") {
                    content = <SocialCard socials={socials} />;
                    onEditClick = () => setSocialModalOpen(true);
                  } else if (card.id === "github") {
                    content = <GitHubCard githubUsername={githubUsername} />;
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
                          className={`relative group transition-transform duration-300 ease-in-out  rounded-2xl overflow-hidden ${
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

        

        {isGithubModalOpen && (
          <GitHubModal
            githubUsername={githubUsername}
            setGithubUsername={setGithubUsername}
            setGithubModalOpen={setGithubModalOpen}
            handleSetGithubUsername={handleSetGithubUsername}
          />
        )}

        {isTechModalOpen && (
          <TechStackModal
            techStack={techStack}
            techSearch={techSearch}
            setTechSearch={setTechSearch}
            filteredTechs={filteredTechs}
            handleTechToggle={handleTechToggle}
            setTechModalOpen={setTechModalOpen}
          />
        )}

        {isSocialModalOpen && (
          <SocialModal
            socials={socials}
            handleSocialChange={handleSocialChange}
            setSocialModalOpen={setSocialModalOpen}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default YourPage;
