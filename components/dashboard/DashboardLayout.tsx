import React, { useState } from "react";
import Sidebar from "./Sidebar";
import SupportModal from "./SupportModal";
import { FiHeart } from "react-icons/fi";
import { motion } from "framer-motion";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [supportModalOpen, setSupportModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white flex overflow-hidden">
      <Sidebar />
      <main className="flex-1 w-full relative z-10 overflow-y-auto lg:ml-80">
        <div className="max-w-6xl mx-auto p-6 md:p-12 md:pb-32">
          {children}
        </div>
      </main>

      {/* Floating Support Button */}
      <div className="fixed bottom-24 md:bottom-8 right-6 md:right-8 z-[100]">
        <motion.button
          animate={{
            y: [0, -12, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          whileHover={{ scale: 1.1, y: 0 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSupportModalOpen(true)}
          className="w-14 h-14 cursor-pointer bg-red-500 text-white rounded-full flex items-center justify-center shadow-2xl shadow-red-500/40 hover:bg-red-600 transition-all group relative"
        >
          <FiHeart size={24} className="group-hover:animate-pulse" />

          {/* Tooltip */}
          <div className="absolute right-full mr-4 px-3 py-2 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
            Support the mission
          </div>
        </motion.button>
      </div>

      <SupportModal
        isOpen={supportModalOpen}
        onClose={() => setSupportModalOpen(false)}
      />
    </div>
  );
};

export default DashboardLayout;