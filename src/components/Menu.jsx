import React from 'react';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const Menu = ({ isOpen, onClose }) => {
  const menuItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'DeFi', path: '/defi' },
    { name: 'Profile', path: '/profile' },
    { name: 'Settings', path: '/settings' },
    { name: 'Loyalty', path: '/loyalty' },
  ];

  return (
    <div className={`fixed top-0 left-0 w-64 h-full bg-white z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="p-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="block py-2 px-4 text-gray-800 hover:bg-gray-100 rounded"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu; 