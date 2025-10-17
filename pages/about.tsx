import Image from 'next/image';
import { FaTwitter, FaInstagram, FaTiktok } from 'react-icons/fa';

interface SocialCardProps {
    icon: React.ReactNode;
    text: string;
    href: string;
    iconColor: string; 
}

const SocialCard: React.FC<SocialCardProps> = ({ icon, text, href, iconColor }) => (
    <div tabIndex={0} className="relative group transition-transform duration-300 ease-in-out hover:-rotate-2 focus:-rotate-2 rounded-2xl overflow-hidden">
        <a 
            href={href}
            className="relative bg-white rounded-2xl p-6 shadow-xl group-hover:shadow-none transition-shadow border border-gray-200 flex items-center h-full"
            target="_blank"
            rel="noopener noreferrer"
        >
            <span className={`text-2xl mr-4 ${iconColor}`}>{icon}</span>
            <span className="font-medium text-gray-800">{text}</span>
        </a>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300"></div>
    </div>
);


interface FeatureCardProps {
    title: string;
    subtitle: string;
    imagePath: string; 
    isClaimCard: boolean; 
}

const BentoClaimMockImage: React.FC = () => (
    <div className="relative h-24 mt-2 rounded-lg overflow-hidden bg-gray-500/10">
        <div className="absolute inset-0  p-2 flex items-end justify-start">
            <p className="text-black text-left text-xs font-bold leading-tight">
                Your dev portfolio, <br/> supercharged.
            </p>
        </div>
        {/* Mock Social Icons on top right */}
        <div className="absolute top-2 right-2 flex flex-col space-y-1">
            <FaTwitter className="text-black text-sm opacity-80"/>
            <FaInstagram className="text-black text-sm opacity-80"/>
            <FaTiktok className="text-black text-sm opacity-80"/>
        </div>
    </div>
);


const FeatureCard: React.FC<FeatureCardProps> = ({ title, subtitle, isClaimCard }) => (
    <div tabIndex={0} className="relative group transition-transform duration-300 ease-in-out hover:-rotate-2 focus:-rotate-2 rounded-2xl overflow-hidden">
        <div className="relative bg-white rounded-2xl p-3 shadow-xl group-hover:shadow-none transition-shadow border border-gray-200 w-full h-full">
            <div className="flex items-start">
                
                <div>
                    <p className="font-semibold text-gray-800 leading-snug">{title}</p>
                    <p className="text-xs text-gray-500">{subtitle}</p>
                </div>
            </div>
            
            {isClaimCard && <BentoClaimMockImage />}
        </div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300"></div>
    </div>
);

const WhyDevBioCard: React.FC = () => (
    <div tabIndex={0} className="relative group transition-transform duration-300 ease-in-out hover:-rotate-2 focus:-rotate-2 rounded-2xl overflow-hidden">
        <div className="relative bg-white rounded-2xl p-6 shadow-xl group-hover:shadow-none transition-shadow border border-gray-200 w-full h-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why DevBio?</h2>
            <div className="space-y-4 text-gray-600">
                <p>
                    In a crowded digital world, developers struggle to stand out. Your GitHub profile shows your code, but what about the developer behind it? DevBio solves this by providing a single, beautiful page to showcase your projects, your skills, and your story. 
                </p>
                <p>
                    It&apos;s more than just a link-in-bio tool; it&apos;s a portfolio, a blog, and a personal brand builder, all in one. 
                </p>
                <p>
                    Our theme is designed to be clean, professional, and highly customizable. You can choose from a variety of themes or create your own to perfectly match your personal brand. We believe that a great presentation of your work can make a huge difference in your career.
                </p>
            </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300"></div>
    </div>
);


const geistSans = { className: "font-sans" };
const geistMono = { className: "font-mono" };

const About: React.FC = () => {
  return (
    <div className={`${geistSans.className} ${geistMono.className} font-sans min-h-screen bg-gray-50 p-8 sm:p-12 md:p-16`}>
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          
          {/* Left Column: Product Info & Actions */}
          <div className="md:col-span-1 lg:sticky top-16 h-min">
            <div className="flex flex-col items-start space-y-4">

              {/* mock logo */}
              <div className="bg-blue-400 h-20 w-20 sm:h-32 sm:w-32 md:h-40 md:w-40 lg:h-50 lg:w-50 rounded-full"></div>
              <h1 className="text-4xl font-extrabold text-gray-900 flex items-center">
                 Hi 👋🏻
              </h1>

              {/* Description */}
              <p className="text-2xl text-gray-600 max-w-sm">
                DevBio is the all-in-one link for developers to showcase their work, stack, and grow their personal brand. Create a beautiful, customizable page that reflects your skills and personality.
              </p>
              <div className="flex items-center space-x-4 pt-4 mb-16">
                <button
                  className="px-6 py-3 cursor-pointer text-white font-semibold bg-blue-400 rounded-xl shadow-lg hover:bg-blue-500 transition duration-150 flex items-center"
                >
                  Create Your DevBio
                </button>
               
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:col-span-1">
            <div className="w-full">
               
                
                {/* Main grid structure for the social links and Bento cards */}
                <div className="grid grid-cols-1 gap-4">
                    
                    <SocialCard 
                        icon={<FaTwitter />}
                        text="Follow us on Twitter"
                        href="https://twitter.com/devbio"
                        iconColor="text-blue-400"
                    />

                    <FeatureCard
                        title="Claim your DevBio"
                        subtitle="devbio.me"
                        imagePath="/file.svg" 
                        isClaimCard={true}
                    />
                    <WhyDevBioCard />
                </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default About;
