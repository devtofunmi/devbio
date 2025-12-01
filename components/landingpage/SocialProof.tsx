import React from 'react';

const SocialProof: React.FC = () => (
    <section id="social-proof" className="flex flex-col bg-[#c8ea40] text-black items-center justify-center py-16 px-6 text-center">
        <h3 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
            Your Code Repos. Analytics.
        </h3>
        <h3 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-8">
            Tech Stacks. Social Links.
        </h3>
        <p className="text-xl md:text-2xl  max-w-3xl">
            All your development content <span className="text-[#6f90fe] font-bold">integrated</span> into your personal page. No more hiding your work behind simple text links.
        </p>
    </section>
);

export default SocialProof;