import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, Squares2X2Icon, MagnifyingGlassIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

const nav = [
  { to: '/', label: 'Home', icon: HomeIcon },
  { to: '/categories', label: 'Categories', icon: Squares2X2Icon },
  { to: '/search', label: 'Search', icon: MagnifyingGlassIcon },
];

function Navbar() {
  const isAdmin = typeof window !== 'undefined' && localStorage.getItem('admin_auth');
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow z-50">
      <div className="flex justify-around py-2">
        {nav.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center text-xs px-2 ${isActive ? 'text-blue-600' : 'text-gray-500'}`
            }
          >
            <Icon className="w-7 h-7 mb-1" />
            {label}
          </NavLink>
        ))}
        {isAdmin && (
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `flex flex-col items-center text-xs px-2 ${isActive ? 'text-blue-600' : 'text-gray-500'}`
            }
          >
            <Cog6ToothIcon className="w-7 h-7 mb-1" />
            Admin
          </NavLink>
        )}
      </div>
    </nav>
  );
}

export default Navbar; 