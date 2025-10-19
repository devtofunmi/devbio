
import React, { useState } from 'react';
import { FaEdit, FaTwitter, FaGithub, FaLinkedin, FaPlus } from 'react-icons/fa';

const allSocials = [
  { name: 'Twitter', icon: <FaTwitter />, placeholder: 'https://twitter.com/username' },
  { name: 'GitHub', icon: <FaGithub />, placeholder: 'https://github.com/username' },
  { name: 'LinkedIn', icon: <FaLinkedin />, placeholder: 'https://linkedin.com/in/username' },
];

const SocialCard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [socialLinks, setSocialLinks] = useState<any[]>([]);
  const [showSocialIcons, setShowSocialIcons] = useState(true);

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleSave = () => {
    setIsModalOpen(false);
  };

  const handleLinkChange = (name: string, href: string) => {
    setSocialLinks(prev => {
      const existing = prev.find(l => l.name === name);
      if (existing) {
        return prev.map(l => l.name === name ? { ...l, href } : l);
      }
      return [...prev, { name, href, icon: allSocials.find(s => s.name === name)?.icon }];
    });
  };

  return (
    <div className="relative group transition-transform duration-300 ease-in-out hover:-rotate-1 focus:-rotate-1 rounded-2xl overflow-hidden">
      <div className="relative bg-white rounded-2xl p-6 shadow-xl group-hover:shadow-none transition-shadow border border-gray-200 w-full h-full">
        {socialLinks.filter(l => l.href).length === 0 ? (
          <div className="text-center cursor-pointer flex flex-col items-center justify-center h-full" onClick={handleEdit}>
            <FaPlus className="text-4xl text-gray-400 mb-2" />
            <h3 className="text-lg font-bold text-gray-800">Add your social links</h3>
          </div>
        ) : (
          <div className="text-center">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Social Links</h3>
            <div className="flex justify-center space-x-4">
              {socialLinks.filter(l => l.href).map((social) => (
                <a key={social.name} href={social.href} target="_blank" rel="noreferrer" className="flex flex-col items-center text-gray-600 hover:text-blue-500">
                  {showSocialIcons ? <span className="text-4xl">{social.icon}</span> : <span className="text-sm font-medium px-3 py-1 rounded-full bg-gray-200 text-gray-800">{social.name}</span>}
                </a>
              ))}
            </div>
          </div>
        )}
        <button onClick={handleEdit} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <FaEdit />
        </button>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300"></div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6">Edit Social Links</h2>
            <div className="flex items-center mb-4">
              <input type="checkbox" checked={showSocialIcons} onChange={() => setShowSocialIcons(!showSocialIcons)} className="mr-2" />
              <label>Show as icons</label>
            </div>
            <div className="space-y-4">
              {allSocials.map(social => (
                <div key={social.name}>
                  <label className="block text-sm font-medium text-gray-700">{social.name}</label>
                  <input
                    type="text"
                    placeholder={social.placeholder}
                    value={socialLinks.find(l => l.name === social.name)?.href || ''}
                    onChange={(e) => handleLinkChange(social.name, e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end">
              <button onClick={handleSave} className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialCard;
