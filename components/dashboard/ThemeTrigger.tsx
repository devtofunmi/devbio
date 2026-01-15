import React from 'react';
import { FaPalette } from 'react-icons/fa';
import { useDashboard } from './DashboardLayout';

const ThemeTrigger: React.FC = () => {
    const { openThemeSidebar } = useDashboard();

    return (
        <button
            onClick={openThemeSidebar}
            className="p-3 cursor-pointer glass rounded-xl text-white/40 hover:text-white transition-all hover:bg-white/5"
            title="Custom Theme"
        >
            <FaPalette size={16} />
        </button>
    );
};

export default ThemeTrigger;
