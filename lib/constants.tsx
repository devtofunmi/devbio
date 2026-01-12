import React from 'react';
import {
    SiNextdotjs, SiTailwindcss, SiTypescript, SiGraphql, SiSwift, SiRust,
    SiPython, SiGo, SiRuby, SiKubernetes, SiGooglecloud,
    SiMongodb, SiPostgresql, SiRedis, SiFirebase, SiFlutter, SiSvelte, SiElixir,
    SiVuedotjs, SiAngular, SiDocker, SiPhp
} from "react-icons/si";
import { FaReact, FaNodeJs, FaAws, FaMicrosoft } from "react-icons/fa";

export type Tech = {
    name: string;
    icon: React.ReactNode;
};

export const ALL_TECHS: Tech[] = [
    { name: 'React', icon: <FaReact /> },
    { name: 'Next.js', icon: <SiNextdotjs /> },
    { name: 'TypeScript', icon: <SiTypescript /> },
    { name: 'Node.js', icon: <FaNodeJs /> },
    { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
    { name: 'GraphQL', icon: <SiGraphql /> },
    { name: 'Swift', icon: <SiSwift /> },
    { name: 'Rust', icon: <SiRust /> },
    { name: 'Python', icon: <SiPython /> },
    { name: 'Go', icon: <SiGo /> },
    { name: 'Ruby', icon: <SiRuby /> },
    { name: 'PHP', icon: <SiPhp /> },
    { name: 'Docker', icon: <SiDocker /> },
    { name: 'Kubernetes', icon: <SiKubernetes /> },
    { name: 'AWS', icon: <FaAws /> },
    { name: 'Google Cloud', icon: <SiGooglecloud /> },
    { name: 'Azure', icon: <FaMicrosoft /> },
    { name: 'MongoDB', icon: <SiMongodb /> },
    { name: 'PostgreSQL', icon: <SiPostgresql /> },
    { name: 'Redis', icon: <SiRedis /> },
    { name: 'Firebase', icon: <SiFirebase /> },
    { name: 'Flutter', icon: <SiFlutter /> },
    { name: 'Vue.js', icon: <SiVuedotjs /> },
    { name: 'Angular', icon: <SiAngular /> },
    { name: 'Svelte', icon: <SiSvelte /> },
    { name: 'Elixir', icon: <SiElixir /> },
];

export const THEME_CONFIG: Record<string, string> = {
    'onyx': 'bg-black',
    'ghost': 'bg-[#080808]',
    'midnight': 'bg-[#020617]',
    'forest': 'bg-[#051f1b]',
    'dracula': 'bg-[#130912]',
    'cobalt': 'bg-[#040a1d]',
    'carbon': 'bg-[#141414]',
    'nord': 'bg-[#1a202c]',
    'ember': 'bg-[#17110e]',
    'dim': 'bg-[#15151a]',
    'alabaster': 'bg-[#1e293b]',
    'matrix': 'https://images.unsplash.com/photo-1550684848-86a5d8727436?w=1600&q=80',
    'circuit': 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1600&q=80',
    'terminal': 'https://images.unsplash.com/photo-1519750783826-e2420f4d687f?w=1600&q=80',
    'workspace': 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=1600&q=80',
    'nodes': 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=1600&q=80',
    'glass': 'https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?w=1600&q=80',
    'velvet': 'https://images.unsplash.com/photo-1557683316-973673baf926?w=1600&q=80',
    'aurora': 'https://images.unsplash.com/photo-1536431311719-398b6704d4cc?w=1600&q=80',
    'silence': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80',
    'prism': 'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=1600&q=80',
    'cloud': 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=1600&q=80',
    'smoke': 'https://images.unsplash.com/photo-1541450805268-4822a3a774ca?w=1600&q=80',
    'mesh': 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1600&q=80',
    'flow': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&q=80',
};

export const SOCIAL_BASE_URLS: Record<string, string> = {
    'Twitter': 'https://twitter.com/',
    'GitHub': 'https://github.com/',
    'LinkedIn': 'https://linkedin.com/in/',
    'YouTube': 'https://youtube.com/@',
};
