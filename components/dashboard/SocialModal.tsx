
import React from "react";

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
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md m-4 relative">
        {socials.map((social) => (
          <div key={social.name} className="flex items-center mb-4">
            <div className="text-2xl mr-4 text-gray-800">{social.icon}</div>
            <input
              type="text"
              value={social.href}
              onChange={(e) => handleSocialChange(social.name, e.target.value)}
              className="flex-1 p-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black placeholder-gray-500 w-full"
              placeholder={`Enter your ${social.name} handle`}
            />
          </div>
        ))}
        <div className="flex justify-end space-x-4 mt-5">
          <button
            onClick={() => setSocialModalOpen(false)}
            className="px-6 py-4 w-full cursor-pointer bg-gray-100 text-center text-gray-800 rounded-full hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => setSocialModalOpen(false)}
            className="px-6 py-4 w-full cursor-pointer bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors shadow-md"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialModal;
