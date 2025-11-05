// src/components/SearchBar.jsx
import React from 'react';

const SearchBar = () => {
  return (
    <section className="bg-white py-8 shadow-sm">
      <div className="container mx-auto px-4">
        {/* Main Search Input */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search by title, keywords..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-700"
          />
          <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>

        {/* Personalized Job Alerts */}
        <div className="mb-6">
          <button className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:from-indigo-700 hover:to-purple-600 transition duration-300">
            Unlock Personalized Job Alerts!
          </button>
        </div>

        {/* Filter Options */}
        <div className="flex flex-wrap gap-4 md:gap-6 items-center">
          <select className="px-5 py-2 border border-gray-300 rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
            <option>Qualification</option>
            <option>Bachelor's</option>
            <option>Master's</option>
          </select>

          <select className="px-5 py-2 border border-gray-300 rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
            <option>Location</option>
            <option>Kathmandu</option>
            <option>Pokhara</option>
          </select>

          <select className="px-5 py-2 border border-gray-300 rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
            <option>Posted By</option>
            <option>Today</option>
            <option>Last Week</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default SearchBar;