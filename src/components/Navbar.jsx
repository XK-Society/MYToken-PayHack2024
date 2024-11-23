import React, { useState } from 'react';
import Agent from './Agent';
import Menu from './Menu';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAgentOpen, setIsAgentOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white shadow-lg ">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            {/* Left Menu Button */}
            <div className="flex items-center">
              <button
                onClick={() => setIsMenuOpen(true)}
                className="flex items-center px-3 py-2 border rounded text-gray-700 border-gray-400 hover:text-black hover:border-black"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* Center Logo/Title */}
            <div className="flex items-center">
              <span className="text-xl font-bold">MYToken Dashboard</span>
            </div>

            {/* Right AI Agent Button */}
            <div className="flex items-center">
              <button
                onClick={() => setIsAgentOpen(true)}
                className="flex items-center px-3 py-2 border rounded text-gray-700 border-gray-400 hover:text-black hover:border-black"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay when either menu is open */}
      {(isMenuOpen || isAgentOpen) && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => {
            setIsMenuOpen(false);
            setIsAgentOpen(false);
          }}
        />
      )}

      {/* Side Menu Panel */}
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* AI Agent Panel */}
      <Agent isOpen={isAgentOpen} onClose={() => setIsAgentOpen(false)} />
    </>
  );
};

export default Navbar;