// src/pages/CreateInstitution.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";
import Navbar from "../../components/Navbar";

const CreateInstitution = () => {
  const [form, setForm] = useState({ name: "", description: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/institutions", form);
      navigate("/institutions");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create institution");
    }
  };

  return (
    <>
    <Navbar />
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Create Institution</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="name"
          placeholder="Institution Name"
          value={form.name}
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

export default CreateInstitution;
