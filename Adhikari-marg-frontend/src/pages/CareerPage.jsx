import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const CareerPage = () => {
  const { user } = useAuth(); // Logged-in user from context
  const [preferences, setPreferences] = useState([]);
  const [newKeyword, setNewKeyword] = useState("");
  const [newType, setNewType] = useState("location");
  const [preferredJobs, setPreferredJobs] = useState([]);

  // Fetch preferences for logged-in user
  const fetchPreferences = async () => {
    try {
      const res = await api.get("/api/preferences");
      console.log("Fetched preferences:", res.data);
      setPreferences(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPreferredJobs = async () => {
    try {
      const res = await api.get("/api/jobs/preferred");
      console.log("Fetched preferred jobs:", res.data);
      setPreferredJobs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchPreferences();
      fetchPreferredJobs();
    }
  }, [user]);

  const handleAddPreference = async () => {
    if (!newKeyword) return;
    try {
      await api.post("/api/preferences", { keyword: newKeyword, type: newType });
      setNewKeyword("");
      fetchPreferences();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePreference = async (id) => {
  if (!window.confirm("Are you sure you want to delete this preference?")) return;

  try {
    await api.delete(`/api/preferences/${id}`);
    setPreferences((prev) => prev.filter((p) => p.id !== id));
  } catch (err) {
    console.error("Error deleting preference", err);
  }
};



  return (
    <>
      <Navbar />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">Your Preferences</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter keyword"
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
            className="border p-2 rounded"
          />
          <select
            className="border p-2 rounded"
            value={newType}
            onChange={(e) => setNewType(e.target.value)}
          >
            <option value="location">Location</option>
            <option value="title">Job Title</option>
            <option value="qualification">Qualification</option>
          </select>
          <button
            onClick={handleAddPreference}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Preference
          </button>
        </div>



<ul className="mb-6">
  {preferences.map((pref) => (
    <li
      key={pref.id}
      className="border p-2 rounded mb-2 flex items-center justify-between"
    >
      <span>
        {pref.keyword} ({pref.type})
      </span>

       <DeleteOutlined
        onClick={() => handleDeletePreference(pref.id)}
        style={{ color: "red", cursor: "pointer" }}
      />
    </li>
  ))}
</ul>


        {/* Placeholder Preferred Careers */}
        <h2 className="text-xl font-bold mb-2">Recommended Careers</h2>
        <ul className="mb-4 flex flex-col ">
          {preferredJobs.length === 0 ? (
  <p className="text-gray-500">No recommended careers yet</p>
) : (
  preferredJobs.map((job) => (
    <Link key={job.id} to={`/jobs/${job.id}`} className="job-card border p-4 rounded mb-4">
      <h3>{job.title}</h3>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Qualification:</strong> {job.qualification}</p>
      <p><strong>Agency:</strong> {job.agency}</p>
    </Link>
  ))
)}

        </ul>
      </div>
    </>
  );
};

export default CareerPage;
