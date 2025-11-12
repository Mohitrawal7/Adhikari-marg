// src/pages/EsewaPayment.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axiosConfig";

const EsewaPayment = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const amount = 1000; // Amount in NPR (example)

  if (!user) return <p>Loading user info...</p>;
  const handleMockPayment = async () => {
    setLoading(true);
    const pid = user.id;
    const refId = `MOCK-REF-${Date.now()}`;

    try {
      // Axios automatically sets method and JSON headers
      const response = await api.post("/api/payment/mock", {
        pid,
        amt: amount,
        refId,
      });

      const result = response.data; // Axios stores response in .data
      alert(result + " (This is a mock payment response)");

      // Fetch updated user info from backend
      const userRes = await api.get("/api/users/me");
      const updatedUser = userRes.data;
      setUser(updatedUser); // update context
      navigate("/dashboard");
    } catch (err) {
      console.error("Mock payment error:", err);
      alert("Error processing mock payment.");
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <p className="mb-4">
        Mock payment amount: NPR {amount / 100 ? amount / 100 : amount}{" "}
      </p>
      <button
        onClick={handleMockPayment}
        disabled={loading}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        {loading ? "Processing..." : "Pay (mock eSewa)"}
      </button>
      <p className="mt-3 text-sm text-gray-600">
        This is a mock payment for development. Replace with real eSewa form
        later.
      </p>
    </div>
  );
};

export default EsewaPayment;
