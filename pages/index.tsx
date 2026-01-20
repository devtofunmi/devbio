import React from 'react';
import Head from 'next/head';
import CallToAction from '../components/landingpage/CallToAction';
import CrackedDevs from '../components/landingpage/CrackedDevs';
import Features from '../components/landingpage/Features';
import Footer from '../components/landingpage/Footer';
import Hero from '../components/landingpage/Hero';
import SocialProof from '../components/landingpage/SocialProof';
// import Testimonials from '../components/landingpage/Testimonials';
import FAQ from '../components/landingpage/FAQ';
import Navbar from '../components/landingpage/Navbar';
import DonationCTA from '../components/landingpage/DonationCTA';

const geistSans = { className: "font-sans" };
const geistMono = { className: "font-mono" };

const Home: React.FC = () => {
    return (
        <div className={`${geistSans.className} ${geistMono.className} font-sans min-h-screen bg-black flex flex-col`}>
            <Head>
                <title>DevBio - The Ultimate Developer Portfolio Platform</title>
                <meta name="description" content="Create a stunning developer portfolio in minutes. Showcase your GitHub stats, projects, and tech stack with DevBio. The best link-in-bio for coders." />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://devbio.co/" />
                <meta property="og:title" content="DevBio - The Ultimate Developer Portfolio Platform" />
                <meta property="og:description" content="Create a stunning developer portfolio in minutes. Showcase your GitHub stats, projects, and tech stack with DevBio." />
                <meta property="og:image" content="https://devbio.co/devbio.png" />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://devbio.co/" />
                <meta property="twitter:title" content="DevBio - The Ultimate Developer Portfolio Platform" />
                <meta property="twitter:description" content="Create a stunning developer portfolio in minutes. Showcase your GitHub stats, projects, and tech stack with DevBio." />
                <meta property="twitter:image" content="https://devbio.co/devbio.png" />

                <link rel="canonical" href="https://devbio.co/" />
            </Head>
            <Navbar />
            <Hero />

            <SocialProof />
            <Features />
            <CrackedDevs />
            {/* <Testimonials /> */}
            <FAQ />
            <CallToAction />
            <DonationCTA />
            <Footer />
        </div>
    );
}

export default Home;