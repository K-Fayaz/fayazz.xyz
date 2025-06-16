import React, { useEffect, useState } from 'react';

interface sectionProps {
  id: string;
  label: string;
}

interface ScrollProgressBarProps {
  sections: sectionProps[];
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
}

const ScrollProgressBar: React.FC<ScrollProgressBarProps> = ({ sections, activeSection, onSectionClick }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = scrollPx / winHeightPx;
      setScrollProgress(Math.min(scrolled, 1));
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div className="fixed left-3 md:left-8 top-1/2 transform -translate-y-1/2 z-40">
      <div className="relative h-64">
        {/* Energy Beam Background */}
        <div className="absolute left-[6px] top-0 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-transparent via-gray-800 to-transparent opacity-60 rounded-full"></div>
        
        {/* Animated Energy Beam Progress */}
        <div className="absolute left-[6px] top-0 transform -translate-x-1/2 w-1 h-full overflow-hidden rounded-full">
          <div 
            className="w-full bg-gradient-to-b from-white via-blue-200 to-white transition-all duration-500 ease-out rounded-full shadow-lg"
            style={{ 
              height: `${scrollProgress * 100}%`,
              maxHeight: '100%',
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.3)',
              animation: 'pulse 2s ease-in-out infinite alternate'
            }}
          />
        </div>
        
        {/* Flowing Energy Effect */}
        <div 
          className="absolute left-[6px] top-0 transform -translate-x-1/2 w-1 h-full overflow-hidden rounded-full"
          style={{
            background: `linear-gradient(to bottom, 
              transparent 0%, 
              rgba(255, 255, 255, 0.1) ${scrollProgress * 100 - 10}%, 
              rgba(255, 255, 255, 0.3) ${scrollProgress * 100}%, 
              transparent ${scrollProgress * 100 + 10}%, 
              transparent 100%)`
          }}
        />
        
        {/* Navigation Points */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSectionClick(section.id)}
              className="group relative"
            >
              <div 
                className={`w-3 h-3 rounded-full border transition-all duration-300 ${
                  activeSection === section.id 
                    ? 'bg-white border-white scale-110 shadow-lg' 
                    : 'bg-black border-gray-600 group-hover:border-gray-400 group-hover:scale-105'
                }`}
                style={{
                  boxShadow: activeSection === section.id 
                    ? '0 0 15px rgba(255, 255, 255, 0.6), 0 0 30px rgba(255, 255, 255, 0.3)' 
                    : 'none'
                }}
              />
            </button>
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes pulse {
          0% { opacity: 0.8; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default ScrollProgressBar;