import React from 'react';
// 
import CallToAction from '../components/landingpage/CallToAction';
import CrackedDevs from '../components/landingpage/CrackedDevs';
import Features from '../components/landingpage/Features';
import Footer from '../components/landingpage/Footer';
import Hero from '../components/landingpage/Hero';
import SocialProof from '../components/landingpage/SocialProof';
import Testimonials from '../components/landingpage/Testimonials';
import FAQ from '../components/landingpage/FAQ';
import Navbar from '../components/landingpage/Navbar';
import DonationCTA from '../components/landingpage/DonationCTA';

const geistSans = { className: "font-sans" };
const geistMono = { className: "font-mono" };

const Home: React.FC = () => {
    return (
        <div className={`${geistSans.className} ${geistMono.className} font-sans min-h-screen bg-black flex flex-col`}>
            <Navbar />
            <Hero />

            <SocialProof />
            <Features />
            <CrackedDevs />
            <Testimonials />
            <FAQ />
            <CallToAction />
            <DonationCTA />
            <Footer />
        </div>
    );
}

export default Home;