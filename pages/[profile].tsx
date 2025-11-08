import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import { getUserByUsername, User } from "../lib/mockUsers";


type Props = {
  user: User;
};


const ProfilePage: React.FC<Props> = ({ user }) => {
  
const geistSans = { className: "font-sans" };
// const geistMono = { className: "font-mono" };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-xl text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">404 - User Not Found</h1>
          <Link href="/" className="text-blue-600 hover:underline">Go back home</Link>
        </div>
      </div>
    );
  }

  
  // --- Inlined GitHubGraph ---
  const GitHubGraph = ({ username = "anon", size = 20 }: { username?: string; size?: number }) => {
    const rows = 7;
    const cols = size;
    const seed = username.split("").reduce((s, c) => s + c.charCodeAt(0), 0) || 1;
    const seededRandom = (seedVal: number) => {
      let s = seedVal;
      return () => {
        s = (s * 9301 + 49297) % 233280;
        return s / 233280;
      };
    };
    const rand = seededRandom(seed);
    const grid = Array.from({ length: cols }).map(() =>
      Array.from({ length: rows }).map(() => Math.floor(rand() * 5))
    );
    const colorFor = (v: number) => {
      switch (v) {
        case 0:
          return "bg-gray-200";
        case 1:
          return "bg-green-100";
        case 2:
          return "bg-green-300";
        case 3:
          return "bg-green-500";
        default:
          return "bg-green-700";
      }
    };

    return (
      <div className="w-full">
        <div className="grid w-full" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
          {grid.map((col, ci) =>
            col.map((cell, ri) => (
              <div key={`${ci}-${ri}`} title={`Contrib: ${cell}`} className={`h-3 m-[2px] rounded-sm ${colorFor(cell)}`} />
            ))
          )}
        </div>
      </div>
    );
  };

  // Mock projects data styled as cards
  const mockProjects = [
    {
      title: "Prepkitty",
      description: "Engage with our AI-driven interview coach in a real-time, personalized practice environment. Receive actionable feedback to enhance your professional delivery.",
      url: "https://www.prepkitty.co",
      tech: ["Next.js", "TypeScript", "Tailwind"]
    },
    {
      title: "Chat Flow",
      description: "A Natural Language Interface for Building Flowcharts",
      url: "https://chatt-flow.vercel.app/",
      tech: ["Next.js", "TypeScript", "TamboSdk"]
    },
    {
      title: "FolioRank",
      description: "Submit your portfolio and get ranked by the community.",
      url: "https://https://foliorank.netlify.app/",
      tech: ["Next.js", "Tailwind", "Prisma", "Typescript"]
    }
  ];

  return (
    <div className={`${geistSans.className} min-h-screen bg-gray-50 p-8 sm:p-12 md:p-16 text-gray-800`}>
      <div className="max-w-7xl mx-auto">
        <div className="lg:flex lg:gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/3 lg:fixed lg:top-16 lg:h-screen lg:overflow-y-auto">
            <div className="flex flex-col items-start space-y-4">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-blue-400">
                {user.image ? (
                  <Image src={user.image} alt={user.name} fill className="object-cover" />
                ) : null}
              </div>
              <h1 className="text-4xl font-extrabold text-gray-900 flex items-center">{user.name}</h1>
              <p className="text-xl text-gray-600">{user.profession}</p>
              <div className="flex items-center space-x-4 pt-2">
                {user.socials?.github && (
                  <a href={`https://github.com/${user.socials.github}`} target="_blank" rel="noreferrer" className="text-gray-700 hover:text-black"><FaGithub size={22} /></a>
                )}
                {user.socials?.twitter && (
                  <a href={`https://twitter.com/${user.socials.twitter}`} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-700"><FaTwitter size={22} /></a>
                )}
                {user.socials?.linkedin && (
                  <a href={`https://www.linkedin.com/in/${user.socials.linkedin}`} target="_blank" rel="noreferrer" className="text-blue-700 hover:text-blue-900"><FaLinkedin size={22} /></a>
                )}
               
              </div>
              {user.description && <p className="mt-4 text-gray-700 leading-relaxed text-base max-w-sm">{user.description}</p>}
            </div>
          </div>
          <div className="hidden lg:block lg:w-1/3"></div>
          {/* Main content */}
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 lg:mt-0">
            {/* About & Tech Stack */}
            <div className="md:col-span-1">
              <div className="w-full">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
                <p className="text-lg text-gray-700 mb-6">{user.about}</p>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Tech Stack</h3>
                <div className="flex flex-wrap gap-3 mb-8">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">React</span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Node.js</span>
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">TypeScript</span>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">Next js</span>
                  <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">Tailwind</span>
                </div>
                {/* Mock GitHub Graph */}
                <div className="mb-8">
                  <div className="bg-gray-50 p-4 rounded-lg w-full">
                    <GitHubGraph username={user.socials?.github || user.username} size={20} />
                  </div>
                </div>
              </div>
            </div>
            {/* Projects */}
            <div className="md:col-span-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Projects</h2>
              <div className="grid grid-cols-1 gap-6">
                {mockProjects.map((project) => (
                  <div key={project.url} tabIndex={0} className="relative group transition-transform duration-300 ease-in-out hover:-rotate-2 focus:-rotate-2 rounded-2xl overflow-hidden">
                    <div className="relative bg-white rounded-2xl p-6 shadow-xl group-hover:shadow-none transition-shadow border border-gray-200 w-full h-full">
                      <a href={project.url} target="_blank" rel="noreferrer" className="text-xl font-bold text-black hover:underline">
                        {project.title}
                      </a>
                      <p className="text-gray-700 mt-1 mb-2">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.tech.map((t) => (
                          <span key={t} className="bg-blue-100 text-blue-400 px-2 py-0.5 rounded text-xs font-medium">{t}</span>
                        ))}
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <footer className="mt-12 text-center text-sm text-gray-400">
          Made with <span className="font-semibold text-blue-400">devbio</span>
        </footer>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const profile = Array.isArray(context.params?.profile)
    ? context.params?.profile[0]
    : context.params?.profile;
  const user = getUserByUsername(profile as string) || null;
  return {
    props: {
      user,
    },
  };
};

export default ProfilePage;