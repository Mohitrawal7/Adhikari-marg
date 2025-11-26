import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/User/LoginPage";
import RegisterPage from "./pages/User/RegisterPage";
import Dashboard from "./pages/Dashboard";
import ChangePassword from "./pages/User/ChangePassword"; 
import AboutPage from "./pages/AboutPage";
import CareerPage from "./pages/CareerPage";
import InstitutionPage from "./pages/Institution/InstitutionPage";
import EsewaPayment from "./pages/payment/EsewaPayment";
import PremiumPage from "./pages/User/PremiumPage";
import JobPostPage from "./pages/Job/JobPostPage";
import JobDetailsPage from "./pages/Job/JobDetailsPage";
import InstitutionsPage from "./pages/Institution/InstitutionPage";
import CreateInstitution from "./pages/Institution/CreateInstitution";
import CreateCourse from "./pages/Course/CreateCourse";
import CourcePage from "./pages/Course/CourcePage";
import CourceDetails from "./pages/Course/CourceDetails";
import PaymentSuccess from "./pages/payment/PaymentSuccess";
import PaymentFailure from "./pages/payment/PaymentFailure";
import ProtectedRoute from "./components/ProtectedRoute";
import PremiumRoute from "./components/PremiumRoute";
// import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import ContactUs from "./pages/ContactUs";

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
        <Route
          path="/institutions"
          element={
            <ProtectedRoute>
              <InstitutionsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/institutions/create"
          element={
            <ProtectedRoute>
              <CreateInstitution />
            </ProtectedRoute> 
          }
        />
        <Route
          path="/institutions/:institutionId/courses/create"
          element={
            <ProtectedRoute>
              <CreateCourse />
            </ProtectedRoute>
          }
        />
        <Route
          path="/institutions/:institutionId/courses"
          element={
            <ProtectedRoute>
         <CourcePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses/:courseId"
          element={
            <ProtectedRoute>
              <CourceDetails />
              </ProtectedRoute>
          }
        />

        
{/* <Route path="/pri" element={<ProtectedRoute><PrivacyPolicy /></ProtectedRoute>} /> */}
<Route path="/terms-of-service" element={<ProtectedRoute><TermsOfService /></ProtectedRoute>} />
<Route path="/contact-us" element={<ProtectedRoute><ContactUs /></ProtectedRoute>} />

        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </div>
  );
}

export default App;
