import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiGrid, FiUsers, FiActivity, FiArrowLeft, FiLogOut, FiShield } from "react-icons/fi";
import { useAuth } from "../../lib/AuthContext";

const navItems = [
    { href: "/admin", label: "Overview", icon: FiGrid },
    { href: "/admin/users", label: "Users", icon: FiUsers },
    { href: "/admin/analytics", label: "Analytics", icon: FiActivity },
];

const AdminSidebar: React.FC = () => {
    const router = useRouter();
    const { user, signOut } = useAuth();

    const isActive = (href: string) =>
        href === "/admin" ? router.pathname === "/admin" : router.pathname.startsWith(href);

    return (
        <>
            {/* Mobile Bottom Bar */}
            <div className="md:hidden fixed bottom-6 left-6 right-6 z-50">
                <nav className="glass bg-black/60 backdrop-blur-xl rounded-[2.5rem] p-2 flex justify-between items-center border-white/10 shadow-2xl">
                    {navItems.map((item) => (
                        <Link key={item.href} href={item.href}>
                            <div className={`p-4 rounded-full transition-all duration-300 ${isActive(item.href) ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20" : "text-white/40 hover:text-white"}`}>
                                <item.icon size={22} />
                            </div>
                        </Link>
                    ))}
                    <Link href="/dashboard">
                        <div className="p-4 rounded-full text-white/40 hover:text-white transition-all" title="Back to DevBio">
                            <FiArrowLeft size={22} />
                        </div>
                    </Link>
                </nav>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden md:flex lg:fixed w-80 p-8 flex-col h-screen z-50">
                <div className="glass-card h-full rounded-[3rem] p-8 border-white/5 flex flex-col">
                    {/* Brand */}
                    <div className="flex items-center gap-3 mb-10 px-2">
                        <div className="relative w-12 h-12 flex items-center justify-center">
                            <div className="absolute inset-0 bg-blue-600 rounded-2xl rotate-6 shadow-xl shadow-blue-500/20" />
                            <div className="relative w-full h-full bg-black border border-white/10 rounded-2xl flex items-center justify-center text-blue-500">
                                <FiShield size={20} />
                            </div>
                        </div>
                        <div className="leading-none">
                            <span className="text-white font-black tracking-tighter text-2xl">Admin</span>
                            <p className="text-white/30 text-[9px] font-bold uppercase tracking-widest mt-1">DevBio Control</p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 flex flex-col px-2">
                        {navItems.map((item) => (
                            <Link key={item.href} href={item.href}>
                                <div className={`flex items-center gap-2 px-6 py-4 my-2 rounded-[1.5rem] transition-all duration-300 group ${isActive(item.href) ? "bg-white text-black shadow-2xl shadow-white/10 scale-[1.02]" : "text-white/30 hover:text-white hover:bg-white/5"}`}>
                                    <item.icon size={20} className={isActive(item.href) ? "text-black" : "text-white/20 group-hover:text-blue-400 transition-colors"} />
                                    <span className="font-black uppercase tracking-widest text-xs">{item.label}</span>
                                </div>
                            </Link>
                        ))}
                    </nav>

                    {/* Footer */}
                    <div className="mt-auto pt-4 border-t border-white/5 space-y-2">
                        <Link href="/dashboard">
                            <div className="flex items-center gap-2 px-6 py-3 rounded-[1.5rem] text-white/30 hover:text-white hover:bg-white/5 transition-all">
                                <FiArrowLeft size={16} />
                                <span className="font-black uppercase tracking-widest text-[10px]">Back to DevBio</span>
                            </div>
                        </Link>
                        {user && (
                            <button
                                type="button"
                                onClick={() => signOut()}
                                className="w-full flex items-center gap-2 px-6 py-3 rounded-[1.5rem] text-red-500/40 hover:text-white hover:bg-red-500 transition-all cursor-pointer"
                            >
                                <FiLogOut size={16} />
                                <span className="font-black uppercase tracking-widest text-[10px]">Log Out</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminSidebar;
