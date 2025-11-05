// src/components/Header.jsx
import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          {/* You can replace this with an actual SVG logo or image */}
          <svg className="h-8 w-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 21h20L12 2zm0 6l-5.33 10h10.66L12 8z" />
          </svg>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-primary">Adhikari-Marg</span>
            <span className="text-xs text-gray-500">The Direct Path to Public Service Success</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-8 text-gray-600 font-medium">
          <a href="#" className="hover:text-primary transition duration-300">Home</a>
          <a href="#" className="hover:text-primary transition duration-300">About Us</a>
          <a href="#" className="hover:text-primary transition duration-300">Contact</a>
        </nav>

        {/* Upgrade Button */}
        <button className="bg-gradient-to-r from-primary to-blue-400 text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:from-blue-400 hover:to-primary transition duration-300 flex items-center">
          Upgrade to Premium
          <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;