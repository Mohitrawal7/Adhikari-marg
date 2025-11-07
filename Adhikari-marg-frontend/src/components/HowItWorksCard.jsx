// src/components/HowItWorksCard.jsx
import React from "react";

const HowItWorksCard = ({ icon, title, isActive = false }) => {
  const cardClasses = `bg-white rounded-lg shadow-md p-6 text-center transition-all duration-300 ease-in-out
    ${
      isActive
        ? "border-2 border-primary shadow-lg scale-105"
        : "hover:shadow-lg hover:scale-105"
    }`;

  const iconClasses = `mx-auto mb-4 h-12 w-12 flex items-center justify-center rounded-full
    ${isActive ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-500"}`;

  return (
    <div className={cardClasses}>
      <div className={iconClasses}>{icon}</div>
      <h3 className="text-lg font-semibold text-dark-text">{title}</h3>
    </div>
  );
};

export default HowItWorksCard;
