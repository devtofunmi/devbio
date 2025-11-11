import React, { useState, useRef, useEffect, useMemo } from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import ThemeSettings from '../../components/dashboard/ThemeSettings';
import AccountSettings from '../../components/dashboard/AccountSettings';
import { FiSun, FiUser } from 'react-icons/fi';
import { motion } from 'framer-motion';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('theme');
  const [tabPositions, setTabPositions] = useState<{ [key: string]: DOMRect }>({});
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  // Use useMemo to avoid recreating tabs array on every render
  const tabs = useMemo(
    () => [
      { id: 'theme', name: 'Theme', icon: FiSun },
      { id: 'account', name: 'Account', icon: FiUser },
    ],
    []
  );

  useEffect(() => {
    const positions: { [key: string]: DOMRect } = {};
    tabs.forEach((tab) => {
      const el = tabRefs.current[tab.id];
      if (el) positions[tab.id] = el.getBoundingClientRect();
    });
    setTabPositions(positions);

    const handleResize = () => {
      const newPositions: { [key: string]: DOMRect } = {};
      tabs.forEach((tab) => {
        const el = tabRefs.current[tab.id];
        if (el) newPositions[tab.id] = el.getBoundingClientRect();
      });
      setTabPositions(newPositions);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [tabs]);

  const geistSans = { className: 'font-sans' };

  const renderContent = () => {
    switch (activeTab) {
      case 'theme':
        return <ThemeSettings />;
      case 'account':
        return <AccountSettings />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className={`${geistSans.className} max-w-4xl mx-auto py-8`}>
        <div className="relative flex justify-center mb-8">
          <div className="flex rounded-full border border-gray-200 p-1 relative">
            {/* Sliding highlight */}
            {tabPositions[activeTab] && (
              <motion.div
                layout
                className="absolute bg-blue-400 rounded-full top-1 bottom-1 z-0"
                initial={false}
                animate={{
                  left: tabRefs.current[activeTab]?.offsetLeft,
                  width: tabRefs.current[activeTab]?.offsetWidth,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}

            {tabs.map((tab) => (
              <button
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[tab.id] = el ?? null; 
                }}
                className={`relative z-10 px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2 transition-colors duration-200 ${
                  activeTab === tab.id ? 'text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon size={16} /> {tab.name}
              </button>
            ))}
          </div>
        </div>

        <div>{renderContent()}</div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;