import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState("Verifying payment...");

  useEffect(() => {
    // Extract query parameters from eSewa redirect
    const params = new URLSearchParams(location.search);
    const pid = params.get("pid");
    const amt = params.get("amt");
    const refId = params.get("refId");

    if (!pid || !amt || !refId) {
      setMessage("Invalid payment data.");
      setTimeout(() => navigate("/dashboard"), 3000);
      return;
    }

    // Call backend to verify payment
    const verifyPayment = async () => {
      try {
        const response = await fetch(
          `/api/payment/verify?pid=${pid}&amt=${amt}&refId=${refId}`,
          { method: "POST" }
        );
        const result = await response.text();
        setMessage(result);
        // Redirect to dashboard after 3 seconds
        setTimeout(() => navigate("/dashboard"), 3000);
      } catch (error) {
        setMessage("Error verifying payment.");
        setTimeout(() => navigate("/dashboard"), 3000);
      }
    };

    verifyPayment();
  }, [location.search, navigate]);

  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Payment Status</h2>
      <p>{message}</p>
    </div>
  );
};

export default PaymentSuccess;
