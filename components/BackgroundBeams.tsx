import React, { useEffect, useState } from "react";

export const BackgroundBeams = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const checkVisibility = () => {
            const enabled = localStorage.getItem('background-beams-enabled');
            setIsVisible(enabled !== 'false');
        };

        checkVisibility();

        window.addEventListener('background-beams-toggle', checkVisibility);
        return () => window.removeEventListener('background-beams-toggle', checkVisibility);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-black pointer-events-none" />
    );
};
