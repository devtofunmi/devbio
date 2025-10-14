import React from 'react';
import SimulatedProfile from '../components/SimulatedProfile';
import CallToAction from '../components/sections/CallToAction';
import CrackedDevs from '../components/sections/CrackedDevs';
import Features from '../components/sections/Features';
import Footer from '../components/sections/Footer';
import Hero from '../components/sections/Hero';
import SocialProof from '../components/sections/SocialProof';
import Testimonials from '../components/sections/Testimonials';

const geistSans = { className: "font-sans" };
const geistMono = { className: "font-mono" };

const Home: React.FC = () => {
    return (
        <div className={`${geistSans.className} ${geistMono.className} font-sans min-h-screen bg-[#f7f9fb] flex flex-col`}>
            <Hero />
            <section className="bg-white px-6">
                <SimulatedProfile />
            </section>
            <Features />
            <SocialProof />
            <Testimonials />
            <CrackedDevs />
            <CallToAction />
            <Footer />
        </div>
    );
}

export default Home;