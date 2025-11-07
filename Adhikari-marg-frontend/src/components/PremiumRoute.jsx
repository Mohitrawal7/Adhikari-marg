// src/components/PremiumRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PremiumRoute = ({ children }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  console.log("User Premium Status:", user?.IsPremium);

  if (!user?.IsPremium) {
    return <Navigate to="/premium" state={{ from: location }} />;
  }

//   if (!user?.premium) {
//   return (
//     <div className="text-center mt-20">
//       <h2 className="text-xl font-semibold text-gray-800">
//         Premium Feature 🔒
//       </h2>
//       <p className="text-gray-600 mb-4">
//         Upgrade to Premium to access this feature.
//       </p>
//       <Link to="/premium" className="text-blue-600 underline">
//         Go to Premium Page
//       </Link>
//     </div>
//   );
// }


  return children;
};

export default PremiumRoute;
