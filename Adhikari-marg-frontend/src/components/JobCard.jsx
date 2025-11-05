// src/components/JobCard.jsx
import React from 'react';

const JobCard = ({ title, agency, location, deadline, qualification, hasFeature = false }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 relative hover:shadow-lg transition-shadow duration-300">
      {hasFeature && (
        <span className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
          Featured
        </span>
      )}
      <button className="absolute top-4 right-4 text-gray-400 hover:text-primary">
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </button>

      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-1">{agency} · {location}</p>

      <div className="flex items-center text-sm text-gray-600 mt-3">
        <svg className="h-4 w-4 mr-1 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span className="text-red-600 font-medium">Deadline: {deadline}</span>
      </div>

      {qualification && (
        <div className="flex items-center text-sm text-gray-600 mt-2">
          <svg className="h-4 w-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
          <span>Qualification: {qualification}</span>
        </div>
      )}
    </div>
  );
};

export default JobCard;