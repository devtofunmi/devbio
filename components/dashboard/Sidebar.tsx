import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { FiHome, FiBarChart2, FiSettings, FiLogOut, FiZap } from 'react-icons/fi';
// import { motion, AnimatePresence } from 'framer-motion';

const Sidebar: React.FC = () => {
  const router = useRouter();
  // const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { href: '/dashboard', label: 'Your Page', icon: FiHome },
    { href: '/dashboard/analytics', label: 'Analytics', icon: FiBarChart2 },
    { href: '/dashboard/themes', label: 'Themes', icon: FiZap },
    { href: '/dashboard/settings', label: 'Settings', icon: FiSettings },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        // setShowTooltip(false);
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
      <div className="md:hidden fixed bottom-6 left-6 right-6 z-50">
        <nav className="glass bg-black/60 backdrop-blur-xl rounded-[2.5rem] p-2 flex justify-between items-center border-white/10 shadow-2xl">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <div
                className={`p-4 rounded-full transition-all duration-300 ${router.pathname === item.href
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                  : 'text-white/40 hover:text-white'
                  }`}
              >
                <item.icon size={24} />
              </div>
            </Link>
          ))}

          <div className="flex items-center gap-3 pr-4">
            <button
              onClick={handleLogout}
              className="w-12 h-12 glass rounded-full flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-lg"
            >
              <FiLogOut size={20} />
            </button>
          </div>
        </nav>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex lg:fixed w-80 p-8 flex-col h-screen z-50">
        <div className="glass-card h-full rounded-[3rem] p-8 border-white/5 flex flex-col">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-16 px-4">
            <Link href="/" className="flex items-center gap-4 group cursor-pointer">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <div className="absolute inset-0 bg-blue-600 rounded-2xl rotate-6 group-hover:rotate-0 transition-transform duration-500 shadow-xl shadow-blue-500/20" />
                <div className="relative w-full h-full bg-black border border-white/10 rounded-2xl flex items-center justify-center font-black text-blue-500 text-sm tracking-tighter">
                  D/B
                </div>
              </div>
              <span className="text-white font-black tracking-tighter text-3xl">DevBio</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 flex flex-col  px-2">
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <div
                  className={`flex items-center gap-2 px-6 py-4 my-2 rounded-[1.5rem] transition-all duration-300 group ${router.pathname === item.href
                    ? 'bg-white text-black shadow-2xl shadow-white/10 scale-[1.02]'
                    : 'text-white/30 hover:text-white hover:bg-white/5'
                    }`}
                >
                  <item.icon size={20} className={router.pathname === item.href ? 'text-black' : 'text-white/20 group-hover:text-blue-400 transition-colors'} />
                  <span className="font-black uppercase tracking-widest text-xs">{item.label}</span>
                </div>
              </Link>
            ))}
          </nav>

          {/* User Profile (footer section) */}
          <div className="mt-auto px-2">
            <div className="glass p-3 rounded-[2.5rem] border-white/5 flex items-center justify-between group hover:border-white/20 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-white/10 group-hover:border-blue-500/50 transition-colors bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                  <Image
                    src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg"
                    alt="User Avatar"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div className="overflow-hidden">
                  <div className="font-black text-white text-sm truncate uppercase tracking-widest">Jay</div>
                  <div className="text-blue-500 text-[9px] font-black uppercase tracking-[0.2em] truncate max-w-[120px]">
                    Pro Plan
                  </div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-10 h-10 glass rounded-xl flex items-center justify-center text-white/20 hover:text-red-500 hover:bg-red-500/10 transition-all"
              >
                <FiLogOut size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
