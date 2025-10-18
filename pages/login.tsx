// components/LoginPage.tsx
import React from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi'; // Used for the password show/hide button
import { SiGithub, SiReact, SiNodedotjs, SiMongodb, SiNextdotjs, SiTailwindcss, SiX, SiLinkedin } from 'react-icons/si';
import Link from 'next/link';
import { motion } from "framer-motion";

const geistSans = { className: "font-sans" };
const geistMono = { className: "font-mono" };

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  type FloatingProps = {
    children: React.ReactNode;
    delay?: number;
    distance?: number;
    duration?: number;
    className?: string;
  };
  
  const Floating = ({
    children,
    delay = 0,
    distance = 15,
    duration = 4,
    className = "",
  }: FloatingProps) => (
    <motion.div
      animate={{
        y: [0, -distance, 0],
        transition: {
          duration,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
          delay,
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );

  return (
    <div className={`${geistSans.className} ${geistMono.className} flex min-h-screen items-center justify-center bg-white md:p-4`}>
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
                className="flex-1 p-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black placeholder-gray-500"
              />
              <div className="relative mt-5 flex-1">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 pr-16 text-black placeholder-gray-500"
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
              <button
                            type="submit"
                            className="w-full cursor-pointer flex justify-center py-3 mt-4 px-4 border border-transparent rounded-lg shadow-sm font-semibold text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Login
                          </button>
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
              or <Link href="/signup" className="text-gray-700 underline cursor-pointer hover:text-black">sign up</Link>
            </p>
          </form>
        </div>

        {/* Right Side: Illustration (Placeholder) */}
         <div className="flex flex-1 items-center justify-center relative bg-white p-8 lg:p-0">
              <div className="relative w-full max-w-[450px] aspect-square scale-75 sm:scale-100">
                <Floating className="absolute top-10 left-5 w-20 h-20 bg-[#20232A] rounded-xl flex items-center justify-center text-[#61DAFB] hover:scale-110">
                  <SiReact size={40} />
                </Floating>
                <Floating delay={0.5} distance={10} duration={5} className="absolute top-0 right-20 w-16 h-16 bg-[#339933] rounded-full flex items-center justify-center text-white hover:scale-110">
                  <SiNodedotjs size={32} />
                </Floating>
                <Floating delay={1} distance={12} duration={4.5} className="absolute bottom-10 left-0 w-24 h-24 bg-[#47A248] rounded-lg flex items-center justify-center text-white hover:scale-110">
                  <SiMongodb size={60} />
                </Floating>
                <Floating delay={0.3} distance={10} duration={6} className="absolute bottom-5 right-24 w-28 h-28 bg-black rounded-xl flex items-center justify-center text-white hover:scale-110">
                  <SiNextdotjs size={60} />
                </Floating>
                <Floating delay={1} distance={8} duration={3.5} className="absolute bottom-0 right-0 w-20 h-20 bg-[#06B6D4] rounded-full flex items-center justify-center text-white hover:scale-110">
                  <SiTailwindcss size={40} />
                </Floating>
                <Floating delay={0.8} distance={10} duration={4} className="absolute top-24 right-0 w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center text-white hover:scale-110">
                  <SiGithub size={40} />
                </Floating>
                <Floating delay={0.4} distance={12} duration={4.2} className="absolute top-40 left-16 w-14 h-14 bg-[#1DA1F2] rounded-full flex items-center justify-center text-white hover:scale-110">
                  <SiX size={28} />
                </Floating>
                <Floating delay={0.6} distance={10} duration={5} className="absolute bottom-24 right-0 w-16 h-16 bg-[#0A66C2] rounded-lg flex items-center justify-center text-white hover:scale-110">
                  <SiLinkedin size={32} />
                </Floating>
        
               {/* Grid Box */}
               <Floating
                 delay={1.2}
                 distance={10}
                 duration={6}
                 className="absolute top-20 left-32 w-52 h-24 bg-gray-100 rounded-lg transform rotate-3 hover:scale-110 flex items-center justify-center p-3"
               >
                 <div className="grid grid-cols-20 grid-rows-7 gap-[2px]">
                   {Array.from({ length: 140 }).map((_, i) => (
                     <div
                       key={i}
                       className={`w-2.5 h-2.5 rounded-sm ${
                         i % 6 === 0
                           ? "bg-green-600"
                           : i % 4 === 0
                           ? "bg-green-400"
                           : "bg-green-200"
                       }`}
                     ></div>
                   ))}
                 </div>
               </Floating>
        
              </div>
              </div>
      </div>
    </div>
  );
};

export default LoginPage;