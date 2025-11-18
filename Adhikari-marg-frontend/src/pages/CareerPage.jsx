import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

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
    // Placeholder API for preferred jobs; implement later
    // const res = await api.get("/jobs/preferred");
    setPreferredJobs([]);
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

        {/* Preferences List */}
        <ul className="mb-6">
          {preferences.map((pref) => (
            <li key={pref.id} className="border p-2 rounded mb-2">
              {pref.keyword} ({pref.type})
            </li>
          ))}
        </ul>

        {/* Placeholder Preferred Careers */}
        <h2 className="text-xl font-bold mb-2">Recommended Careers</h2>
        <ul>
          {preferredJobs.length === 0 ? (
            <p className="text-gray-500">No recommended careers yet</p>
          ) : (
            preferredJobs.map((job) => (
              <li key={job.jobId} className="border p-2 rounded mb-2">
                <strong>{job.jobTitle}</strong> - {job.location} ({job.qualification})
              </li>
            ))
          )}
        </ul>
      </div>
    </>
  );
};

export default CareerPage;
