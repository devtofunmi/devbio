
import { useState } from 'react';

const faqs = [
  {
    question: 'What is DevBio?',
    answer: 'DevBio is a platform for developers to create a professional online presence and showcase their skills and projects.',
  },
  {
    question: 'Is DevBio free?',
    answer: 'Yes, DevBio offers a free tier with all the essential features to create a stunning developer portfolio.',
  },
  {
    question: 'What stacks can I showcase on my DevBio?',
    answer: 'You can showcase any technology you work with. Our platform is flexible and allows you to add a wide range of skills and projects.',
  },
  {
    question: 'Can I use my own domain name?',
    answer: 'This feature is coming soon! We are working on allowing users to connect their own domain names to their DevBio profiles.',
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-[#0a0a0a] py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-center text-white mb-12">Got Questions? Answered</h2>
        <div className="max-w-3xl mx-auto grid gap-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-lg transition-transform duration-300 hover:rotate-2 active:rotate-2">
              <button
                className="w-full flex justify-between items-center text-left text-xl font-medium text-white p-6 focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                <svg
                  className={`w-6 h-6 transform transition-transform ${
                    activeIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeIndex === index && (
                <div className="px-6 pb-6 text-lg text-gray-300">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
