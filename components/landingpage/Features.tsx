import React from 'react';


const Features: React.FC = () => {
  return (
    // Outer container: Full screen, light background, centered, with padding.
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      {/* Main Grid: Responsive 12-column structure with consistent spacing */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-12 max-w-7xl mx-auto">
        
        {/* === TOP ROW === */}
        
        {/* 1. Medium Card (col-span-3) */}
        <div className="md:col-span-3 bg-white p-4 rounded-xl shadow-lg flex flex-col justify-between">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-black rounded-full" />
            <span className="font-semibold text-sm">Medium</span>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
            <p className="text-xs text-gray-500">jonnie barnes</p>
            <h3 className="font-bold text-gray-800">The Day We Raced That Drive</h3>
          </div>
          <button className="mt-4 text-sm font-medium text-white bg-green-500 hover:bg-green-600 px-3 py-1 rounded-full w-fit">
            Follow: 553
          </button>
        </div>

        {/* 2. Apple Quote Card (col-span-6) */}
        <div className="md:col-span-6 bg-white p-6 rounded-xl shadow-lg flex flex-col justify-center">
          <blockquote className="text-xl font-light italic text-gray-700">
            <p className="mb-4">“Here's to the crazy ones.</p>
            <p className="mb-4">The misfits. The rebels. The trouble makers. The round pegs in the square holes.</p>
            <p className="mb-4">The ones who see things differently.</p>
            <p className="mt-4 text-sm font-medium text-gray-500">— Apple, "Think Different"</p>
          </blockquote>
        </div>

        {/* 3. YouTube/UltraLinx Card (col-span-3) */}
        <div className="md:col-span-3 bg-white p-4 rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                <div className="w-3 h-2 bg-white rounded-sm" />
              </div>
              <span className="font-semibold text-sm">Olur / UltraLinx</span>
            </div>
            <button className="text-xs font-semibold text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded-full">
              Subscribe 29k
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="aspect-square bg-gray-200 rounded-lg">
                {/* 

[Image of Man working at desk]
 */}
            </div>
            <div className="aspect-square bg-gray-200 rounded-lg">
                {/*  */}
            </div>
            <div className="aspect-square bg-gray-200 rounded-lg">
                {/*  */}
            </div>
            <div className="aspect-square bg-gray-200 rounded-lg">
                {/*  */}
            </div>
          </div>
        </div>
        
        {/* 4. GitHub and Instagram Cards (Stacked, col-span-3) - *Adjusted for space* */}
        {/* To make the layout fit the image, we'll tuck the GitHub and Instagram cards to the right of the quote/YouTube cards. */}
        {/* The original image suggests these cards overlap/are placed where space allows, so we'll treat them as a continuous flow. */}
        
        {/* GitHub Card (Adjusted to fit next to YouTube or flow below) */}
        <div className="md:col-span-3 md:col-start-10 md:row-start-2 bg-white p-4 rounded-xl shadow-lg hidden md:block">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gray-800 rounded-full" />
                    <span className="font-semibold text-sm">stable-diffusion</span>
                </div>
                <button className="text-xs font-semibold text-white bg-gray-800 hover:bg-gray-900 px-3 py-1 rounded-full">
                    Follow
                </button>
            </div>
            {/* Contribution Graph Placeholder */}
            <div className="grid grid-cols-10 grid-rows-7 gap-0.5">
                {Array.from({ length: 70 }).map((_, i) => (
                    <div
                        key={i}
                        className={`w-2 h-2 rounded-sm ${
                            i % 5 === 0 ? 'bg-green-600' : i % 3 === 0 ? 'bg-green-400' : 'bg-gray-200'
                        }`}
                    />
                ))}
            </div>
        </div>

        {/* Instagram Card (Adjusted to fit next to YouTube or flow below) */}
        <div className="md:col-span-3 md:col-start-13 md:row-start-1 bg-white p-4 rounded-xl shadow-lg hidden">
            {/* This card is partially obscured and seems to be in an overlapping layer, we'll place it logically. */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-pink-600 rounded-full" />
                    <span className="font-semibold text-sm">Rogie's Sketchbook</span>
                </div>
                <button className="text-xs font-semibold text-white bg-pink-600 hover:bg-pink-700 px-3 py-1 rounded-full">
                    Follow: 25k
                </button>
            </div>
            {/* Profile Icons Placeholder */}
            <div className="flex -space-x-2 rtl:space-x-reverse">
                <div className="w-10 h-10 border-2 border-white rounded-full bg-red-400" />
                <div className="w-10 h-10 border-2 border-white rounded-full bg-purple-400" />
                <div className="w-10 h-10 border-2 border-white rounded-full bg-yellow-400" />
            </div>
        </div>

        {/* === MIDDLE ROW (Starts below the Quote Card) === */}
        
        {/* 5. Spotify Card (col-span-3) */}
        <div className="md:col-span-3 bg-white p-4 rounded-xl shadow-lg flex flex-col justify-between">
            <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-green-500 rounded-md flex items-center justify-center text-white">
                    <div className="w-4 h-4 rounded-full bg-black" />
                </div>
                <div>
                    <p className="text-xs text-gray-500">Spotify</p>
                    <h4 className="font-semibold text-gray-800">The Girl Who Loved Me</h4>
                    <p className="text-xs text-gray-400">Hard Fork</p>
                    <div className="w-16 h-16 mt-1 bg-yellow-600 rounded-md">
                        {/*  */}
                    </div>
                </div>
            </div>
            <button className="mt-4 text-sm font-medium text-white bg-green-500 hover:bg-green-600 px-3 py-1 rounded-full w-fit">
                ▶ Play
            </button>
        </div>

        {/* 6. Booking Calendar Widget (col-span-5) */}
        <div className="md:col-span-5 bg-white p-6 rounded-xl shadow-lg">
            <h4 className="font-semibold mb-4 flex items-center">
                Book a feedback session <span className="ml-2 text-xl">🗓️</span>
            </h4>
            
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 text-center text-sm">
                {/* Day Labels */}
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(day => (
                    <span key={day} className="font-bold text-gray-400">{day}</span>
                ))}
                
                {/* Date Boxes */}
                {[
                    ...Array(3).fill(''), // Empty cells for alignment
                    ...[1, 2, 3, 4, 5, 6, 7],
                    ...[8, 9, 10, 11, 12, 13, 14],
                    ...[15, 16, 17, 18, 19, 20, 21],
                    ...[22, 23, 24, 25, 26, 27, 28],
                    ...[29, 30, 31, '', '', '', '']
                ].map((date, index) => (
                    <div 
                        key={index}
                        className={`w-8 h-8 flex items-center justify-center rounded-full cursor-pointer 
                            ${[12, 13, 14, 15, 26, 27, 28, 30].includes(date as number) 
                                ? 'bg-blue-600 text-white font-bold' 
                                : date === '' ? 'text-gray-300' : 'text-blue-600 hover:bg-blue-50'}`}
                    >
                        {date}
                    </div>
                ))}
            </div>
            <button className="mt-6 w-full text-base font-medium text-white bg-blue-600 hover:bg-blue-700 py-2 rounded-lg">
                Book Call
            </button>
        </div>

        {/* 7. Article Card (col-span-4 - Adjusted) */}
        <div className="md:col-span-4 bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-4">
                <div className="flex items-center space-x-2 text-sm text-purple-700 mb-2">
                    <span className="font-bold">V</span>
                    <p className="text-xs text-gray-500">theverge.com</p>
                </div>
                <h4 className="font-semibold text-gray-800">Apple don't even tell Ben Stiller how many of you are watching Severance</h4>
            </div>
            <div className="w-full h-48 bg-cover bg-center" style={{backgroundImage: `url('/path-to-article-image.jpg')`}}>
                {/* 

[Image of Man looking at computer]
 */}
            </div>
        </div>

       
       

      </div>
    </div>
  );
};

export default Features;