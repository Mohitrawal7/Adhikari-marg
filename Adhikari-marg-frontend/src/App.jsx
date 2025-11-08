import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/Homepage";
import CareerPage from "./pages/CareerPage";
import AboutPage from "./pages/AboutPage";
import SingleJobPage from "./pages/SingleJobPage";
import InstitutionPage from "./pages/InstitutionPage";
import PremiumPage from "./pages/PremiumPage";
import PaymentPage from "./pages/PaymentPage";
import PremiumRoute from "./components/PremiumRoute";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
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
              <PaymentPage />
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
          path="/jobs/:jobId"
          element={
            <ProtectedRoute>
              <SingleJobPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </div>
  );
}

export default App;
