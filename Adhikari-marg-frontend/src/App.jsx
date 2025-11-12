import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
import { useAuth } from "./context/AuthContext";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/Homepage";
import CareerPage from "./pages/CareerPage";
import AboutPage from "./pages/AboutPage";
import InstitutionPage from "./pages/InstitutionPage";
import PremiumPage from "./pages/PremiumPage";
import PremiumRoute from "./components/PremiumRoute";
import JobPostPage from "./pages/JobPostPage";
import ChangePassword from "./pages/ChangePassword";
import JobDetailsPage from "./pages/JobDetailsPage";
import EsewaPayment from "./pages/EsewaPayment";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailure from "./pages/PaymentFailure";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failure" element={<PaymentFailure />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/change-password"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <AboutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/career"
          element={
            <PremiumRoute>
              <CareerPage />
            </PremiumRoute>
          }
        />
        <Route
          path="/institutions"
          element={
            <PremiumRoute>
              <InstitutionPage />
            </PremiumRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <EsewaPayment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/premium"
          element={
            <ProtectedRoute>
              <PremiumPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/job-post"
          element={
            <ProtectedRoute>
              <JobPostPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs/:jobId"
          element={
            <ProtectedRoute>
              <JobDetailsPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </div>
  );
}

export default App;
