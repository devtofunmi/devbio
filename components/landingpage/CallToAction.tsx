import React from 'react';
import Link from 'next/link';
import { useKeenSlider } from 'keen-slider/react';
import { motion } from 'framer-motion';

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
            spacing: 0,
        },
    });

    return (
        <div ref={sliderRef} className="keen-slider h-[60px] md:h-[80px]">
            {usernames.map((name, index) => (
                <div className="keen-slider__slide flex items-center justify-start text-blue-400 font-bold" key={index}>
                    <span>{name}</span>
                </div>
            ))}
        </div>
    );
};

const CallToAction: React.FC = () => (
    <section className="bg-black py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/5 blur-[120px] rounded-full scale-150 translate-y-1/2" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                className="text-5xl md:text-8xl font-black mb-12 text-white leading-[1.1] tracking-tighter"
            >
                Claim Your <br />
                <span className="text-gradient">Identity.</span>
            </motion.h2>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.2 }}
                className="glass-card p-1 items-center rounded-3xl md:rounded-[3rem] inline-flex mb-12 border-white/10 group hover:border-blue-500/50 transition-colors"
            >
                <div className="flex items-center px-6 md:px-12 py-6 gap-1 md:gap-2">
                    <span className="text-white/30 text-2xl md:text-6xl font-bold tracking-tighter">devbio.co/</span>
                    <div className="text-2xl md:text-6xl w-[140px] md:w-[350px]">
                        <LinkSlider />
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 0.4 }}
            >
                <Link href="/signup">
                    <button className="bg-white text-black font-extrabold px-12 py-6 rounded-2xl text-xl md:text-2xl hover:scale-[1.05] active:scale-[0.98] transition-all shadow-2xl shadow-blue-500/10 cursor-pointer">
                        Get Started for Free
                    </button>
                </Link>
                <p className="mt-8 text-white/30 font-medium uppercase tracking-widest text-xs">
                    No credit card required. Built for engineers.
                </p>
            </motion.div>
        </div>
    </section>
);

export default CallToAction;