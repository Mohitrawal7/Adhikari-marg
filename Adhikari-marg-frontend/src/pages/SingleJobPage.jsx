import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const JobDetailsPage = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/jobs/${jobId}`);
        if (!response.ok) throw new Error("Failed to fetch job details");
        const data = await response.json();
        setJob(data);
        console.log("Loaded job:", data);
      } catch (error) {
        console.error("Error loading job:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  if (loading) {
    return (
      <p className="text-center py-8 text-gray-600">Loading job details...</p>
    );
  }

  if (!job) {
    return <p className="text-center py-8 text-red-500">Job not found.</p>;
  }

  return (
    <>
    <Navbar />
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold text-dark-text mb-2">{job.title}</h1>
      <div className="flex flex-wrap gap-2 mb-6">
        <span className="px-4 py-1 bg-blue-100 text-primary text-sm font-medium rounded-full">
          {job.department || "General"}
        </span>
        <span className="px-4 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
          {job.category || "Uncategorized"}
        </span>
      </div>

      <p className="text-gray-text mb-8">
        Application Deadline:{" "}
        <span className="font-semibold text-dark-text">
          {job.deadline || "N/A"}
        </span>
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-dark-text mb-4">
              Requirements
            </h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              {job.requirements && job.requirements.length > 0 ? (
                job.requirements.map((req, idx) => <li key={idx}>{req}</li>)
              ) : (
                <li>No specific requirements provided.</li>
              )}
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-dark-text mb-4">
              Steps to Apply
            </h2>
            <p className="text-gray-700">
              Please follow the official instructions mentioned in the job
              notice or agency website.
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <button className="bg-primary text-white font-semibold py-3 px-8 rounded-lg w-full mb-3 hover:bg-blue-600 transition duration-300">
              Apply Now
            </button>
            <button className="bg-white border-2 border-primary text-primary font-semibold py-3 px-8 rounded-lg w-full hover:bg-primary hover:text-white transition duration-300">
              Save Job
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-dark-text mb-4">
              Organization Info
            </h2>
            <p className="font-medium text-gray-800">{job.agency || "N/A"}</p>
            <p className="text-gray-600 mt-2">
              Location: {job.location || "Not specified"}
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default JobDetailsPage;
