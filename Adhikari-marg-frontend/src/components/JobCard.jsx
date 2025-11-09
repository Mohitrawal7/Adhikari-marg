import React from "react";
import { Link } from "react-router-dom";

const JobCard = ({ jobId, jobTitle, agency, location, deadline, qualification}) => {
  // console.log("Rendering JobCard for jobId:", jobId);
  return (
    <Link
      to={`/jobs/${jobId}`}
      className="block bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 p-6"
    >
      <h3 className="text-lg font-semibold text-blue-500 mb-2">{jobTitle}</h3>
      <p className="text-gray-600 mb-1">Agency: {agency}</p>
      <p className="text-gray-600 mb-1">Location: {location}</p>
      <p className="text-gray-600 mb-1">Qualification: {qualification}</p>
      <p className="text-gray-500 text-sm mt-2">
        Deadline: <span className="font-medium">{deadline}</span>
      </p>

    
    </Link>
  );
};

export default JobCard;
