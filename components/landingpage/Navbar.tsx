import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { HiMenu, HiX } from 'react-icons/hi';

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navClassName = `sticky flex justify-center mx-auto top-0 z-50 transition-all duration-300 ${
        isScrolled ? '-translate-y-2' : ''
    } ${
        isMenuOpen
            ? 'w-full'
            : 'md:w-[70%] w-[90%] rounded-full mt-5 border border-white/20'
    } bg-white/10 backdrop-blur-lg`;

    return (
        <>
            <header className={navClassName}>
                <div className="container mx-auto px-6 py-2 flex justify-between items-center">
                    <div className="text-2xl font-bold text-white">
                        <Link href="/">DevBio</Link>
                    </div>
                    <nav className="hidden md:flex items-center space-x-6">
                        <Link href="#features" className="text-gray-300 hover:text-white transition">Features</Link>
                        <Link href="#testimonials" className="text-gray-300 hover:text-white transition">Testimonials</Link>
                        <Link href="#faq" className="text-gray-300 hover:text-white transition">FAQ</Link>
                        <Link href="/signup" className="text-white px-5 py-2 rounded-full font-bold transition border border-gray-300 hover:bg-gray-300 hover:text-black">
                            Sign Up
                        </Link>
                    </nav>
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(true)} className="text-gray-300 hover:text-white focus:outline-none">
                            <HiMenu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </header>
            {isMenuOpen && (
                <div className="fixed w-full inset-0 bg-black bg-opacity-50 z-50" onClick={() => setIsMenuOpen(false)}>
                    <div className="fixed top-0 right-0 w-full h-screen bg-black/80 backdrop-blur-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-end p-4">
                            <button onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-white focus:outline-none">
                                <HiX className="w-6 h-6" />
                            </button>
                        </div>
                        <nav className="pt-20 px-8 flex flex-col space-y-4">
                            <Link href="#features" className="font-bold py-2 border-b border-gray-600 text-xl text-gray-300 hover:text-white transition" onClick={() => setIsMenuOpen(false)}>Features</Link>
                            <Link href="#testimonials" className="font-bold py-2 border-b border-gray-600 text-xl text-gray-300 hover:text-white transition" onClick={() => setIsMenuOpen(false)}>Testimonials</Link>
                            <Link href="#faq" className="font-bold py-2 border-b border-gray-600 text-xl text-gray-300 hover:text-white transition" onClick={() => setIsMenuOpen(false)}>FAQ</Link>
                            <Link href="/signup" className="font-bold py-2 border-b border-gray-600 text-xl text-gray-300 hover:text-white transition" onClick={() => setIsMenuOpen(false)}>
                                Sign Up
                            </Link>
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;