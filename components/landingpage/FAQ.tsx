import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';

const faqs = [
  {
    question: 'What is DevBio?',
    answer: 'DevBio is the ultra-premium bio link for developers. It connects your engineering DNA—GitHub stats, tech stack, and projects—into one stunning, shareable link.',
  },
  {
    question: 'Is it really free?',
    answer: 'Absolutely. We believe every developer deserves a world-class profile. The core platform is free forever for individual engineers.',
  },
  {
    question: 'Can I showcase any tech stack?',
    answer: 'Yes! From obscure COBOL to the latest AI frameworks, our platform is built by engineers, for engineers. If you code it, you can showcase it.',
  },
  {
    question: 'Are custom domains supported?',
    answer: 'Custom domains are currently in beta. You will soon be able to point yourname.dev or yourname.me directly to your DevBio.',
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-black py-24 px-6 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-extrabold text-gradient mb-6 tracking-tight">Got Questions?</h2>
          <p className="text-xl text-white/40 font-light">Everything you need to know about DevBio.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className={`glass-card rounded-[2rem] overflow-hidden transition-all duration-500 ${activeIndex === index ? 'border-blue-500/30' : ''}`}
            >
              <button
                className="w-full flex justify-between items-center text-left p-8 focus:outline-none group"
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              >
                <span className={`text-xl md:text-2xl font-bold transition-colors ${activeIndex === index ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
                  {faq.question}
                </span>
                <FiChevronDown
                  className={`text-2xl transition-transform duration-500 ${activeIndex === index ? 'rotate-180 text-blue-400' : 'text-white/20'}`}
                />
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                  >
                    <div className="px-8 pb-8 text-lg text-white/50 leading-relaxed font-light border-t border-white/5 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
