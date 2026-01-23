import React from 'react';

const SocialProof: React.FC = () => (
    <section id="social-proof" className="flex flex-col bg-[#3b82f6] text-black items-center justify-center py-30 px-6 text-center">
        <h3 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 tracking-tighter">
            Real Projects. Real Data.
        </h3>
        <h3 className="text-4xl sm:text-5xl md:text-6xl font-black mb-8 tracking-tighter">
            Immediate Credibility.
        </h3>
        <p className="text-xl md:text-2xl max-w-3xl font-medium">
            Stop telling people what you can do. <span className="text-white font-black underline">Show them</span> with a living proof-of-work that top-tier engineering teams actually trust.
        </p>
    </section>
);

export default SocialProof;