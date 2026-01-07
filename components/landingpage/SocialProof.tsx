import React from 'react';

const SocialProof: React.FC = () => (
    <section id="social-proof" className="flex flex-col bg-black border-y border-white/5 text-white items-center justify-center py-24 px-6 text-center relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-full bg-blue-600/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10">
            <h3 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 tracking-tighter">
                Your Code Repos. Analytics.
            </h3>
            <h3 className="text-4xl sm:text-5xl md:text-6xl font-black mb-8 tracking-tighter text-white/40">
                Tech Stacks. Social Links.
            </h3>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto font-light text-white/60 leading-relaxed">
                All your development content <span className="text-blue-500 font-bold">integrated</span> into your personal page. No more hiding your work behind simple text links.
            </p>
        </div>
    </section>
);

export default SocialProof;