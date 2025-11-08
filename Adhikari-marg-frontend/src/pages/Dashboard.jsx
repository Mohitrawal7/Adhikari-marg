import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import JobCard from "../components/JobCard";

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    location: "",
    qualification: "",
    dateFilter: "all",
  });

  // Fetch jobs from backend
  const fetchJobs = async (filterParams = {}) => {
    try {
      setLoading(true);

      // Build query string dynamically
      const query = new URLSearchParams(
        Object.fromEntries(
          Object.entries(filterParams).filter(([_, v]) => v) // remove empty filters
        )
      ).toString();

      const response = await fetch(
        `http://localhost:8080/api/jobs${query ? `/filter?${query}` : ""}`
      );

      if (!response.ok) throw new Error("Failed to fetch jobs");

      const data = await response.json();
      setJobs(data);
      console.log("Fetched jobs:", data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial load (fetch all jobs)
  useEffect(() => {
    fetchJobs();
  }, []);

  // Handle filter updates from SearchBar (optional)
  const handleSearch = (searchFilters) => {
    setFilters(searchFilters);
    fetchJobs(searchFilters);
  };

  return (
    <div className="min-h-screen bg-light-gray font-poppins text-text-color">
      <Navbar />
      <SearchBar onSearch={handleSearch} />

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          All Government Job Notices
        </h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p className="text-center text-gray-600">No jobs found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard 
                key={job.jobId}
                jobId={job.jobId}
                jobTitle={job.jobTitle}
                agency={job.agency}
                location={job.location}
                deadline={job.deadline}
                qualification={job.qualification}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
