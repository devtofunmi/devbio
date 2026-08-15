import React from "react";
import { FiEyeOff } from "react-icons/fi";

/**
 * Wraps a dashboard card that is NOT rendered on the public "minimal" layout.
 * When `hidden` is true it dims the card and shows a small badge so the user
 * understands the card's content won't appear on their profile. The card stays
 * editable (they may switch back to the classic layout).
 */
const LayoutHiddenWrapper: React.FC<{ hidden: boolean; children: React.ReactNode }> = ({
    hidden,
    children,
}) => {
    if (!hidden) return <>{children}</>;

    return (
        <div className="relative">
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/60 pointer-events-none backdrop-blur-md">
                <FiEyeOff size={11} /> Hidden on Minimal
            </div>
            <div className="opacity-40 transition-opacity">{children}</div>
        </div>
    );
};

export default LayoutHiddenWrapper;
