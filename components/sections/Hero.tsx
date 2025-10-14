import React from 'react';
import { useKeenSlider } from 'keen-slider/react';
import Link from 'next/link';

const usernames = ['alexj', 'sarah_dev', 'mugeeb', 'john_doe', 'jane_doe', 'dev_master', 'react_god', 'vue_master', 'angular_dev'];

const animation = { duration: 10000, easing: (t: number) => t }

const LinkSlider: React.FC = () => {
    const [sliderRef] = useKeenSlider<HTMLDivElement>({
        loop: true,
        vertical: true,
        renderMode: "performance",
        drag: false,
        created(s) {
            s.moveToIdx(5, true, animation)
        },
        updated(s) {
            s.moveToIdx(s.track.details.abs + 5, true, animation)
        },
        animationEnded(s) {
            s.moveToIdx(s.track.details.abs + 5, true, animation)
        },
        slides: {
            perView: 1,
            spacing: 15,
        },
    });

    return (
        <div ref={sliderRef} className="keen-slider" style={{ height: 40 }}>
            {usernames.map((name, index) => (
                <div className="keen-slider__slide" key={index}>
                    <span className="text-blue-600">{name}</span>
                </div>
            ))}
        </div>
    );
};

const Hero: React.FC = () => (
    <section className="flex flex-col items-center justify-center pt-20 pb-12 px-6 text-center bg-white border-b border-gray-100">
       
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 text-gray-900">
            The Dev Portfolio You Deserve.
        </h1>
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Showcase Your Code, Stats, and Stack.
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mb-12">Your professional developer profile, all in one link. Connect, share, and grow your presence with a beautiful, customizable page.</p>

        <a href="/signup" className="inline-block rounded-full bg-blue-600 text-white px-10 py-4 font-bold text-xl shadow-lg hover:bg-blue-700 transition transform hover:scale-105">
            Create Your DevBio
        </a>
        <Link href="/login" className="mt-3 text-sm text-gray-500 hover:text-blue-600 transition">Log In</Link>

        <div className="mt-16 text-2xl font-semibold text-gray-900">Your unique link.</div>
        <div className="text-gray-500 mb-6">And btw, the good ones are still free.</div>
        <div className="flex justify-center w-[300px] items-center text-3xl font-mono mt-4">
            <span className="text-gray-400">devbio.co/</span>
            <LinkSlider />
        </div>
    </section>
);

export default Hero;