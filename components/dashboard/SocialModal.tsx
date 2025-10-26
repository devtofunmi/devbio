
import React from "react";
import { FaTimes } from "react-icons/fa";

type Social = {
  name: string;
  icon: React.JSX.Element;
  href: string;
};

type SocialModalProps = {
  socials: Social[];
  handleSocialChange: (name: string, href: string) => void;
  setSocialModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SocialModal: React.FC<SocialModalProps> = ({
  socials,
  handleSocialChange,
  setSocialModalOpen,
}) => {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg m-4 relative transform transition-all duration-300 ease-in-out scale-100">
        <button onClick={() => setSocialModalOpen(false)} className="absolute cursor-pointer top-4 right-4 text-gray-400 hover:text-gray-600">
          <FaTimes  />
        </button>
        <div className="space-y-4 mt-3">
          {socials.map((social) => (
            <div key={social.name} className="flex items-center bg-gray-50 rounded-full p-1">
              <div className="text-2xl mx-3 text-gray-400">{social.icon}</div>
              <input
                type="text"
                value={social.href}
                onChange={(e) => handleSocialChange(social.name, e.target.value)}
                className="flex-1 p-3 bg-transparent focus:outline-none text-black placeholder-gray-400 w-full"
                placeholder={`Enter your ${social.name} handle`}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center space-x-4 mt-8">
          <button
            onClick={() => setSocialModalOpen(false)}
            className="px-8 py-3 w-full cursor-pointer bg-blue-400 text-white text-center rounded-full hover:bg-blue-500 transition-colors duration-300 shadow-lg"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialModal;
