import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { FiHome, FiBarChart2, FiSettings, FiLogOut, FiZap } from 'react-icons/fi';
import { useAuth } from '../../lib/AuthContext';
// import { motion, AnimatePresence } from 'framer-motion';

const Sidebar: React.FC = () => {
  const router = useRouter();
  const { user, signOut, supabase } = useAuth();
  const [profile, setProfile] = React.useState<{ full_name: string | null; avatar_url: string | null; username: string | null } | null>(null);
  // const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, avatar_url, username')
        .eq('id', user.id)
        .single();

      if (data && !error) {
        setProfile(data);
      }
    };

    fetchProfile();
  }, [user]);

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

  const handleLogout = async () => {
    await signOut();
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
          <div className="flex items-center gap-3 mb-8 px-2">
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
          <div className="mt-auto pt-4 border-t border-white/5">
            <div className="group relative">
              {/* Profile Main Card */}
              <div className="glass p-3.5 rounded-[1.8rem] border-white/5 flex flex-col gap-3.5 hover:border-white/10 transition-all duration-500 overflow-hidden bg-white/[0.02]">
                <div className="flex items-center gap-3 relative z-10">
                  <div className="relative shrink-0">
                    <div className="w-11 h-11 rounded-xl overflow-hidden border border-white/10 group-hover:border-blue-500/50 transition-all duration-500 relative">
                      <Image
                        src={profile?.avatar_url || "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg"}
                        alt="User Avatar"
                        fill
                        className="object-cover"
                      />
                    </div>
                    {/* Active Status Indicator */}
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-[#121212] rounded-full" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="font-black text-white text-sm truncate uppercase tracking-tight leading-none mb-1">
                      {profile?.full_name?.split(' ')[0] || 'Developer'}
                    </div>
                    <div className="text-white/20 text-[9px] font-bold uppercase tracking-wider truncate">
                      Personal Account
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-col gap-1.5 relative z-10">
                  {/* <Link href={`/${profile?.username || 'profile'}`}>
                    <button className="w-full cursor-pointer py-2 glass rounded-lg text-[9px] font-black uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/5 border-white/5 transition-all">
                      View Public Page
                    </button>
                  </Link> */}
                  <button
                    onClick={handleLogout}
                    className="w-full cursor-pointer py-2 glass rounded-lg text-[9px] font-black uppercase tracking-widest text-red-500/40 hover:text-white hover:bg-red-500 transition-all border-white/5 flex items-center justify-center gap-2"
                  >
                    <FiLogOut size={10} />
                    Log Out
                  </button>
                </div>

                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 blur-[40px] -z-10 group-hover:bg-blue-500/10 transition-colors duration-700" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;