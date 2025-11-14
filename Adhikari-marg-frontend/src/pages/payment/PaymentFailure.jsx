import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PaymentFailure = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const refId = params.get("refId");
    console.log("Failed payment reference:", refId);

    // Redirect to premium page after 3 seconds
    setTimeout(() => navigate("/premium"), 3000);
  }, [location.search, navigate]);

  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Payment Failed</h2>
      <p>Your payment could not be completed. Redirecting to premium page...</p>
    </div>
  );
};

export default PaymentFailure;
