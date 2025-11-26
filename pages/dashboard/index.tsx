import React from "react";
import Link from "next/link";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { FaArrowRight, FaPlus } from "react-icons/fa";

const DashboardPage: React.FC = () => {
  const geistSans = { className: "font-sans" };

  return (
    <DashboardLayout>
      <div
        className={`${geistSans.className} text-gray-800 flex flex-col items-center justify-center text-center min-h-screen`}
      >
        <div className="max-w-xl w-full flex flex-col justify-center items-center">
          <p className="text-xl text-gray-600 mb-8">
            Showcase your skills, projects, and social profiles in a beautiful,
            customizable page.
          </p>
          <div
            className="w-32 h-32 flex border-2 dashed text-[#444444] rounded-full items-center justify-center"
          >
            <FaPlus className="text-4xl text-[#444444]" />
          </div>
          <Link
            href="/dashboard/edit"
            className="inline-flex mt-5 items-center px-8 py-4 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors shadow-lg"
          >
            Create Your Page <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
