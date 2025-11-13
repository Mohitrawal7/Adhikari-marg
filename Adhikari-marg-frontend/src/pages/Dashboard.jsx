import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import JobCard from "../components/JobCard";
import api from "../api/axiosConfig";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;
  const [filters, setFilters] = useState({
    location: "",
    qualification: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const locationOptions = [
    { value: "", label: "All Locations" },
    { value: "Kathmandu", label: "Kathmandu" },
    { value: "Pokhara", label: "Pokhara" },
    { value: "Biratnagar", label: "Biratnagar" },
    { value: "Lalitpur", label: "Lalitpur" },
  ];

  const qualificationOptions = [
    { value: "", label: "All Qualifications" },
    { value: "SLC", label: "SLC/SEE" },
    { value: "Plus2", label: "+2" },
    { value: "Bachelor", label: "Bachelor's" },
    { value: "Master", label: "Master's" },
    { value: "PhD", label: "PhD" },
  ];

  // Pagination logic
  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const fetchJobs = async () => {
    try {
      setLoading(true);

      // Build query params dynamically
      const params = {};
      if (filters.location.trim()) params.location = filters.location.trim();
      if (filters.qualification.trim())
        params.qualification = filters.qualification.trim();

      // Fetch from backend
      const response = Object.keys(params).length
        ? await api.get("/api/jobs/filter", { params })
        : await api.get("/api/jobs");

      let data = response.data;

      // Client-side search filter
      if (searchTerm.trim()) {
        const lower = searchTerm.toLowerCase();
        data = data.filter(
          (job) =>
            job.jobTitle?.toLowerCase().includes(lower) ||
            job.agency?.toLowerCase().includes(lower)
        );
      }

      setJobs(data);
      console.log("Fetched jobs:", data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [filters, searchTerm]);

  return (
    <div className="min-h-screen bg-light-gray font-poppins text-text-color">
      <Navbar />

      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Available Jobs</h1>

          {user?.role === "ORGANIZATION" && (
            <Link to="/job-post">
              <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                + Add Job
              </button>
            </Link>
          )}
        </div>

        {/* Search + Filter Section */}
        <div className="bg-white shadow-md rounded-lg p-4 mb-8 flex flex-wrap gap-4 items-center">
          <input
            type="text"
            placeholder="Search by job title or agency..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full md:w-1/3"
          />

          <select
            value={filters.location}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, location: e.target.value }))
            }
            className="border rounded-lg px-4 py-2 w-full md:w-1/4"
          >
            {locationOptions.map((loc) => (
              <option key={loc.value} value={loc.value}>
                {loc.label}
              </option>
            ))}
          </select>

          <select
            value={filters.qualification}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, qualification: e.target.value }))
            }
            className="border rounded-lg px-4 py-2 w-full md:w-1/4"
          >
            {qualificationOptions.map((q) => (
              <option key={q.value} value={q.value}>
                {q.label}
              </option>
            ))}
          </select>
        </div>

        {/* Job List */}
        {loading ? (
          <p className="text-center text-gray-600">Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p className="text-gray-500 text-center">
            No jobs found matching your filters.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentJobs.map((job) => (
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
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition"
          >
            Previous
          </button>

          <span className="text-gray-700 font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
