import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => (
    <footer className="py-20 px-6 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3 group cursor-pointer">
                <div className="relative w-8 h-8 flex items-center justify-center">
                    <div className="absolute inset-0 bg-blue-500 rounded-lg rotate-6 group-hover:rotate-0 transition-transform duration-300" />
                    <div className="relative w-full h-full bg-black border border-white/10 rounded-lg flex items-center justify-center font-black text-blue-500 text-[10px] tracking-tighter">
                        D/B
                    </div>
                </div>
                <span className="text-white font-bold tracking-tighter">DevBio</span>
            </div>

            <div className="flex gap-10 text-xs font-semibold uppercase tracking-widest text-white/30">
                <Link href="/about" className="hover:text-blue-400 transition-colors">About</Link>
                <Link href="/contribute" className="hover:text-blue-400 transition-colors">Contribute</Link>
                {/* <a href="https://twitter.com/devbio" className="hover:text-blue-400 transition-colors">Twitter</a> */}
                <a href="https://github.com/devtofunmi/devbio" className="hover:text-blue-400 transition-colors">GitHub</a>
            </div>

            <p className="text-white/20 text-xs font-medium">
                © {new Date().getFullYear()} DevBio. Built for the cracked.
            </p>
        </div>
    </footer>
);

export default Footer;