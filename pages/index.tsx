import React from 'react';
import SimulatedProfile from '../components/SimulatedProfile';
import CallToAction from '../components/landingpage/CallToAction';
import CrackedDevs from '../components/landingpage/CrackedDevs';
import Features from '../components/landingpage/Features';
import Footer from '../components/landingpage/Footer';
import Hero from '../components/landingpage/Hero';
import SocialProof from '../components/landingpage/SocialProof';
import Testimonials from '../components/landingpage/Testimonials';
import Navbar from '../components/landingpage/Navbar';

const geistSans = { className: "font-sans" };
const geistMono = { className: "font-mono" };

const Home: React.FC = () => {
    return (
        <div className={`${geistSans.className} ${geistMono.className} font-sans min-h-screen bg-white flex flex-col`}>
            <Navbar />
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