import Link from 'next/link';
import React from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { SiGithub, SiReact, SiNodedotjs, SiMongodb, SiNextdotjs, SiTailwindcss, SiX, SiLinkedin } from 'react-icons/si';

const geistSans = { className: "font-sans" };
const geistMono = { className: "font-mono" };

const Signup: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className={`${geistSans.className} ${geistMono.className}  flex min-h-screen items-center justify-center bg-white md:p-4`}>
      <div className="flex flex-col lg:flex-row w-full max-w-6xl rounded-xl">
        {/* Left Side: Signup Form */}
        <div className="flex-1 p-10 md:p-16">
          <h1 className="md:text-4xl text-2xl font-bold text-gray-900 mb-2">
            Create your DevBio
          </h1>
         
          <form className="max-w-sm">
            {/* Input Fields */}
            <div className="flex flex-col space-y-5 mt-4 mb-4">
              <input
                type="text"
                placeholder="Username"
                className="flex-1 p-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black placeholder-gray-500"
              />
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 p-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black placeholder-gray-500"
              />
              <div className="relative flex-1">
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
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer flex justify-center py-3 mt-4 px-4 border border-transparent rounded-lg shadow-sm font-semibold text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create Account
            </button>

            <div className="relative flex py-5 items-center"><div className="flex-grow border-t border-gray-200"></div><span className="flex-shrink mx-4 text-gray-400 text-sm">Or</span><div className="flex-grow border-t border-gray-200"></div></div>

            <button
              type="button"
              className="flex cursor-pointer items-center justify-center w-full bg-gray-800 hover:bg-black text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-colors"
              onClick={() => console.log('GitHub Sign-up clicked')}
            >
              <SiGithub className="mr-2" size={20} />
              Sign up with Github
            </button>
             <p className="text-sm text-gray-700 mt-4">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-sm  text-gray-800 hover:text-black">
              Log in
            </Link>
          </p>

          </form>
        </div>

        {/* Right Side: Illustration */}
        <div className="flex flex-1 items-center justify-center relative bg-white p-8 lg:p-0">
            <div className="w-full h-full absolute inset-0 opacity-10">
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

export default Signup;