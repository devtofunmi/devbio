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
  description: string;
  image?: string;
  socials?: Socials;
  links?: LinkItem[];
};

const users: User[] = [
  {
    username: "alice",
    name: "Alice Johnson",
    profession: "Frontend Engineer",
    description:
      "I build delightful user interfaces, focus on accessibility and performance, and love mentoring.",
  image: "https://img.freepik.com/free-photo/portrait-beautiful-young-woman-smiling_23-2148859448.jpg?w=500&q=80",
    socials: {
      github: "alicej",
      twitter: "alice_ui",
      linkedin: "alice-johnson",
      website: "https://alice.dev",
    },
    links: [
      { title: "Portfolio", url: "https://alice.dev" },
      { title: "Project: Atlas UI", url: "https://github.com/alicej/atlas-ui" },
    ],
  },
  {
    username: "bob",
    name: "Bob Smith",
    profession: "Backend Engineer",
    description:
      "I design reliable systems, scale APIs, and enjoy working with distributed services.",
  image: "https://img.freepik.com/free-photo/portrait-handsome-young-man_23-2148886382.jpg?w=500&q=80",
    socials: {
      github: "bobsmith",
      twitter: "bob_ops",
      linkedin: "bob-smith",
      website: "https://bob.codes",
    },
    links: [
      { title: "Blog", url: "https://bob.codes/blog" },
      { title: "Open Source", url: "https://github.com/bobsmith" },
    ],
  },
  {
    username: "carol",
    name: "Carol Lee",
    profession: "Fullstack Developer",
    description:
      "I ship features end-to-end, build tools to make dev life better, and mentor junior devs.",
  image: "https://img.freepik.com/free-photo/portrait-young-woman-with-glasses_23-2148859446.jpg?w=500&q=80",
    socials: {
      github: "carollee",
      twitter: "carol_codes",
      linkedin: "carol-lee",
      website: "https://carol.dev",
    },
    links: [
      { title: "Talk: Scaling Apps", url: "https://carol.dev/talks/scaling" },
    ],
  },
  {
    username: "jay",
    name: "Jay Patel",
    profession: "DevOps Engineer",
    description:
      "Automating infrastructure, building CI/CD pipelines, and ensuring smooth deployments.",
  image: "https://img.freepik.com/free-photo/portrait-confident-indian-man_23-2148827054.jpg?w=500&q=80",
    socials: {
      github: "jaydevops",
      twitter: "jay_ops",
      linkedin: "jay-patel",
      website: "https://jay.dev",
    },
    links: [
      { title: "Infra as Code", url: "https://github.com/jaydevops/infra-as-code" },
    ],
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
