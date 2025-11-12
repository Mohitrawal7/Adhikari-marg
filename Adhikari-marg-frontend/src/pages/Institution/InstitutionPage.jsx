// src/pages/InstitutionPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";

const InstitutionPage = () => {
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        const response = await api.get("/api/institutions");
        setInstitutions(response.data);
      } catch (error) {
        console.error("Error fetching institutions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInstitutions();
  }, []);

  const handleInstitutionClick = (id) => {
    navigate(`/institutions/${id}/courses`);
  };

  return (
    <>
    <Navbar />
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Institutions</h2>
        {user?.role === "INSTITUTION" && (
          <button
            onClick={() => navigate("/institutions/create")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            + Add Institution
          </button>
        )}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {institutions.map((inst) => (
            <div
              key={inst.institutionId}
              className="border rounded-lg p-4 shadow hover:shadow-lg cursor-pointer transition"
              onClick={() => handleInstitutionClick(inst.institutionId)}
            >
              <h3 className="text-lg font-bold">{inst.name}</h3>
              <p className="text-gray-600 mt-2">{inst.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default InstitutionPage;
