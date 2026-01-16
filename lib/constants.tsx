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

export type ThemeStyle = {
    bg: string;
    card: string;
    border: string;
    accent: string;
    accentText: string;
    text: string;
    textSecondary: string;
    heroGradient: string;
};

export const THEME_CONFIG: Record<string, ThemeStyle> = {
    // Solid Colors
    'onyx': {
        bg: 'bg-[#000000]',
        card: 'rgba(20, 20, 20, 0.8)',
        border: 'rgba(255, 255, 255, 0.08)',
        accent: '#ffffff',
        accentText: '#000000',
        text: '#ffffff',
        textSecondary: '#a1a1aa',
        heroGradient: 'linear-gradient(to top, #000000 10%, rgba(0,0,0,0.8) 50%, rgba(255,255,255,0.05) 100%)'
    },
    'ghost': {
        bg: 'bg-zinc-950',
        card: 'rgba(39, 39, 42, 0.5)',
        border: 'rgba(255, 255, 255, 0.1)',
        accent: '#e4e4e7',
        accentText: '#000000',
        text: '#f4f4f5',
        textSecondary: '#a1a1aa',
        heroGradient: 'linear-gradient(to top, #09090b 10%, rgba(9,9,11,0.8) 50%, rgba(228,228,231,0.05) 100%)'
    },
    'midnight': {
        bg: 'bg-[#020617]',
        card: 'rgba(15, 23, 42, 0.6)',
        border: 'rgba(56, 189, 248, 0.1)',
        accent: '#38bdf8',
        accentText: '#ffffff',
        text: '#f8fafc',
        textSecondary: '#94a3b8',
        heroGradient: 'linear-gradient(to top, #020617 10%, rgba(2,6,23,0.8) 50%, rgba(56,189,248,0.15) 100%)'
    },
    'forest': {
        bg: 'bg-[#051f1b]',
        card: 'rgba(6, 78, 59, 0.4)',
        border: 'rgba(52, 211, 153, 0.1)',
        accent: '#34d399',
        accentText: '#ffffff',
        text: '#ecfdf5',
        textSecondary: '#6ee7b7',
        heroGradient: 'linear-gradient(to top, #051f1b 10%, rgba(5,31,27,0.8) 50%, rgba(52,211,153,0.15) 100%)'
    },
    'dracula': {
        bg: 'bg-[#1e1b2e]',
        card: 'rgba(49, 46, 129, 0.3)',
        border: 'rgba(192, 132, 252, 0.2)',
        accent: '#c084fc',
        accentText: '#ffffff',
        text: '#faf5ff',
        textSecondary: '#e9d5ff',
        heroGradient: 'linear-gradient(to top, #1e1b2e 10%, rgba(30,27,46,0.8) 50%, rgba(192,132,252,0.15) 100%)'
    },
    'cobalt': {
        bg: 'bg-[#0b1121]',
        card: 'rgba(29, 78, 216, 0.15)',
        border: 'rgba(96, 165, 250, 0.2)',
        accent: '#60a5fa',
        accentText: '#ffffff',
        text: '#eff6ff',
        textSecondary: '#bfdbfe',
        heroGradient: 'linear-gradient(to top, #0b1121 10%, rgba(11,17,33,0.8) 50%, rgba(96,165,250,0.15) 100%)'
    },
    'carbon': {
        bg: 'bg-[#171717]',
        card: 'rgba(64, 64, 64, 0.3)',
        border: 'rgba(255, 255, 255, 0.05)',
        accent: '#d4d4d4',
        accentText: '#000000',
        text: '#e5e5e5',
        textSecondary: '#a3a3a3',
        heroGradient: 'linear-gradient(to top, #171717 10%, rgba(23,23,23,0.8) 50%, rgba(212,212,212,0.05) 100%)'
    },
    'nord': {
        bg: 'bg-[#2e3440]',
        card: 'rgba(59, 66, 82, 0.6)',
        border: 'rgba(136, 192, 208, 0.2)',
        accent: '#88c0d0',
        accentText: '#ffffff',
        text: '#eceff4',
        textSecondary: '#d8dee9',
        heroGradient: 'linear-gradient(to top, #2e3440 10%, rgba(46,52,64,0.8) 50%, rgba(136,192,208,0.15) 100%)'
    },
    'ember': {
        bg: 'bg-[#2a120b]',
        card: 'rgba(67, 20, 7, 0.4)',
        border: 'rgba(251, 146, 60, 0.2)',
        accent: '#fb923c',
        accentText: '#000000',
        text: '#fff7ed',
        textSecondary: '#fdba74',
        heroGradient: 'linear-gradient(to top, #2a120b 10%, rgba(42,18,11,0.8) 50%, rgba(251,146,60,0.15) 100%)'
    },
    'dim': {
        bg: 'bg-[#18181b]',
        card: 'rgba(39, 39, 42, 0.4)',
        border: 'rgba(113, 113, 122, 0.2)',
        accent: '#a1a1aa',
        accentText: '#000000',
        text: '#f4f4f5',
        textSecondary: '#71717a',
        heroGradient: 'linear-gradient(to top, #18181b 10%, rgba(24,24,27,0.8) 50%, rgba(161,161,170,0.05) 100%)'
    },
    'alabaster': {
        bg: 'bg-[#0f172a]',
        card: 'rgba(30, 41, 59, 0.6)',
        border: 'rgba(148, 163, 184, 0.1)',
        accent: '#38bdf8',
        accentText: '#ffffff',
        text: '#f8fafc',
        textSecondary: '#94a3b8',
        heroGradient: 'linear-gradient(to top, #0f172a 10%, rgba(15,23,42,0.8) 50%, rgba(56,189,248,0.15) 100%)'
    },

    // Image & Gradient Themes
    'matrix': {
        bg: 'https://images.unsplash.com/photo-1550684848-86a5d8727436?w=1600&q=80',
        card: 'rgba(0, 20, 0, 0.85)',
        border: 'rgba(34, 197, 94, 0.4)',
        accent: '#22c55e',
        accentText: '#ffffff',
        text: '#f0fdf4',
        textSecondary: '#86efac',
        heroGradient: 'linear-gradient(to top, #001a00 10%, rgba(0,20,0,0.8) 50%, rgba(34,197,94,0.2) 100%)'
    },
    'circuit': {
        bg: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1600&q=80',
        card: 'rgba(8, 47, 73, 0.8)',
        border: 'rgba(14, 165, 233, 0.4)',
        accent: '#38bdf8',
        accentText: '#ffffff',
        text: '#f0f9ff',
        textSecondary: '#bae6fd',
        heroGradient: 'linear-gradient(to top, #082f49 10%, rgba(8,47,73,0.8) 50%, rgba(14,165,233,0.2) 100%)'
    },
    'terminal': {
        bg: 'https://images.unsplash.com/photo-1519750783826-e2420f4d687f?w=1600&q=80',
        card: 'rgba(20, 10, 0, 0.85)',
        border: 'rgba(245, 158, 11, 0.4)',
        accent: '#fbbf24',
        accentText: '#000000',
        text: '#fffbeb',
        textSecondary: '#fcd34d',
        heroGradient: 'linear-gradient(to top, #1c1000 10%, rgba(28,16,0,0.8) 50%, rgba(251,191,36,0.15) 100%)'
    },
    'workspace': {
        bg: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=1600&q=80',
        card: 'rgba(15, 15, 25, 0.7)',
        border: 'rgba(139, 92, 246, 0.3)',
        accent: '#a78bfa',
        accentText: '#ffffff',
        text: '#ffffff',
        textSecondary: '#c4b5fd',
        heroGradient: 'linear-gradient(to top, #0f0f19 10%, rgba(15,15,25,0.8) 50%, rgba(167,139,250,0.15) 100%)'
    },
    'nodes': {
        bg: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=1600&q=80',
        card: 'rgba(25, 10, 20, 0.7)',
        border: 'rgba(236, 72, 153, 0.3)',
        accent: '#f472b6',
        accentText: '#ffffff',
        text: '#fff1f2',
        textSecondary: '#fbcfe8',
        heroGradient: 'linear-gradient(to top, #0f0510 0%, rgba(35, 10, 25, 0.8) 45%, rgba(244, 114, 182, 0.25) 100%)'
    },
    'glass': {
        bg: 'https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?w=1600&q=80',
        card: 'rgba(255, 255, 255, 0.1)',
        border: 'rgba(255, 255, 255, 0.2)',
        accent: '#ffffff',
        accentText: '#000000',
        text: '#ffffff',
        textSecondary: 'rgba(255, 255, 255, 0.7)',
        heroGradient: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(255,255,255,0.05) 100%)'
    },
    'velvet': {
        bg: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=1600&q=80',
        card: 'rgba(20, 0, 10, 0.6)',
        border: 'rgba(216, 180, 254, 0.2)',
        accent: '#e9d5ff',
        accentText: '#000000',
        text: '#faf5ff',
        textSecondary: '#d8b4fe',
        heroGradient: 'linear-gradient(to top, #0f0518 0%, rgba(25, 10, 45, 0.85) 50%, rgba(167, 139, 250, 0.25) 100%)'
    },
    'aurora': {
        bg: 'https://images.unsplash.com/photo-1536431311719-398b6704d4cc?w=1600&q=80',
        card: 'rgba(0, 20, 30, 0.6)',
        border: 'rgba(45, 212, 191, 0.2)',
        accent: '#2dd4bf',
        accentText: '#ffffff',
        text: '#f0fdfa',
        textSecondary: '#99f6e4',
        heroGradient: 'linear-gradient(to top, #00141e 10%, rgba(0,20,30,0.8) 50%, rgba(45,212,191,0.15) 100%)'
    },
    'silence': {
        bg: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80',
        card: 'rgba(15, 23, 42, 0.4)',
        border: 'rgba(148, 163, 184, 0.1)',
        accent: '#94a3b8',
        accentText: '#ffffff',
        text: '#f1f5f9',
        textSecondary: '#cbd5e1',
        heroGradient: 'linear-gradient(to top, #0f172a 10%, rgba(15,23,42,0.8) 50%, rgba(148,163,184,0.15) 100%)'
    },
    'prism': {
        bg: 'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=1600&q=80',
        card: 'rgba(10, 10, 10, 0.7)',
        border: 'rgba(255, 255, 255, 0.15)',
        accent: '#ffffff',
        accentText: '#000000',
        text: '#ffffff',
        textSecondary: '#e5e7eb',
        heroGradient: 'linear-gradient(to top, #0a0a0a 10%, rgba(10,10,10,0.8) 50%, rgba(255,255,255,0.1) 100%)'
    },
    'cloud': {
        bg: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=1600&q=80',
        card: 'rgba(255, 255, 255, 0.1)',
        border: 'rgba(255, 255, 255, 0.2)',
        accent: '#bae6fd',
        accentText: '#000000',
        text: '#ffffff',
        textSecondary: '#e0f2fe',
        heroGradient: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(255,255,255,0.1) 100%)'
    },
    'smoke': {
        bg: 'https://images.unsplash.com/photo-1541450805268-4822a3a774ca?w=1600&q=80',
        card: 'rgba(0, 0, 0, 0.6)',
        border: 'rgba(100, 116, 139, 0.3)',
        accent: '#94a3b8',
        accentText: '#000000',
        text: '#f8fafc',
        textSecondary: '#cbd5e1',
        heroGradient: 'linear-gradient(to top, #000000 10%, rgba(0,0,0,0.8) 50%, rgba(148,163,184,0.15) 100%)'
    },
    'mesh': {
        bg: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1600&q=80',
        card: 'rgba(10, 10, 30, 0.7)',
        border: 'rgba(129, 140, 248, 0.2)',
        accent: '#818cf8',
        accentText: '#ffffff',
        text: '#e0e7ff',
        textSecondary: '#c7d2fe',
        heroGradient: 'linear-gradient(to top, #0a0a1e 10%, rgba(10,10,30,0.8) 50%, rgba(129,140,248,0.15) 100%)'
    },
    'flow': {
        bg: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&q=80',
        card: 'rgba(10, 20, 20, 0.6)',
        border: 'rgba(56, 189, 248, 0.2)',
        accent: '#38bdf8',
        accentText: '#ffffff',
        text: '#f0f9ff',
        textSecondary: '#bae6fd',
        heroGradient: 'linear-gradient(to top, #0a1414 10%, rgba(10,20,20,0.8) 50%, rgba(56,189,248,0.15) 100%)'
    },
};

export const SOCIAL_BASE_URLS: Record<string, string> = {
    'Twitter': 'https://twitter.com/',
    'GitHub': 'https://github.com/',
    'LinkedIn': 'https://linkedin.com/in/',
    'YouTube': 'https://youtube.com/@',
};