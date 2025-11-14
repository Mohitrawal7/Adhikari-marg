// src/pages/CourseDetailsPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axiosConfig";
import Navbar from "../../components/Navbar";

const CourseDetailsPage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get(`/api/courses/${courseId}`);
        setCourse(res.data);
      } catch (error) {
        console.error("Error loading course:", error);
      }
    };
    fetchCourse();
  }, [courseId]);

  if (!course) return <p className="p-6">Loading...</p>;

  return (
    <>
    <Navbar />
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
      <p className="text-gray-600 mb-1">Duration: {course.duration}</p>
      <p className="mt-4 text-gray-800">{course.description}</p>
    </div>
    </>
  );
};

export default CourseDetailsPage;
