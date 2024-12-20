import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, History, User, Crown } from 'lucide-react';

export const BottomNav: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t">
      <div className="flex justify-around items-center h-16">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center p-2 ${
              isActive ? 'text-blue-600' : 'text-gray-600'
            }`
          }
        >
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1">Home</span>
        </NavLink>
        <NavLink
          to="/history"
          className={({ isActive }) =>
            `flex flex-col items-center p-2 ${
              isActive ? 'text-blue-600' : 'text-gray-600'
            }`
          }
        >
          <History className="w-6 h-6" />
          <span className="text-xs mt-1">History</span>
        </NavLink>
        <NavLink
          to="/subscription"
          className={({ isActive }) =>
            `flex flex-col items-center p-2 ${
              isActive ? 'text-blue-600' : 'text-gray-600'
            }`
          }
        >
          <Crown className="w-6 h-6" />
          <span className="text-xs mt-1">Plans</span>
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex flex-col items-center p-2 ${
              isActive ? 'text-blue-600' : 'text-gray-600'
            }`
          }
        >
          <User className="w-6 h-6" />
          <span className="text-xs mt-1">Profile</span>
        </NavLink>
      </div>
    </nav>
  );
};