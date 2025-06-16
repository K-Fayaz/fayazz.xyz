import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm">
      <div className="flex items-center justify-center py-6">
        <div className="flex items-center space-x-16">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `relative text-lg font-light tracking-wide transition-all duration-300 hover:text-white ${
                isActive ? 'text-white' : 'text-gray-500'
              } after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-white after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${
                isActive ? 'after:scale-x-100' : ''
              }`
            }
          >
            me
          </NavLink>
          <NavLink
            to="/12n12"
            className={({ isActive }) =>
              `relative text-lg font-light tracking-wide transition-all duration-300 hover:text-white ${
                isActive ? 'text-white' : 'text-gray-500'
              } after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-white after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${
                isActive ? 'after:scale-x-100' : ''
              }`
            }
          >
            12N12
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;