import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    FaGithub,
    FaTwitter,
    FaLinkedin,
    FaArrowLeft,
    FaSave,
    FaCode,
    FaProjectDiagram,
    FaInfoCircle,
    FaTrash,
    FaUserAlt,
    FaChartLine,
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
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from "@hello-pangea/dnd";
import { motion, AnimatePresence } from "framer-motion";

import { getUserByUsername, User } from "../../lib/mockUsers";
import SocialModal from "../../components/dashboard/edit/SocialModal";
import TechStackModal from "../../components/dashboard/edit/TechStackModal";
import ProjectModal from "../../components/dashboard/edit/ProjectModal";
import GitHubModal from "../../components/dashboard/edit/GitHubModal";
import InlineEdit from "../../components/dashboard/edit/InlineEdit";
import GithubCard from "../../components/GitHubCard";
import DashboardLayout from "../../components/dashboard/DashboardLayout";

const allTechs = [
    { name: "React", icon: <FaCode /> },
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

const EditPage: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isSocialModalOpen, setSocialModalOpen] = useState(false);
    const [isTechStackModalOpen, setTechStackModalOpen] = useState(false);
    const [isProjectModalOpen, setProjectModalOpen] = useState(false);
    const [isGithubModalOpen, setGithubModalOpen] = useState(false);
    const imageUploadRef = useRef<HTMLInputElement>(null);

    const [cards, setCards] = useState([
        { id: "about" },
        { id: "techstack" },
        { id: "projects" },
        { id: "github" },
    ]);
    const [techSearch, setTechSearch] = useState("");
    const [githubUsername, setGithubUsername] = useState("");

    useEffect(() => {
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

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        if (!destination) return;

        const items = Array.from(cards);
        const [reorderedItem] = items.splice(source.index, 1);
        items.splice(destination.index, 0, reorderedItem);

        setCards(items);
    };

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

    const handleSocialChange = (name: string, href: string) => {
        if (!user) return;
        setUser({ ...user, socials: { ...user.socials, [name.toLowerCase()]: href } });
    };

    const handleProfileUpdate = (field: keyof User, value: string) => {
        if (!user) return;
        setUser({ ...user, [field]: value });
    };

    const handleHeadingUpdate = (field: string, value: string) => {
        if (!user) return;
        setUser({ ...user, headings: { ...user.headings, [field]: value } });
    };

    const handleAddAbout = () => {
        if (user) {
            setUser({ ...user, about: user.about || "Tell everyone about yourself." });
        }
    };

    const handleDeleteAbout = () => user && setUser({ ...user, about: "" });
    const handleDeleteTechStack = () => user && setUser({ ...user, techStack: [] });
    const handleDeleteProjects = () => user && setUser({ ...user, projects: [] });
    const handleDeleteGithub = () => {
        setGithubUsername("");
    };

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

    const filteredTechs = allTechs.filter((tech) =>
        tech.name.toLowerCase().includes(techSearch.toLowerCase())
    );

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="w-10 h-10 border-2 border-blue-500 border-dashed rounded-full animate-spin"></div>
            </div>
        );
    }

    const mockProjects = user.projects || [];

    const renderCardContent = (cardId: string) => {
        switch (cardId) {
            case "about":
                if (!user.about) return null;
                return (
                    <div className="w-full h-full glass-card rounded-3xl p-8 flex flex-col justify-center relative group min-h-[250px]">
                        <div className="absolute top-4 right-4 z-20 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                            <button onClick={handleDeleteAbout} className="p-2 rounded-xl bg-white/5 hover:bg-red-500 text-white/40 hover:text-white transition-all cursor-pointer">
                                <FaTrash size={12} />
                            </button>
                        </div>
                        <div className="flex items-center gap-3 mb-4 text-blue-400 font-semibold uppercase tracking-wider text-xs">
                            <FaUserAlt size={12} />
                            <InlineEdit
                                value={user.headings?.about || "About"}
                                onSave={(value) => handleHeadingUpdate("about", value)}
                                className="font-semibold uppercase tracking-wider text-xs"
                                placeholder="Personal"
                            />
                        </div>
                        <div className="flex-1">
                            <InlineEdit as="textarea" value={user.about || ""} onSave={(value) => handleProfileUpdate("about", value)} className="text-2xl font-medium leading-normal text-white/90" placeholder="Tell everyone about yourself" />
                        </div>
                    </div>
                );
            case "techstack":
                if (!user.techStack || user.techStack.length === 0) return null;
                return (
                    <div className="w-full h-full glass-card rounded-3xl p-6 flex flex-col relative group min-h-[200px]">
                        <div className="absolute top-4 right-4 z-20 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                            <button onClick={handleDeleteTechStack} className="p-2 rounded-xl bg-white/5 hover:bg-red-500 text-white/40 hover:text-white transition-all cursor-pointer">
                                <FaTrash size={12} />
                            </button>
                        </div>
                        <div className="flex items-center gap-2 mb-6 text-white/60 text-sm font-medium">
                            <FaCode className="text-white/40" />
                            <InlineEdit
                                value={user.headings?.techstack || "Tech Stack"}
                                onSave={(value) => handleHeadingUpdate("techstack", value)}
                                className="text-sm font-medium"
                                placeholder="Tech Stack"
                            />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {user.techStack.map((tech) => (
                                <span key={tech} className="px-3 py-1.5 glass rounded-lg text-xs font-semibold text-white/80 border-white/5 h-fit whitespace-nowrap"> {tech} </span>
                            ))}
                        </div>
                    </div>
                );
            case "projects":
                if (!mockProjects || mockProjects.length === 0) return null;
                return (
                    <div className="w-full h-full glass-card rounded-3xl p-8 flex flex-col relative group">
                        <div className="absolute top-4 right-4 z-20 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                            <button onClick={handleDeleteProjects} className="p-2 rounded-xl bg-white/5 hover:bg-red-500 text-white/40 hover:text-white transition-all cursor-pointer">
                                <FaTrash size={12} />
                            </button>
                        </div>
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-2 text-white/60 text-sm font-medium">
                                <FaChartLine className="text-white/40" />
                                <InlineEdit value={user.headings?.projects || "Featured Projects"} onSave={(value) => handleHeadingUpdate("projects", value)} className="text-sm font-medium" placeholder="Featured Projects" />
                            </div>
                            <span className="text-xs bg-white/10 px-2 py-1 rounded text-white/40">{mockProjects.length} Projects</span>
                        </div>
                        <div className="space-y-4 pr-2 -mr-2">
                            {mockProjects.map((project) => (
                                <div key={project.url} className="p-4 rounded-2xl bg-white/5 group/item transition-all border border-white/5 relative">
                                    <h4 className="font-bold text-lg mb-1 uppercase tracking-tight text-white">{project.title}</h4>
                                    <p className="text-sm text-white/50">{project.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case "github":
                if (!githubUsername) return null;
                return (
                    <div className="w-full overflow-hidden rounded-3xl">
                        <GithubCard
                            githubUsername={githubUsername}
                            onDelete={handleDeleteGithub}
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <DashboardLayout>
            <div className="w-full relative min-h-screen">
                <div className="flex flex-col lg:flex-row gap-12 pt-24 lg:pt-0">

                    {/* --- FIXED Identity Sidebar --- */}
                    {/* On Desktop: fixed positioning relative to content container */}
                    {/* On Mobile: relative flow */}
                    <div className="lg:w-[32%] w-full h-fit">
                        <div className="lg:fixed lg:top-12 lg:w-[calc((min(72rem,100vw-20rem-6rem)*0.33))] group/profile-card overflow-hidden relative shadow-2xl z-40 rounded-[2.5rem] min-h-[600px] flex flex-col justify-end">
                            {/* Full Card Background Image */}
                            {user.image && (
                                <div className="absolute inset-0 z-0">
                                    <Image src={user.image} alt={user.name} fill className="object-cover transition-transform duration-700 group-hover/profile-card:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                                </div>
                            )}

                            {/* Upload Overlay */}
                            <input type="file" ref={imageUploadRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                            <div
                                className="absolute inset-0 z-10 opacity-0 group-hover/profile-card:opacity-100 transition-opacity flex items-center justify-center bg-black/40 cursor-pointer"
                                onClick={() => imageUploadRef.current?.click()}
                            >
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center text-white">
                                        <LuUpload size={24} />
                                    </div>
                                    <span className="text-white font-black uppercase tracking-widest text-xs">Change Cover Photo</span>
                                </div>
                            </div>

                            {/* Content Over Background */}
                            <div className="glass-card w-full h-full relative z-20 p-10 flex flex-col justify-end border-white/10 !bg-transparent !backdrop-blur-none">
                                <div className="w-full text-left">
                                    <InlineEdit value={user.name} onSave={(value) => handleProfileUpdate("name", value)} className="text-5xl font-bold tracking-tight mb-2 text-white w-full text-left drop-shadow-lg" placeholder="Your Name" showCursor={true} />
                                    <InlineEdit value={user.profession} onSave={(value) => handleProfileUpdate("profession", value)} className="text-xl text-white/80 font-medium mb-6 w-full text-left" placeholder="Your Profession" showCursor={true} />

                                    <div className="flex gap-4 mb-8">
                                        {user.socials?.github && <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-white/40"><FaGithub size={20} /></div>}
                                        {user.socials?.twitter && <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-white/40"><FaTwitter size={20} /></div>}
                                        {user.socials?.linkedin && <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-white/40"><FaLinkedin size={20} /></div>}
                                    </div>

                                    <div className="pt-8 border-t border-white/20 w-full">
                                        <InlineEdit as="textarea" value={user.description || ""} onSave={(value) => handleProfileUpdate("description", value)} className="text-white/60 leading-relaxed text-lg w-full block text-left" placeholder="Add a short description" showCursor={true} />
                                    </div>

                                    <div className="mt-6 flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] font-black text-blue-400">
                                        <span>devbio.co/</span>
                                        <InlineEdit
                                            value={user.username || ""}
                                            onSave={(value) => handleProfileUpdate("username", value)}
                                            className="text-blue-400 font-black"
                                            placeholder="username"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- Scrolling Bento Area --- */}
                    <main className="lg:w-[68%] w-full pb-40 lg:pl-4">
                        <div className="mb-10 flex items-center justify-between">
                            <div>
                                {/* <h2 className="text-3xl font-black text-white tracking-tighter leading-none uppercase italic">Designer</h2> */}
                                <p className="text-white/30 hidden md:block text-[10px] font-black uppercase tracking-[0.3em] mt-3">Drag components to reorder</p>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={handleAddAbout} className="p-3 glass rounded-xl text-white/40 hover:text-white transition-all cursor-pointer" title="Add About"><FaInfoCircle /></button>
                                <button onClick={() => setTechStackModalOpen(true)} className="p-3 glass rounded-xl text-white/40 hover:text-white transition-all cursor-pointer" title="Add Tech"><FaCode /></button>
                                <button onClick={() => setProjectModalOpen(true)} className="p-3 glass rounded-xl text-white/40 hover:text-white transition-all cursor-pointer" title="Add Projects"><FaProjectDiagram /></button>
                                <button onClick={() => setGithubModalOpen(true)} className="p-3 glass rounded-xl text-white/40 hover:text-white transition-all cursor-pointer" title="Add GitHub"><FaGithub /></button>
                            </div>
                        </div>

                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="cards">
                                {(provided) => (
                                    <div ref={provided.innerRef} {...provided.droppableProps} className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[400px]">
                                        {cards.map((card, index) => {
                                            const cardContent = renderCardContent(card.id);
                                            if (!cardContent) {
                                                return <div key={card.id} style={{ display: "none" }} />;
                                            }
                                            return (
                                                <Draggable key={card.id} draggableId={card.id} index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className={`${(card.id === 'github' || card.id === 'projects') ? 'md:col-span-2' : 'md:col-span-1'} w-full transition-all ${snapshot.isDragging ? 'z-50' : 'z-0'}`}
                                                        >
                                                            <motion.div
                                                                layout
                                                                className="h-full w-full"
                                                            >
                                                                {cardContent}
                                                            </motion.div>
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
                    </main>
                </div>
            </div>

            {/* --- Fixed Global Action Bar --- */}
            <div className="fixed top-0 lg:top-auto lg:bottom-0 left-0 right-0 z-[100] p-4 lg:p-10 pointer-events-none">
                <div className="max-w-7xl mx-auto flex justify-end items-start lg:items-end pointer-events-auto">
                    <div className="flex gap-3 w-full md:w-auto">
                        <Link href="/dashboard" className="flex-1 md:flex-none">
                            <button className="w-full md:px-10 py-5 glass rounded-2xl text-white font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2 border-white/10 cursor-pointer shadow-2xl backdrop-blur-2xl">
                                <FaArrowLeft size={14} /> Back
                            </button>
                        </Link>
                        <button className="flex-1 md:px-10 py-5 bg-white text-black rounded-2xl font-black hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-2xl cursor-pointer">
                            <FaSave size={14} /> Save Changes
                        </button>
                    </div>
                </div>
            </div>

            {/* --- Modals --- */}
            <AnimatePresence>
                {isSocialModalOpen && (
                    <SocialModal socials={[{ name: "Twitter", icon: <FaTwitter />, href: user.socials?.twitter || "" }, { name: "GitHub", icon: <FaGithub />, href: user.socials?.github || "" }, { name: "LinkedIn", icon: <FaLinkedin />, href: user.socials?.linkedin || "" }]} handleSocialChange={handleSocialChange} setSocialModalOpen={setSocialModalOpen} />
                )}
                {isTechStackModalOpen && (
                    <TechStackModal techStack={allTechs.filter((tech) => user.techStack?.includes(tech.name)) || []} techSearch={techSearch} setTechSearch={setTechSearch} filteredTechs={filteredTechs} handleTechToggle={handleTechToggle} setTechModalOpen={setTechStackModalOpen} />
                )}
                {isProjectModalOpen && (
                    <ProjectModal projects={user.projects || []} onClose={() => setProjectModalOpen(false)} onSave={(newProjects) => { setUser((prevUser) => (prevUser ? { ...prevUser, projects: newProjects } : null)); setProjectModalOpen(false); }} />
                )}
                {isGithubModalOpen && (
                    <GitHubModal
                        githubUsername={githubUsername}
                        onSave={(username) => {
                            setGithubUsername(username);
                            setGithubModalOpen(false);
                        }}
                        onClose={() => setGithubModalOpen(false)}
                    />
                )}
            </AnimatePresence>
        </DashboardLayout>
    );
};

export default EditPage;
