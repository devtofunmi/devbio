
import { useState } from 'react';

const faqs = [
  {
    question: 'What is Dev.Bio?',
    answer: 'Dev.Bio is a platform for developers to create a professional online presence and showcase their skills and projects.',
  },
  {
    question: 'Is Dev.Bio free?',
    answer: 'Yes, Dev.Bio offers a free tier with all the essential features to create a stunning developer portfolio.',
  },
  {
    question: 'What technologies can I showcase on my Dev.Bio?',
    answer: 'You can showcase any technology you work with. Our platform is flexible and allows you to add a wide range of skills and projects.',
  },
  {
    question: 'Can I use my own domain name?',
    answer: 'This feature is coming soon! We are working on allowing users to connect their own domain names to their Dev.Bio profiles.',
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-black mb-12">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 py-4">
              <button
                className="w-full flex justify-between items-center text-left text-lg font-medium text-gray-800 focus:outline-none"
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
                <div className="mt-4 text-gray-600">
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
