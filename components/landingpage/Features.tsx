import React from 'react';
import { FaReact, FaNodeJs, FaDatabase, FaJs, FaHtml5 } from 'react-icons/fa';

const Features: React.FC = () => (
  <div id="features" className="text-2xl">
    {/* Project List Feature */}
    <div className="bg-blue-400 py-16 md:py-24 h-screen flex items-center">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-center">
          <div className="md:w-5/12 w-full transform transition-transform duration-500 hover:scale-105">
            <div className="bg-white p-6 rounded-xl border border-gray-200 w-full">
              <h3 className="font-bold text-xl md:text-2xl text-gray-800 mb-2">Project List</h3>
              <div className="space-y-3 mt-4">
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <p className="font-semibold text-lg md:text-xl text-gray-700">Project Alpha</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <p className="font-semibold text-lg md:text-xl text-gray-700">Project Beta</p>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-7/12 w-full">
            <h3 className="font-bold text-4xl md:text-5xl text-[#c8ea40] mb-3">Showcase Your Best Work</h3>
            <p className="text-white leading-relaxed text-xl md:text-2xl">
              Go beyond a simple list of projects. With DevBio, you can create a rich, detailed portfolio. Add descriptions, tech stacks, and live links.
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Built-in Analytics Feature */}
    <div className="bg-[#cee933] py-16 md:py-24 h-screen flex items-center">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row-reverse gap-8 lg:gap-12 items-center">
          <div className="md:w-5/12 w-full transform transition-transform duration-500 hover:scale-105">
            <div className="bg-slate-50 p-6 rounded-xl border border-gray-200 w-full">
              <h3 className="font-bold text-xl md:text-2xl text-gray-800 mb-2">Built-in Analytics</h3>
              <div className="bg-white p-3 rounded-lg border border-gray-200 h-32 flex items-end space-x-2 mt-4">
                <div className="w-1/4 bg-blue-400 h-1/3 rounded-t-md"></div>
                <div className="w-1/4 bg-blue-400 h-2/3 rounded-t-md"></div>
                <div className="w-1/4 bg-blue-400 h-1/2 rounded-t-md"></div>
                <div className="w-1/4 bg-blue-400 h-3/4 rounded-t-md"></div>
              </div>
            </div>
          </div>
          <div className="md:w-7/12 w-full">
            <h3 className="font-bold text-4xl md:text-5xl text-blue-400 mb-3">Understand Your Audience</h3>
            <p className="text-black leading-relaxed text-xl md:text-2xl">
              Knowledge is power. Our built-in analytics give you valuable insights into your profile&apos;s performance. See how many people are viewing your page, where they&apos;re coming from, and what content is most popular. Use this data to tailor your profile and grow your online presence.
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* GitHub Contributions Feature */}
    <div className="bg-[#860005] py-16 md:py-24 h-screen flex items-center">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-center">
          <div className="md:w-5/12 w-full transform transition-transform duration-500 hover:scale-105">
            <div className="bg-white p-6 rounded-xl border border-gray-200 w-full">
              <h3 className="font-bold text-xl md:text-2xl text-gray-800 mb-2">GitHub Contributions</h3>
              <div className="mt-4 grid grid-flow-col grid-rows-7 gap-1">
                {Array.from({ length: 182 }).map((_, i) => (
                  <div
                    key={i}
                    className={`aspect-square rounded-sm ${
                      i % 6 === 0 ? 'bg-green-600' : i % 4 === 0 ? 'bg-green-400' : 'bg-green-200'
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
          <div className="md:w-7/12 w-full">
            <h3 className="font-bold text-4xl md:text-5xl text-[#cee933] mb-3">Sync Your GitHub Activity</h3>
            <p className="text-white leading-relaxed text-xl md:text-2xl">
              Keep your profile dynamic and up-to-date automatically. DevBio seamlessly integrates with your GitHub account to display your contribution graph. It&rsquo;s the easiest way to show you&apos;re an active and engaged developer.
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Tech Stack Feature */}
    <div className="bg-gray-800 py-16 md:py-24 h-screen flex items-center">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row-reverse gap-8 lg:gap-12 items-center">
          <div className="md:w-5/12 w-full transform transition-transform duration-500 hover:scale-105">
            <div className="bg-slate-50 p-6 rounded-xl border border-gray-200 w-full">
              <h3 className="font-bold text-xl md:text-2xl text-gray-800 mb-2">Tech Stack Visuals</h3>
              <div className="flex justify-around items-center h-24 text-4xl md:text-5xl text-gray-500 mt-4">
                <FaReact className="hover:text-blue-500" />
                <FaNodeJs className="hover:text-green-500" />
                <FaDatabase className="hover:text-purple-500" />
                <FaJs className="hover:text-yellow-500" />
                <FaHtml5 className="hover:text-orange-500" />
              </div>
            </div>
          </div>
          <div className="md:w-7/12 w-full">
            <h3 className="font-bold text-4xl md:text-5xl text-white mb-3">Display Your Expertise</h3>
            <p className="text-gray-300 leading-relaxed text-xl md:text-2xl">
              Don&apos;t just list your skills show them. Our visual tech stack allows you to display the languages, frameworks, and tools you&apos;re proficient in. It&rsquo;s a quick and effective way for visitors to gauge your technical abilities.
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Customizable Profile Feature */}
    <div className="bg-purple-600 py-16 md:py-24 h-screen flex items-center">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-center">
          <div className="md:w-5/12 w-full transform transition-transform duration-500 hover:scale-105">
            <div className="bg-white p-6 rounded-xl border border-gray-200 w-full">
              <h3 className="font-bold text-xl md:text-2xl text-gray-800 mb-2">Customizable Profile</h3>
              <div className="bg-gray-50 p-4 mt-4 rounded-lg border border-gray-200 flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gray-300"></div>
                <div>
                  <div className="w-24 h-4 bg-gray-300 rounded-md mb-2"></div>
                  <div className="w-16 h-3 bg-gray-200 rounded-md"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-7/12 w-full">
            <h3 className="font-bold text-4xl md:text-5xl text-white mb-3">Make It Uniquely Yours</h3>
            <p className="text-gray-200 leading-relaxed text-xl md:text-2xl">
              Your personal brand matters. Choose from multiple themes and layouts to create a profile that reflects your style. Make a memorable first impression that sets you apart from the crowd.
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Custom Domains Feature */}
    <div className="bg-green-500 py-16 md:py-24 h-screen flex items-center">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row-reverse gap-8 lg:gap-12 items-center">
          <div className="md:w-5/12 w-full transform transition-transform duration-500 hover:scale-105">
            <div className="bg-slate-50 p-6 rounded-xl border border-gray-200 w-full">
              <h3 className="font-bold text-xl md:text-2xl text-gray-800 mb-2">Custom Domains</h3>
              <div className="bg-white p-3 mt-4 rounded-lg border border-gray-200">
                <p className="text-center font-mono text-blue-400 text-2xl md:text-3xl">yourname.dev</p>
              </div>
            </div>
          </div>
          <div className="md:w-7/12 w-full">
            <h3 className="font-bold text-4xl md:text-5xl text-white mb-3">Own Your Online Identity</h3>
            <p className="text-gray-100 leading-relaxed text-xl md:text-2xl">
              Strengthen your professional brand by linking your profile to your own custom domain. A personal domain like `yourname.dev` makes your portfolio more professional, easier to share, and more likely to be remembered.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Features;
