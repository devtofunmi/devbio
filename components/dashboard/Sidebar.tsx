import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { FiHome, FiBarChart2, FiSettings } from 'react-icons/fi';

const Sidebar: React.FC = () => {
  const router = useRouter();

  const menuItems = [
    { href: '/dashboard', label: 'Your Page', icon: FiHome },
    { href: '/dashboard/analytics', label: 'Analytics', icon: FiBarChart2 },
    { href: '/dashboard/settings', label: 'Settings', icon: FiSettings },
  ];

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 p-5 flex flex-col h-screen">
      <div className="flex items-center mb-10">
        <Link href="/">
        <div className="bg-blue-400 h-10 w-10 s:h-32  rounded-full"></div>
        </Link>
      </div>
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>
                <p
                  className={`flex items-center p-3 my-2 rounded-full transition-colors ${
                    router.pathname === item.href
                      ? 'bg-blue-400 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}>
                  <item.icon className="mr-3" />
                  {item.label}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto">
        <div className="bg-white p-4 rounded-xl border border-gray-200 h-20 flex items-center transform transition-transform duration-300 hover:scale-110 active:scale-105 ansition-all active:-rotate-2 hover:rotate-2">
            <div className="flex items-center space-x-3">
                <Image src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg" alt="User Avatar" width={48} height={48} className="rounded-full" />
                <div>
                    <div className="font-bold text-gray-800">Jay</div>
                    <div className="text-gray-500 text-sm">jay@example.com</div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
