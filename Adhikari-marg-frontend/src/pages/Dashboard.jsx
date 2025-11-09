// import React, { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// // import SearchBar from "../components/SearchBar";
// import JobCard from "../components/JobCard";
// import api from "../api/axiosConfig";
// import { useAuth } from "../context/AuthContext";
// import { Link } from "react-router-dom";

// const Dashboard = () => {
//   const { user } = useAuth();
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filters, setFilters] = useState({
//     location: "",
//     qualification: "",
//     dateFilter: "all",
//   });

//   const [searchTerm, setSearchTerm] = useState("");

//   // Fetch jobs from backend
//   // const fetchJobs = async (filterParams = {}) => {
//   //   try {
//   //     setLoading(true);

//   //     // Build query string dynamically
//   //     const query = new URLSearchParams(
//   //       Object.fromEntries(
//   //         Object.entries(filterParams).filter(([_, v]) => v) // remove empty filters
//   //       )
//   //     ).toString();

//   //     const response = await fetch(
//   //       `http://localhost:8080/api/jobs${query ? `/filter?${query}` : ""}`
//   //     );

//   //     if (!response.ok) throw new Error("Failed to fetch jobs");

//   //     const data = await response.json();
//   //     setJobs(data);
//   //     // console.log("Fetched jobs:", data);
//   //   } catch (error) {
//   //     console.error("Error fetching jobs:", error);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

// const fetchJobs = async () => {
//     try {
//       const params = {};
//       if (filters.location) params.location = filters.location;
//       if (filters.qualification) params.qualification = filters.qualification;
//       if (filters.dateFilter && filters.dateFilter !== "all")
//         params.dateFilter = filters.dateFilter;

//       const response = Object.keys(params).length
//         ? await api.get("/api/jobs/filter", { params })
//         : await api.get("/api/jobs");

//       let filtered = response.data;
//       // Apply search (client-side)
//       if (searchTerm.trim() !== "") {
//         filtered = filtered.filter((job) =>
//           job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
//         );
//       }

//       setJobs(filtered);
//     } catch (error) {
//       console.error("Error fetching jobs:", error);
//     }
//   };

//   useEffect(() => {
//     fetchJobs();
//   }, [filters, searchTerm]);

//   // // Initial load (fetch all jobs)
//   // useEffect(() => {
//   //   fetchJobs();
//   // }, []);

//   // // Handle filter updates from SearchBar (optional)
//   // const handleSearch = (searchFilters) => {
//   //   setFilters(searchFilters);
//   //   fetchJobs(searchFilters);
//   // };

//   return (
//     <div className="min-h-screen bg-light-gray font-poppins text-text-color">
//       <Navbar />

//  <div className="container mx-auto p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">Available Jobs</h1>

//         {/* Show Add Job if user is organization */}
//         {user?.role === "ORGANIZATION" && (
//           <Link to="/job-post">
//             <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
//               + Add Job
//             </button>
//           </Link>
//         )}
//       </div>

//       {/* Search + Filter Section */}
//       <div className="bg-white shadow-md rounded-lg p-4 mb-8 flex flex-wrap gap-4 items-center">
//         <input
//           type="text"
//           placeholder="Search by job title..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="border rounded-lg px-4 py-2 w-full md:w-1/3"
//         />

//         <input
//           type="text"
//           placeholder="Filter by location"
//           value={filters.location}
//           onChange={(e) =>
//             setFilters((prev) => ({ ...prev, location: e.target.value }))
//           }
//           className="border rounded-lg px-4 py-2 w-full md:w-1/4"
//         />

//         <input
//           type="text"
//           placeholder="Filter by qualification"
//           value={filters.qualification}
//           onChange={(e) =>
//             setFilters((prev) => ({ ...prev, qualification: e.target.value }))
//           }
//           className="border rounded-lg px-4 py-2 w-full md:w-1/4"
//         />

//         <select
//           value={filters.dateFilter}
//           onChange={(e) =>
//             setFilters((prev) => ({ ...prev, dateFilter: e.target.value }))
//           }
//           className="border rounded-lg px-4 py-2 w-full md:w-1/6"
//         >
//           <option value="all">All Dates</option>
//           <option value="today">Today</option>
//           <option value="lastWeek">Last Week</option>
//         </select>
//       </div>

//       {/* Job List */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {jobs.length > 0 ? (
//           jobs.map((job) => (
//             <Link
//               key={job.jobId}
//               to={`/jobs/${job.jobId}`}
//               className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
//             >
//               <h2 className="text-lg font-semibold text-primary mb-2">
//                 {job.jobTitle}
//               </h2>
//               <p className="text-gray-600 mb-1">
//                 <span className="font-medium">Location:</span> {job.location}
//               </p>
//               <p className="text-gray-600 mb-1">
//                 <span className="font-medium">Qualification:</span>{" "}
//                 {job.qualification}
//               </p>
//               <p className="text-gray-600 mb-1">
//                 <span className="font-medium">Deadline:</span>{" "}
//                 {job.deadline || "N/A"}
//               </p>
//               <p className="text-sm text-gray-500 mt-2">
//                 Posted on: {job.postedOn}
//               </p>
//             </Link>
//           ))
//         ) : (
//           <p className="text-gray-500 text-center col-span-3">
//             No jobs found matching your filters.
//           </p>
//         )}
//       </div>
//     </div>



      

//       <main className="container mx-auto px-4 py-8">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">
//           All Government Job Notices
//         </h2>

//         {loading ? (
//           <p className="text-center text-gray-600">Loading jobs...</p>
//         ) : jobs.length === 0 ? (
//           <p className="text-center text-gray-600">No jobs found.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {jobs.map((job) => (
//               <JobCard 
//                 key={job.jobId}
//                 jobId={job.jobId}
//                 jobTitle={job.jobTitle}
//                 agency={job.agency}
//                 location={job.location}
//                 deadline={job.deadline}
//                 qualification={job.qualification}
//               />
//             ))}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default Dashboard;









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
  const [filters, setFilters] = useState({
    location: "",
    qualification: "",
    dateFilter: "all",
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



  const fetchJobs = async () => {
    try {
      setLoading(true);

      // Build query params dynamically
      const params = {};
      if (filters.location.trim()) params.location = filters.location.trim();
      if (filters.qualification.trim()) params.qualification = filters.qualification.trim();
      if (filters.dateFilter && filters.dateFilter !== "all")
        params.dateFilter = filters.dateFilter;

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


          <select
            value={filters.dateFilter}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, dateFilter: e.target.value }))
            }
            className="border rounded-lg px-4 py-2 w-full md:w-1/6"
          >
            <option value="all">All Dates</option>
            <option value="today">Today</option>
            <option value="lastWeek">Last Week</option>
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
      </div>
    </div>
  );
};

export default Dashboard;
