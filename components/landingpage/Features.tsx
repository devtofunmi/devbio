import React from 'react';
import { FaReact, FaNodeJs, FaDatabase, FaJs, FaHtml5 } from 'react-icons/fa';

const Features: React.FC = () => {
  const cardClasses = "bg-white p-6 rounded-xl border border-gray-200 transform transition-all duration-300 active:-rotate-2 hover:rotate-2 relative group overflow-hidden";

  return (
    <div  className="min-h-screen  p-4 md:p-8">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-12 max-w-7xl mx-auto">

        {/* 1. Project List */}
        <div className={`md:col-span-3 ${cardClasses}`}>
          <h3 className="font-bold text-lg text-gray-800 mb-2">Project List</h3>
          <p className="text-gray-600 mb-4">Showcase your projects with titles, descriptions, and links.</p>
          <div className="space-y-3">
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
              <p className="font-semibold text-sm text-gray-700">Project Alpha</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
              <p className="font-semibold text-sm text-gray-700">Project Beta</p>
            </div>
          </div>
           <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* 2. Built-in Analytics */}
        <div className={`md:col-span-6 ${cardClasses} transform md:-translate-y-10`}>
          <h3 className="font-bold text-lg text-gray-800 mb-2">Built-in Analytics</h3>
          <p className="text-gray-600 mb-4">See who is viewing your profile and where your traffic is coming from.</p>
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 h-32 flex items-end space-x-2">
            <div className="w-1/4 bg-blue-400 h-1/3 rounded-t-md"></div>
            <div className="w-1/4 bg-blue-400 h-2/3 rounded-t-md"></div>
            <div className="w-1/4 bg-blue-400 h-1/2 rounded-t-md"></div>
            <div className="w-1/4 bg-blue-400 h-3/4 rounded-t-md"></div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* 3. Tech Stack Visuals */}
        <div className={`md:col-span-3 ${cardClasses}`}>
          <h3 className="font-bold text-lg text-gray-800 mb-2">Tech Stack Visuals</h3>
          <p className="text-gray-600 mb-4">Display your languages and frameworks.</p>
          <div className="flex justify-around items-center h-24 text-2xl text-gray-500">
            <FaReact className="hover:text-blue-500" />
            <FaNodeJs className="hover:text-green-500" />
            <FaDatabase className="hover:text-purple-500" />
            <FaJs className="hover:text-yellow-500" />
            <FaHtml5 className="hover:text-orange-500" />
          </div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <div className={`md:col-span-3 md:col-start-10 md:row-start-2 ${cardClasses}`}>
          <h3 className="font-bold text-lg text-gray-800 mb-2">Customizable Profile</h3>
          <p className="text-gray-600 mb-4">Make a professional first impression.</p>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gray-300"></div>
            <div>
              <div className="w-24 h-4 bg-gray-300 rounded-md mb-2"></div>
              <div className="w-16 h-3 bg-gray-200 rounded-md"></div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300"></div>
        </div>

        <div className={`md:col-span-3 ${cardClasses} flex flex-col justify-between`}>
            <div className="flex items-start space-x-4">
               <h3 className="font-bold text-lg text-gray-800 mb-2">Custom Domains</h3>
            </div>
            <p className="text-gray-600 mb-4">Link your own domain for a professional brand.</p>
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
              <p className="text-center font-mono text-blue-600">yourname.dev</p>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300"></div>
        </div>

        <div className={`md:col-span-6 ${cardClasses} transform translate-y-10`}>
          <h3 className="font-bold text-start text-lg text-gray-800 mb-2">Github Contribution</h3>
          <p className="text-gray-600 mb-4">Embed your GitHub contributions and activity.</p>
          <div className="mt-4 grid grid-flow-col grid-rows-7 gap-1">
            {Array(182).fill(0).map((_, i) => (
                <div key={i} className={`aspect-square rounded-sm ${i % 6 === 0 ? 'bg-green-600' : i % 4 === 0 ? 'bg-green-400' : 'bg-green-200'}`}></div>
            ))}
          </div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>
    </div>
  );
};

export default Features;