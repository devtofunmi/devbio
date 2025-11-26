export type Socials = {
  github?: string;
  twitter?: string;
  linkedin?: string;
  website?: string;
};

export type LinkItem = {
  title: string;
  url: string;
};

export type User = {
  username: string;
  name: string;
  profession: string;
  description: string; // for sidebar
  about?: string; // for about section
  image?: string;
  socials?: Socials;
  links?: LinkItem[];
  projects?: {
    title: string;
    description: string;
    url: string;
    tech: string[];
  }[];
  techStack?: string[];
  headings?: {
    [key: string]: string;
  };
};

const users: User[] = [
  {
    username: "alice",
    name: "Alice Johnson",
    profession: "Frontend Engineer",
    description:
      "I build delightful user interfaces, focus on accessibility and performance, and love mentoring.",
    about:
      "Alice is a passionate frontend engineer with 5+ years of experience. She specializes in React, accessibility, and design systems. Alice enjoys mentoring and contributing to open source.",
  image: "https://img.freepik.com/free-photo/portrait-beautiful-young-woman-smiling_23-2148859448.jpg?w=500&q=80",
    socials: {
      github: "alicej",
      twitter: "alice_ui",
      linkedin: "alice-johnson",
    },
    links: [
      { title: "Portfolio", url: "https://alice.dev" },
      { title: "Project: Atlas UI", url: "https://github.com/alicej/atlas-ui" },
    ],
    projects: [
      {
        title: "Prepkitty",
        description: "Engage with our AI-driven interview coach in a real-time, personalized practice environment. Receive actionable feedback to enhance your professional delivery.",
        url: "https://www.prepkitty.co",
        tech: ["Next.js", "TypeScript", "Tailwind"]
      },
    ],
    techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    username: "bob",
    name: "",
    profession: "",
    description:
      "",
    about:
      "",
  image: "",
    socials: {
      github: "",
      twitter: "",
      linkedin: "",
    },
    links: [
      { title: "", url: "" },
      { title: "", url: "" },
    ],
    projects: [
     
    ],
    techStack: [],
  },
  {
    username: "carol",
    name: "Carol Lee",
    profession: "Fullstack Developer",
    description:
      "I ship features end-to-end, build tools to make dev life better, and mentor junior devs.",
    about:
      "Carol is a fullstack developer with a knack for building tools that improve developer productivity. She enjoys working across the stack and sharing knowledge with the community.",
  image: "https://img.freepik.com/free-photo/portrait-young-woman-with-glasses_23-2148859446.jpg?w=500&q=80",
    socials: {
      github: "carollee",
      twitter: "carol_codes",
      linkedin: "carol-lee",
    },
    links: [
      { title: "Talk: Scaling Apps", url: "https://carol.dev/talks/scaling" },
    ],
    projects: [
      {
        title: "FolioRank",
        description: "Submit your portfolio and get ranked by the community.",
        url: "https://https://foliorank.netlify.app/",
        tech: ["Next.js", "Tailwind", "Prisma", "Typescript"]
      }
    ],
    techStack: ["JavaScript", "Angular", "Supabase"],
  },
  {
    username: "jay",
    name: "Jay",
    profession: "Frontend Engineer",
    description:
      "A frontend developer passionate about building clean, responsive, and user friendly websites.",
    image: "https://img.freepik.com/free-photo/portrait-handsome-young-man_23-2148886382.jpg?w=500&q=80",
    about:
      "I'm focused on modern web technologies and real-world problem solving. I shares my learning journey publicly and i'm dedicated to continuous improvement.",
    socials: {
      github: "devtofunmi",
      twitter: "codebreak_er",
      linkedin: "jesutofunmi-mayowa",
    },
    links: [
      { title: "Infra as Code", url: "https://github.com/jaydevops/infra-as-code" },
    ],
    projects: [
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
    ],
    techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Supabase", "JavaScript", "Angular", "Node.js", "Express", "Hono"],
  },
];

export function getUserByUsername(username?: string): User | undefined {
  if (!username) return undefined;
  return users.find((u) => u.username.toLowerCase() === username.toLowerCase());
}

export function getAllUsers(): User[] {
  return users;
}

export default users;
