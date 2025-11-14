// src/pages/CoursePage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axiosConfig";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";

const CoursePage = () => {
  const { institutionId } = useParams();
  const [courses, setCourses] = useState([]);
  const [institution, setInstitution] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const instRes = await api.get(`/api/institutions/${institutionId}`);
        const courseRes = await api.get(
          `/api/courses/institution/${institutionId}`
        );
        setInstitution(instRes.data);
        setCourses(courseRes.data);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [institutionId]);
 


  return (
    <>
      <Navbar />
      <div className="p-6">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">
                Courses for {institution.name}
              </h2>
              {user?.role === "INSTITUTION" && (
                <button
                  onClick={() =>
                    navigate(`/institutions/${institutionId}/courses/create`)
                  }
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  + Add Course
                </button>
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {courses.map((course) => (
                <div
                  key={course.courseId}
                  onClick={() => navigate(`/courses/${course.courseId}`)}
                  className="border rounded-lg p-4 shadow hover:shadow-lg cursor-pointer transition"
                >
                  <h3 className="text-lg font-bold">{course.title}</h3>
                  <p className="text-gray-600 mt-1">{course.duration}</p>
                  <p className="text-gray-700 mt-2 line-clamp-2">
                    {course.description}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      
    </>
  );
};

export default CoursePage;
