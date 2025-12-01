import React from 'react';
import Link from 'next/link';
import { useKeenSlider } from 'keen-slider/react';


const usernames = ['alexj', 'jy06dev', 'mugeeb', 'john', 'xt42io', 'devmaster', 'ttx2', 'vuemaster', 'angdev'];

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
                    <span className="text-blue-400 text-3xl md:text-4xl text-center">{name}</span>
                </div>
            ))}
        </div>
    );
};

const CallToAction: React.FC = () => (
    <section className="flex flex-col items-center justify-center py-16 px-6 ">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 text-white text-center">Ready to build your developer brand?</h2>
         <div className="flex justify-center items-center font-mono mt-4">
            <span className="text-white text-3xl md:text-5xl">devbio.co/</span>
            <div className="flex justify-center  text-3xl md:text-5xl w-48 md:w-64">
            <LinkSlider />
            </div>
        </div>
        <Link href="/signup" className="inline-block mt-10 rounded-full bg-blue-400 text-white font-bold px-10 py-4 text-xl md:text-2xl hover:bg-blue-500 transition transform hover:scale-105">
            Get Your Free DevBio
        </Link>
    </section>
);

export default CallToAction;