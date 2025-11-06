// src/components/Header.jsx
import React, { useState } from 'react';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
 
 
    const handleLogout = () => {
    // your logout logic here
    console.log("User logged out");
  };
    const user = {
    name: "Mohit Rawal",
    email: "mohit@example.com",
    avatar: "https://i.pravatar.cc/40", // example avatar
  };


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
        <nav className="hidden lg:flex lg:mr-[30%] md:mr-80 space-x-8 text-gray-600 font-medium">
          <a href="#" className="hover:text-primary transition duration-300">Home</a>
          <a href="#" className="hover:text-primary transition duration-300">About Us</a>
          <a href="#" className="hover:text-primary transition duration-300">Contact</a>
            <a href="#" className="hover:text-primary transition duration-300">Blog</a>
            <a href="#" className="hover:text-primary transition duration-300">Preferred Careers</a>
            <a href="#" className="hover:text-primary transition duration-300">Institutions</a>
        </nav>

        {/* Upgrade Button */}
        <button
  type="button"
  className="absolute right-24 hidden md:right-44 md:flex bg-gradient-to-r from-primary to-blue-400 text-black font-semibold py-2 px-5 rounded-lg shadow-md 
             hover:from-blue-400 hover:to-primary transition duration-300  items-center justify-center cursor-pointer"
  aria-label="Upgrade to Premium"
>
  Upgrade to Premium
  <svg
    className="ml-2 h-4 w-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 13l4 4L19 7"
    ></path>
  </svg>
</button>


{/* User Avatar */}
      <div className="absolute right-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 hover:border-primary transition"
        >
          <img src="src/hero.jpg" alt="User Avatar" className="w-full h-full object-cover" />
        </button>

 {/* Dropdown Panel */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
            <div className="p-4 border-b border-gray-200">
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <div className="flex flex-col">
              <button
                onClick={handleLogout}
                className="text-left px-4 py-2 hover:bg-gray-100 transition"
              >
                Logout
              </button>
              {/* Add more user actions here if needed */}
            </div>
          </div>
        )}


</div>

      </div>
    </header>
  );
};

export default Header;



