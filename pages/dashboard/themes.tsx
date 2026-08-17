import React from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import ThemeSettings from '../../components/dashboard/ThemeSettings';
import LayoutSettings from '../../components/dashboard/LayoutSettings';

const ThemesPage: React.FC = () => {
    return (
        <DashboardLayout>
            {/* Mobile + Tablet Layout - No Fixed Border */}
            <div className="xl:hidden py-12 px-0 sm:px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-3">
                        Visual <span className="text-gradient">Themes</span>
                    </h1>
                    <p className="text-white/40 text-base font-light italic">Customize your profile&apos;s appearance and design.</p>
                </div>
                <LayoutSettings />
                <ThemeSettings />
            </div>

            {/* Desktop Layout - Fixed Border */}
            <div className="hidden xl:block fixed inset-0 xl:left-80 p-8 z-10">
                <div className="glass-card w-full max-w-6xl h-full mx-auto rounded-[3rem] border-white/5 flex flex-col overflow-hidden">
                    {/* Fixed Header */}
                    <div className="flex-shrink-0 text-center px-10 pt-10 pb-8">
                        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-3">
                            Visual <span className="text-gradient">Themes</span>
                        </h1>
                        <p className="text-white/40 text-base font-light italic">Customize your profile&apos;s appearance and design.</p>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto px-10 pb-10 custom-scrollbar">
                        <LayoutSettings />
                        <ThemeSettings />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ThemesPage;
