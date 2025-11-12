import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import api from "../../api/axiosConfig";

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

  const downloadPdf = async (jobId) => {
    if (!job || !job.pdfFileName) return;

    try {
      console.log("Initiating PDF download for jobId:", jobId);
      const response = await api.get(`/api/jobs/download-pdf/${jobId}`, {
        responseType: "blob", // important for file download
      });

      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );

      const link = document.createElement("a");
      link.href = url;

      const contentDisposition = response.headers["content-disposition"];
      let fileName = job.pdfFileName || "job.pdf";
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?(.+)"?/);
        if (match && match[1]) fileName = match[1];
      }

      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();

      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download PDF:", error);
    }
  };

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
      <section className="bg-gray-100 py-6 mb-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-dark-text">Job Details</h2>
        </div>
      </section>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-3xl font-bold text-dark-text mb-2">
          {job.jobTitle}
        </h1>

        <p className="text-gray-text mb-4">
          Agency:{" "}
          <span className="font-semibold text-dark-text">{job.agency}</span>
        </p>

        <p className="text-gray-text mb-4">
          Location:{" "}
          <span className="font-semibold text-dark-text">{job.location}</span>
        </p>

        <p className="text-gray-text mb-8">
          Application Deadline:{" "}
          <span className="font-semibold text-dark-text">{job.deadline}</span>
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold text-dark-text mb-4">
                Requirements
              </h2>
              <p className="text-gray-700 whitespace-pre-line">
                {job.requirement || "No specific requirements provided."}
              </p>
            </div>

            {job.pdfFileName && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-semibold text-dark-text mb-4">
                  Job Notice PDF
                </h2>
                <button
                  onClick={downloadPdf}
                  className="text-primary font-medium underline"
                >
                  Download PDF
                </button>
              </div>
            )}
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
