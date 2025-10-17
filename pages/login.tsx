// components/LoginPage.tsx
import React from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi'; // Used for the password show/hide button
import { SiGithub, SiReact, SiNodedotjs, SiMongodb, SiNextdotjs, SiTailwindcss, SiX, SiLinkedin } from 'react-icons/si';
import Link from 'next/link';




const geistSans = { className: "font-sans" };
const geistMono = { className: "font-mono" };

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className={`${geistSans.className} ${geistMono.className} flex min-h-screen items-center justify-center bg-white p-4`}>
      <div className="flex flex-col lg:flex-row w-full max-w-6xl rounded-xl">
        {/* Left Side: Login Form */}
        <div className="flex-1 p-10 md:p-16">
          <h1 className="md:text-4xl text-2xl font-bold text-gray-900 mb-2">
            Log in to your Devbio
          </h1>
          <p className="text-xl text-gray-700 mb-10">
            Good to have you back!
          </p>

          <form className="max-w-sm">
            {/* Input Fields */}
            <div className="flex flex-col space-x-2 mb-4">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 p-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-500"
              />
              <div className="relative mt-5 flex-1">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-16 text-black placeholder-gray-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-0 h-full px-4 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                >
                  {/* Using an icon for the 'Show' button for better visual */}
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            
            <div className="relative flex py-5 items-center"><div className="flex-grow border-t border-gray-200"></div></div>

            {/* Github Sign-in Button */}
            <button
              type="button"
              className="flex cursor-pointer items-center justify-center w-full bg-gray-800 hover:bg-black text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-colors"
              onClick={() => console.log('GitHub Sign-in clicked')}
            >
              <SiGithub className="mr-2" size={20} />
              Login with Github
            </button>
            
            {/* Or Sign Up Link */}
            <p className="mt-4 text-sm text-gray-500">
              or <Link href="/signup" className="text-gray-700 cursor-pointer hover:text-black">sign up</Link>
            </p>
          </form>
        </div>

        {/* Right Side: Illustration (Placeholder) */}
        <div className="flex flex-1 items-center justify-center relative bg-white p-8 lg:p-0">
            {/* This is a simple placeholder for the complex, colorful illustration in the image */}
            <div className="w-full h-full absolute inset-0 opacity-10">
                {/* A light background pattern or shape could go here */}
            </div>
            <div className="relative w-full max-w-[450px] aspect-square scale-75 sm:scale-100">
                <div className="absolute top-10 left-5 w-20 h-20 bg-[#20232A] rounded-xl transform -rotate-6 flex items-center justify-center text-[#61DAFB] transition-transform duration-300 hover:scale-110">
                    <SiReact size={40} />
                </div>
                <div className="absolute top-0 right-20 w-16 h-16 bg-[#339933] rounded-full transform rotate-6 flex items-center justify-center text-white transition-transform duration-300 hover:scale-110">
                    <SiNodedotjs size={32} />
                </div>
                <div className="absolute bottom-10 left-0 w-24 h-24 bg-[#47A248] rounded-lg transform rotate-3 flex items-center justify-center text-white transition-transform duration-300 hover:scale-110">
                    <SiMongodb size={60} />
                </div>
                <div className="absolute bottom-5 right-24 w-28 h-28 bg-black rounded-xl flex items-center justify-center text-white transition-transform duration-300 hover:scale-110">
                    <SiNextdotjs size={60} />
                </div>
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-[#06B6D4] rounded-full flex items-center justify-center text-white transition-transform duration-300 hover:scale-110">
                    <SiTailwindcss size={40} />
                </div>
                <div className="absolute top-24 right-0 w-16 h-16 bg-gray-800 rounded-full transform -rotate-12 flex items-center justify-center text-white transition-transform duration-300 hover:scale-110">
                    <SiGithub size={40} />
                </div>
                <div className="absolute top-40 left-16 w-14 h-14 bg-[#1DA1F2] rounded-full transform rotate-12 flex items-center justify-center text-white transition-transform duration-300 hover:scale-110">
                    <SiX size={28} />
                </div>
                <div className="absolute bottom-24 right-0 w-16 h-16 bg-[#0A66C2] rounded-lg transform -rotate-12 flex items-center justify-center text-white transition-transform duration-300 hover:scale-110">
                    <SiLinkedin size={32} />
                </div>
                <div className="absolute top-20 left-32 w-52 h-24 bg-gray-100 p-2 rounded-lg transform rotate-3 transition-transform duration-300 hover:scale-110">
                    <div className="grid grid-flow-col grid-rows-7 gap-1 h-full">
                        {Array(140).fill(0).map((_, i) => (
                            <div key={i} className={`aspect-square rounded-sm ${i % 6 === 0 ? 'bg-green-600' : i % 4 === 0 ? 'bg-green-400' : 'bg-green-200'}`}></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;