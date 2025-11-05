// src/App.jsx
import React from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import JobCard from './components/Jobcard';

function App() {
  const jobNotices = [
    {
      id: 1,
      title: 'Section Officer (Non-Technical)',
      agency: 'Lok Sewa Ayog',
      location: 'Kathmad',
      deadline: '205/15 BS',
      qualification: 'Quali: Lex Degree in Management',
    },
    {
      id: 2,
      title: 'Section Officer',
      agency: 'Lok Sewa Ayog',
      location: 'Kathmhai', // Typo from original image
      deadline: 'D0Khib.04/15 BS', // Typo from original image
      qualification: "Bachelor's Degree in Management",
      hasFeature: true,
    },
    {
      id: 3,
      title: 'Section Officer (Non-Technical)',
      agency: 'Lok Sewa Ayog',
      location: 'Kathmhad',
      deadline: '202D14 ES', // Typo from original image
      qualification: "Bachelor's Degree in Management",
    },
    {
      id: 4,
      title: 'Appriom Ducted in Feaure', // Typo from original image
      agency: 'Lok Sewa Ayog',
      location: 'Kathmhad',
      deadline: '2080413 BS',
      qualification: "Bachelor's Degree in Management",
    },
    {
      id: 5,
      title: 'Section Officer (Non-Technical)',
      agency: 'Lok Sewa Ayog',
      location: 'Kathmhad',
      deadline: '2080415 BS',
      qualification: "Bachelor's Degree in Management",
    },
    {
      id: 6,
      title: 'Section Officer (Nopnaing', // Typo from original image
      agency: 'Lok Sewa Ayog',
      location: 'Kathmhad',
      deadline: '2080415 BS',
      qualification: "Bachelor's Degree in Management",
    },
    // Add more job notices here as needed
  ];

  return (
    <div className="min-h-screen bg-light-gray font-poppins text-text-color">
      <Header />
      <SearchBar />

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">All Government Job Notices</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobNotices.map(job => (
            <JobCard
              key={job.id}
              title={job.title}
              agency={job.agency}
              location={job.location}
              deadline={job.deadline}
              qualification={job.qualification}
              hasFeature={job.hasFeature}
            />
          ))}
        </div>
      </main>

      {/* You can add a Footer component here if needed */}
      {/* <footer className="bg-white py-6 mt-8 shadow-inner">
        <div className="container mx-auto px-4 text-center text-gray-600">
          &copy; {new Date().getFullYear()} Adhikari-Marg. All rights reserved.
        </div>
      </footer> */}
    </div>
  );
}

export default App;