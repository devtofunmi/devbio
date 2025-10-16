import React from 'react';

const CallToAction: React.FC = () => (
    <section className="flex flex-col items-center justify-center py-16 px-6 bg-[#f7f9fb]">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900">Ready to build your developer brand?</h2>
        <a href="/signup" className="inline-block rounded-full bg-blue-400 text-white font-bold px-12 py-4 text-xl shadow-lg hover:bg-blue-500 transition transform hover:scale-105">
            Get Your Free DevBio
        </a>
    </section>
);

export default CallToAction;