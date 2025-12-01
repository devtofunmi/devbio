import React from 'react';
import Link from 'next/link';


const Hero: React.FC = () => (
    <section className="flex flex-col items-center justify-center min-h-[70vh] py-20 px-6 text-center   relative overflow-hidden">
        
        
        
        {/* GitHub Card */}
        <div className="hidden md:flex absolute top-10 left-10 w-40 h-24 bg-gray-700 rounded-xl shadow-2xl rotate-[-15deg] items-center justify-center">
            {/* GitHub SVG Icon */}
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.542-1.365-1.325-1.728-1.325-1.728-1.085-.745.083-.73.083-.73 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.793 1.305 3.476.998.108-.77.419-1.305.762-1.602-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.467-2.383 1.235-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3-.435 1.0-.853 2.05-.126 3.05-.126.974 0 2.023-.727 3.02-.126 2.29.113 3.3.435 3.3.435.652 1.652.24 2.873.116 3.176.769.838 1.235 1.911 1.235 3.221 0 4.61-2.805 5.626-5.474 5.922.43.37.822 1.102.822 2.222 0 1.606-.015 2.898-.015 3.284 0 .319.192.693.8.576C20.562 21.808 24 17.306 24 12c0-6.627-5.373-12-12-12z"/></svg>
        </div>
        
        {/* Calendar/Grid Card */}
        <div className="hidden md:block absolute bottom-20 left-20 w-40 h-24 bg-white rounded-xl shadow-2xl rotate-[10deg] p-3">
            <div className="grid grid-cols-8 gap-1">
                {Array(40).fill(0).map((_, i) => (
                    <div 
                        key={i} 
                        className={`w-3 h-3 rounded-sm ${i % 5 === 0 ? 'bg-green-500' : 'bg-gray-200'}`}
                    ></div>
                ))}
            </div>
        </div>

        {/* Profile Card (Simplified for design) */}
        <div className="hidden md:block absolute top-10 right-10 w-48 h-96 bg-gray-800 rounded-xl shadow-2xl rotate-[5deg] p-4 text-left space-y-2">
            <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('/placeholder-avatar.jpg')" }}></div>
                <span className="font-semibold text-white text-sm">Jay</span>
            </div>
            {/* Image Grid Placeholder */}
            <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="col-span-2 h-20 bg-gray-400 rounded-md"></div>
                <div className="h-20 bg-gray-500 rounded-md"></div>
                <div className="h-20 bg-gray-600 rounded-md"></div>
                <div className="h-20 col-span-2 bg-gray-700 rounded-md"></div>
            </div>
        </div>

       
        {/* --- Main Content --- */}
        <div className="relative z-10 max-w-4xl">
            {/* <OwnPageIcon /> */}
            {/* Reverted to original brand text/placeholder */}
            <p className="text-white text-2xl font-medium mb-2 opacity-80">devbio.co</p>

            {/* Reverted to original developer-focused headline */}
            <h1 className="text-5xl sm:text-6xl leading-tight font-extrabold mb-4 text-white">
                Showcase Your<br /> Code, Stats, and Stack.
            </h1>
            
            {/* Reverted to original subtext */}
            <p className="text-2xl text-gray-400 max-w-2xl mx-auto mb-10">
                Your professional developer profile, all in one link. Connect, share, and grow your presence with a beautiful, customizable page.
            </p>

            {/* Main Call to Action Button */}
            <Link 
                href="/signup" 
                className="inline-block w-full md:w-fit rounded-full bg-white text-gray-900 px-10 py-3 font-bold text-xl md:text-2xl shadow-xl hover:bg-gray-100 transition transform hover:scale-105"
            >
                Create Your DevBio
            </Link>

            {/* Secondary Link */}
            <Link href="/login" className="mt-3 block text-sm text-gray-400 hover:text-blue-400 transition">Log In</Link>
        
           
        </div>
    </section>
);

export default Hero;