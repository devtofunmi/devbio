import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { FiHome, FiBarChart2, FiSettings, FiLogOut } from 'react-icons/fi';

const Sidebar: React.FC = () => {
  const router = useRouter();
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { href: '/dashboard', label: 'Your Page', icon: FiHome },
    { href: '/dashboard/analytics', label: 'Analytics', icon: FiBarChart2 },
    { href: '/dashboard/settings', label: 'Settings', icon: FiSettings },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setShowTooltip(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <>
      {/* Mobile Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-50 border-t border-gray-200 z-50">
        <nav className="flex justify-between items-center px-6">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <p
                className={`flex items-center justify-center p-3 my-2 rounded-full transition-colors ${
                  router.pathname === item.href
                    ? 'bg-blue-400 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon size={22} />
              </p>
            </Link>
          ))}

          {/* User Avatar with Tooltip */}
          <div className="relative" ref={tooltipRef}>
            <button
              onClick={() => setShowTooltip(!showTooltip)}
              className="flex items-center justify-center p-1 rounded-full focus:outline-none"
            >
              <Image
                src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg"
                alt="User Avatar"
                width={36}
                height={36}
                className="rounded-full border border-gray-300"
              />
            </button>

            {showTooltip && (
              <div className="absolute bottom-14 left-[-25] -translate-x-1/2 bg-white border border-gray-200 rounded-lg p-3 w-40 text-start transition-all duration-200 shadow-md">
                <div className="font-bold text-gray-800">Jay</div>
                <div className="text-gray-500 text-[12px] break-all underline mb-3">
                  <Link href="https://devvbio.vercel.app/jay">devvbio.vercel.app/jay</Link>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-500 text-[12px] font-semibold hover:underline"
                >
                  <FiLogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden font-sans md:flex lg:fixed w-80 bg-gray-50 border-r border-gray-200 p-5 flex-col h-screen">
        <div className="p-5 rounded-2xl h-full border-gray-200 flex flex-col">
          {/* Logo */}
          <div className="flex items-center mb-10">
            <Link href="/">
              <div className="bg-blue-400 h-10 w-10 rounded-full"></div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1">
            <ul>
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <div
                      className={`flex items-center text-center font-semibold text-md text-gray-700 p-3 my-2 rounded-full transition-colors ${
                        router.pathname === item.href
                          ? 'bg-blue-400 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <item.icon size='20' className="mr-3" />
                      <p className="text-center">
                      {item.label}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* User Profile (footer section) */}
          <div className="mt-auto">
            <div className="bg-white p-4 rounded-2xl border border-gray-200 flex items-center justify-between transform transition-transform duration-300 hover:scale-105 hover:-rotate-1">
              <div className="flex items-center">
                <Image
                  src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg"
                  alt="User Avatar"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div className="ml-3">
                  <div className="font-bold text-gray-800">Jay</div>
                  <div className="text-gray-500 text-[12px] break-all underline">
                    <Link href="https://devvbio.vercel.app/jay">devvbio.vercel.app/jay</Link>
                  </div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="cursor-pointer text-red-500 hover:text-red-600 transition-colors"
                title="Logout"
              >
                <FiLogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;