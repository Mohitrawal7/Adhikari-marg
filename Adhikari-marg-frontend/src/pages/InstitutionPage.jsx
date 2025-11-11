// src/pages/InstitutionsPage.jsx
import React, { useState } from 'react';
import InstitutionCard from '../components/InstitutionCard';
import Navbar from '../components/Navbar';


const InstitutionsPage = () => {
  const [activeTab, setActiveTab] = useState('District'); // For the tab selector

  // Example data for institutions
  const institutions = [
    {
      id: 1,
      title: 'National Training Academy',
      time: '2019 5,00 am',
      type: 'Subject Type',
      courseType: 'Course Type',
      icon: ( // You can pass specific icons or use the default
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m-1 4h1m-2 4h4m-5 4h8"></path>
        </svg>
      ),
    },
    {
      id: 2,
      title: 'National Training',
      time: '2011 5,20 am',
      type: 'Subject Type',
      courseType: 'Course Type',
      icon: ( // Example of a different icon
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4m0-10.42v-4.3l-5.28-2.64"></path>
        </svg>
      ),
    },
    {
      id: 3,
      title: 'Civil Service Learning Center',
      time: '/725, 5,00 am',
      type: 'Subject Type',
      courseType: 'Course Type',
      icon: ( // Another icon
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
    },
    {
      id: 4,
      title: 'Civil Service Learning Center',
      time: '102, 5, 20 am',
      type: 'Subject Type',
      courseType: 'Course Type',
      icon: ( // And another
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.007 12.007 0 002.944 12c.045 4.108 1.621 7.965 4.305 10.957L12 22.957l4.751-4.016A12.007 12.007 0 0021.056 12a11.955 11.955 0 01-3.042-8.618z"></path>
        </svg>
      ),
    },
  ];

  return (<>
  <Navbar />
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-dark-text mb-8">Institutions Page</h1>

      {/* Filter and Dropdown Section */}
      <div className="flex flex-wrap gap-4 mb-8">
        {/* District Tab */}
        <button
          onClick={() => setActiveTab('District')}
          className={`px-6 py-2 rounded-lg font-medium transition duration-300
            ${activeTab === 'District' ? 'bg-primary text-white shadow-md' : 'bg-white text-gray-700 border border-border-light hover:bg-gray-50'}`}
        >
          District
        </button>

        {/* Subject Type Dropdown */}
        <div className="relative">
          <select
            className="px-6 py-2 border border-border-light rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-700"
            defaultValue="Subject Type"
          >
            <option disabled>Subject Type</option>
            <option>Option 1</option>
            <option>Option 2</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.096 6.924 4.682 8.338z"/></svg>
          </div>
        </div>
      </div>

      {/* Institutions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {institutions.map((institution) => (
          <InstitutionCard
            key={institution.id}
            title={institution.title}
            time={institution.time}
            type={institution.type}
            courseType={institution.courseType}
            icon={institution.icon}
          />
        ))}
      </div>
    </div>
    </>
  );
};

export default InstitutionsPage;