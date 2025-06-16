import React from 'react';
import MoonImage from '../assets/moon.png';
import StarField from './StarField';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white relative overflow-hidden">
      <StarField is404Effect={true} />
      <div className="relative z-10 flex flex-col items-center">
        <div className="flex items-center">
          <span className="text-[10rem] font-bold relative -mr-[100px]">4</span>
          <img src={MoonImage} alt="Moon" className="w-70 h-70 mx-4 drop-shadow-[0_0_80px_rgba(255,255,255,0.7)]" />
          <span className="text-[10rem] font-bold relative -ml-[92px]">4</span>
        </div>
        <span className="mt-8 text-4xl">Page Not Found!</span>
      </div>
    </div>
  );
};

export default NotFoundPage; 