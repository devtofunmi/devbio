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

    return (
        <>
            <header className={`sticky ${isMenuOpen ? 'w-full' : 'w-[90%] rounded-full mt-5'} flex justify-center mx-auto top-0 z-50 bg-white shadow-[0_0_10px_rgba(0,0,0,0.15)] transition-transform duration-300 ${isScrolled ? '-translate-y-2' : ''}`}>
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="text-2xl font-bold text-gray-900">
                        <Link href="/">DevBio</Link>
                    </div>
                    <nav className="hidden md:flex items-center space-x-6">
                        <Link href="#features" className="text-gray-600 hover:text-blue-400 transition">Features</Link>
                        <Link href="#testimonials" className="text-gray-600 hover:text-blue-400 transition">Testimonials</Link>
                        <Link href="#faq" className="text-gray-600 hover:text-blue-400 transition">faq</Link>
                        <a href="/signup" className="bg-blue-400 text-white px-5 py-2 rounded-full font-bold hover:bg-blue-500 transition">
                            Sign Up
                        </a>
                    </nav>
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(true)} className="text-gray-600 hover:text-blue-600 focus:outline-none">
                            <HiMenu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </header>
            {isMenuOpen && (
                <div className="fixed w-full inset-0 bg-black bg-opacity-50 z-50" onClick={() => setIsMenuOpen(false)}>
                    <div className="fixed top-0 right-0 w-full h-screen bg-white shadow-lg" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-end p-4">
                            <button onClick={() => setIsMenuOpen(false)} className="text-gray-600 hover:text-blue-400 focus:outline-none">
                                <HiX className="w-6 h-6" />
                            </button>
                        </div>
                        <nav className="pt-20 px-8 flex flex-col space-y-4">
                            <Link href="#features" className="font-bold py-2 border-b border-gray-200 text-xl text-gray-800 hover:text-blue-400 transition" onClick={() => setIsMenuOpen(false)}>Features</Link>
                            <Link href="#testimonials" className="font-bold py-2 border-b border-gray-200 text-xl text-gray-800 hover:text-blue-400 transition" onClick={() => setIsMenuOpen(false)}>Testimonials</Link>
                            <Link href="#faq" className="font-bold py-2 border-b border-gray-200 text-xl text-gray-800 hover:text-blue-400 transition" onClick={() => setIsMenuOpen(false)}>Faq</Link>
                            <a href="/signup" className="font-bold py-2 border-b border-gray-200 text-xl text-gray-800 hover:text-blue-400 transition" onClick={() => setIsMenuOpen(false)}>
                                Sign Up
                            </a>
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;