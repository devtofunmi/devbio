import React from "react";
import Sidebar from "./Sidebar";
import { BackgroundBeams } from "../BackgroundBeams";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="min-h-screen bg-black text-white flex overflow-hidden">
      <BackgroundBeams />
      <Sidebar />
      <main className="flex-1 w-full relative z-10 overflow-y-auto lg:ml-80">
        <div className="max-w-6xl mx-auto p-6 md:p-12 md:pb-32">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;