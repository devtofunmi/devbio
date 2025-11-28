import React, { useRef, useEffect } from 'react';
import { ResizableBox } from 'react-resizable';
import { SiGithub } from 'react-icons/si';
import { FaTrash } from 'react-icons/fa';

import 'react-resizable/css/styles.css'; 

interface GithubCardProps {
  githubUsername?: string;
  chartColor?: string;
  onDelete: () => void;
}

const GithubCard: React.FC<GithubCardProps> = ({ 
  githubUsername,
  chartColor = "219138", 
  onDelete 
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // This effect finds the resize handles and stops the drag event from firing
  // when the user is trying to resize the card.
  useEffect(() => {
    if (wrapperRef.current) {
      const handles = wrapperRef.current.querySelectorAll('.react-resizable-handle');
      const stopPropagation = (e: Event) => e.stopPropagation();
      
      handles.forEach(handle => {
        handle.addEventListener('mousedown', stopPropagation);
      });

      return () => {
        handles.forEach(handle => {
          handle.removeEventListener('mousedown', stopPropagation);
        });
      };
    }
  }, []);
  
  return (
    <div ref={wrapperRef}>
      <ResizableBox
        width={Infinity} 
        height={300} 
        minConstraints={[300, 200]} 
        maxConstraints={[800, 600]} 
        resizeHandles={['se', 'e', 's']} 
        className="relative group w-full max-w-full"
      >
        <div 
          className="w-full h-full bg-white shadow-xl overflow-hidden relative"
          style={{ borderRadius: '24px' }} 
        >
          
          {/* --- LAYER 1: Background Image (The Graph) --- */}
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <img 
              src={`https://ghchart.rshah.org/${chartColor}/${githubUsername}`} 
              alt="GitHub Contributions"
              className="w-full h-full object-cover pointer-events-none select-none opacity-90" 
              draggable="false"
            />
          </div>

          {/* --- LAYER 2: Floating Icons --- */}
          
          {/* Top Left: Github Icon */}
          <div className="absolute top-5 left-5 z-10">
            <div className="bg-black rounded-full p-2.5 flex items-center justify-center shadow-lg">
              <SiGithub size={20} className="text-white" />
            </div>
          </div>

          {/* Top Right: Delete Button */}
          <div className="absolute top-5 right-5 z-10">
            <button 
              onClick={onDelete}
              className="group/btn p-2 rounded-full bg-white/50 hover:bg-white backdrop-blur-sm transition-all shadow-sm cursor-pointer"
            >
              <FaTrash size={14} className="text-gray-500 group-hover/btn:text-red-500" />
            </button>
          </div>

        </div>
      </ResizableBox>
    </div>
  );
};

export default GithubCard;