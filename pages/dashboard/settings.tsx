import React from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import AccountSettings from '../../components/dashboard/AccountSettings';
import { motion } from 'framer-motion';

const SettingsPage: React.FC = () => {
  return (
    <DashboardLayout>
      {/* Mobile Layout - No Fixed Border */}
      <div className="lg:hidden py-12 px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-3">
            Account <span className="text-gradient">Settings</span>
          </h1>
          <p className="text-white/40 text-base font-light italic">Manage your profile and security preferences.</p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <AccountSettings />
        </motion.div>
      </div>

      {/* Desktop Layout - Fixed Border */}
      <div className="hidden lg:block fixed inset-0 lg:left-80 p-8 z-10">
        <div className="glass-card w-full max-w-6xl h-full mx-auto rounded-[3rem] border-white/5 flex flex-col overflow-hidden">
          {/* Fixed Header */}
          <div className="flex-shrink-0 text-center px-10 pt-10 pb-8">
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-3">
              Account <span className="text-gradient">Settings</span>
            </h1>
            <p className="text-white/40 text-base font-light italic">Manage your profile and security preferences.</p>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-10 pb-10 custom-scrollbar">
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <AccountSettings />
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;