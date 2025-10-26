import React from 'react';
import Sidebar from './Sidebar';

const geistSans = { className: "font-sans" };
const geistMono = { className: "font-mono" };

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className={`${geistSans.className} ${geistMono.className} font-sans min-h-screen bg-white flex`}>
      <Sidebar />
      <main className="flex-1 p-5 w-full md:pb-20 pb-16 lg:ml-80">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;