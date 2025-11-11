// src/components/InstitutionCard.jsx
import React from 'react';

const InstitutionCard = ({ icon, title, time, type, courseType, discount = '10%' }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 relative hover:shadow-lg transition-shadow duration-300">
      {/* Discount Badge */}
      <div className="absolute top-4 right-4 bg-primary text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center justify-center h-8 w-8">
        {discount}% <br/> Discount
      </div>

      <div className="flex items-center mb-4">
        {/* Icon for the institution */}
        <div className="flex-shrink-0 bg-blue-100 text-primary p-3 rounded-md mr-4">
          {icon || ( // Default icon if none provided
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m-1 4h1m-2 4h4m-5 4h8"></path>
            </svg>
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-dark-text mb-1">{title}</h3>
          <p className="text-sm text-gray-text flex items-center">
            <svg className="h-4 w-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            {time}
          </p>
          <p className="text-sm text-gray-text">{type}</p>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4 pt-4 border-t border-border-light">
        <span className="text-sm text-gray-text">{courseType}</span>
        <button className="bg-primary text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300">
          Join Now
        </button>
      </div>
    </div>
  );
};

export default InstitutionCard;