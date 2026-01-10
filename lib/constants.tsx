import React from 'react';
import {
    SiNextdotjs, SiTailwindcss, SiTypescript, SiGraphql, SiSwift, SiRust,
    SiPython, SiGo, SiRuby, SiKubernetes, SiGooglecloud,
    SiMongodb, SiPostgresql, SiRedis, SiFirebase, SiFlutter, SiSvelte, SiElixir,
    SiVuedotjs, SiAngular, SiDocker, SiPhp
} from "react-icons/si";
import { FaReact, FaNodeJs, FaAws, FaMicrosoft, FaCode } from "react-icons/fa";

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
