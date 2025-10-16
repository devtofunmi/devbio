import React from 'react';


const Features: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      {/* Main Grid: Responsive 12-column structure with consistent spacing */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-12 max-w-7xl mx-auto">
        
        
        {/* 1. Project List */}
        <div className="md:col-span-3 bg-white p-6 rounded-xl shadow-lg">
          <h3 className="font-bold text-lg text-gray-800 mb-2">Project List</h3>
          <p className="text-gray-600">Showcase your projects with titles, descriptions, and links.</p>
        </div>

        {/* 2. Built-in Analytics */}
        <div className="md:col-span-6 bg-white p-6 rounded-xl shadow-lg">
          <h3 className="font-bold text-lg text-gray-800 mb-2">Built-in Analytics</h3>
          <p className="text-gray-600">See who is viewing your profile, which projects get the most attention, and where your traffic is coming from.</p>
        </div>

        {/* 3. Tech Stack Visuals */}
        <div className="md:col-span-3 bg-white p-6 rounded-xl shadow-lg">
          <h3 className="font-bold text-lg text-gray-800 mb-2">Tech Stack Visuals</h3>
          <p className="text-gray-600">Beautifully display your languages and frameworks with customizable icons and progress bars.</p>
        </div>
        
        <div className="md:col-span-3 md:col-start-10 md:row-start-2 bg-white p-6 rounded-xl shadow-lg">
          <h3 className="font-bold text-lg text-gray-800 mb-2">Customizable Profile</h3>
          <p className="text-gray-600">Make a professional first impression with a customizable profile, including your name, a detailed 'about' section, and a profile picture.</p>
        </div>

        

        <div className="md:col-span-3 bg-white p-4 rounded-xl shadow-lg flex flex-col justify-between">
            <div className="flex items-start space-x-4">
               
               <h3 className="font-bold text-lg text-gray-800 mb-2">Custom Domains</h3>
          <p className="text-gray-600">Link your own domain (e.g., alex.dev) to your DevBio for a truly professional and memorable brand.</p>
        
            </div>
           
        </div>

        
        <div className="md:col-span-5 bg-white p-6 rounded-xl shadow-lg">
        <h3 className="font-bold text-start text-lg text-gray-800 mb-2">Github Contribution</h3>
            <div className="text-start text-sm">
            
          <p className="text-gray-600"> Embed live, interactive code snippets from services like GitHub Gists or CodePen to demonstrate your skills.</p>          
          <div className="mt-4 w-full h-32 bg-gray-50 p-3 rounded-lg flex flex-wrap gap-1 border border-gray-200">
                {Array(91).fill(0).map((_, i) => (
                    <div key={i} className={`w-3 h-3 rounded-sm ${i % 6 === 0 ? 'bg-green-600' : i % 4 === 0 ? 'bg-green-400' : 'bg-green-200'}`}></div>
                ))}
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Features;