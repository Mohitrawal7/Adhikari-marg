// src/pages/CreateCourse.jsx
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axiosConfig";
import Navbar from "../../components/Navbar";

const CreateCourse = () => {
  const { institutionId } = useParams();
  const [form, setForm] = useState({
    title: "",
    description: "",
    duration: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(institutionId);
      await api.post(`/api/courses/institution/${institutionId}`, form);
      navigate(`/institutions/${institutionId}/courses`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create course");
    }
  };

  return (
    <>
    <Navbar />
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Create Course</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="title"
          placeholder="Course Title"
          value={form.title}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          name="duration"
          placeholder="Duration (e.g. 6 weeks)"
          value={form.duration}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <button className="bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Create
        </button>
      </form>
    </div>
    </>
  );
};

export default CreateCourse;
