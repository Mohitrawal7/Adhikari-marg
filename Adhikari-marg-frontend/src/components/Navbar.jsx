// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Transition } from "@headlessui/react";
// import { useAuth } from "../context/AuthContext";
// import api from "../api/axiosConfig";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [user, setUser] = useState({});
//   const [loading, setLoading] = useState(true);
//   const { logout } = useAuth();



//   const handleLogout = () => {
//     logout();
//     console.log("User logged out");
//   };

//   const fetchUser = async () => {
//     try {
//       const response = await api.get("/api/users/me"); // axios instance
//       setUser(response.data);
//       // console.log("uii ");
//       console.log("Loaded user:", response.data);
//     } catch (error) {
//       console.error("Error loading user:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   return (
//     <header className="bg-white shadow-sm py-4">
//       <div className="container mx-auto px-4 flex justify-between items-center">
//         <Link to="/dashboard" className="flex items-center space-x-2">
//           {/* Logo */}

//           <div className="flex items-center space-x-2">
//             <svg
//               className="h-8 w-8 text-primary"
//               fill="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path d="M12 2L2 21h20L12 2zm0 6l-5.33 10h10.66L12 8z" />
//             </svg>
//             <div className="flex flex-col">
//               <span className="text-xl font-bold text-primary">
//                 Adhikari-Marg
//               </span>
//               <span className="text-xs text-gray-500">
//                 The Direct Path to Public Service Success
//               </span>
//             </div>
//           </div>
//         </Link>

//         {/* Navigation */}
//         <nav className="hidden lg:flex lg:mr-[30%] md:mr-80 space-x-8 text-gray-600 font-medium">
//           <Link
//             to="/dashboard"
//             className="hover:text-primary transition duration-300"
//           >
//             Home
//           </Link>
//           <Link
//             to="/about"
//             className="hover:text-primary transition duration-300"
//           >
//             About Us
//           </Link>
//           <Link
//             to="/career"
//             className="hover:text-primary transition duration-300"
//           >
//             Preferred Careers
//           </Link>
//           <Link
//             to="/institutions"
//             className="hover:text-primary transition duration-300"
//           >
//             Institutions
//           </Link>
//         </nav>

//         {/* Upgrade Button */}
//       {user.premium ? null : (
//         <Link to="/premium" className="mb-10 ml-20">
//           <button
//             type="button"
//             className="absolute right-24 hidden md:right-44 md:flex bg-gradient-to-r from-primary to-blue-400 text-black font-semibold py-2 px-5 rounded-lg shadow-md 
//              hover:from-blue-400 hover:to-primary transition duration-300 items-center justify-center cursor-pointer"
//           >
//             Upgrade to Premium
//             <svg
//               className="ml-2 h-4 w-4"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M5 13l4 4L19 7"
//               ></path>
//             </svg>
//           </button>
//         </Link>
//       )}

//         {/* User Avatar */}
//         <div className="absolute right-4 relative">
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 hover:border-primary transition"
//           >
//             <img
//               src="src/hero.jpg"
//               alt="User Avatar"
//               className="w-full h-full object-cover"
//             />
//           </button>

//           {/* Dropdown Panel with Animation */}
//           <Transition
//             show={isOpen}
//             enter="transition ease-out duration-200 transform"
//             enterFrom="opacity-0 scale-95"
//             enterTo="opacity-100 scale-100"
//             leave="transition ease-in duration-150 transform"
//             leaveFrom="opacity-100 scale-100"
//             leaveTo="opacity-0 scale-95"
//           >
//             <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg border border-gray-200 z-50 origin-top-right">
//               <div className="p-4 border-b border-gray-200">
//                 <p className="font-semibold">{user.username || "Guest User"}</p>
//                 <p className="text-sm text-gray-500">
//                   {user.email || "No email"}
//                 </p>
//               </div>
//               <Link className="ml-4" to="/change-password">
//               Change password
//               </Link>
//               <div className="flex flex-col">
//                 <button
//                   onClick={handleLogout}
//                   className="text-left px-4 py-2 hover:bg-gray-100 transition"
//                 >
//                   Logout
//                 </button>
//               </div>
//             </div>
//           </Transition>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;










import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Transition } from "@headlessui/react";
import { FiBell } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import api from "../api/axiosConfig";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const res = await api.get("/api/notifications");
      console.log("Fetched notifications:", res.data);
      setNotifications(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [user]);

  return (
    <header className="bg-white shadow-sm py-4 relative">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center space-x-2">
          <svg className="h-8 w-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 21h20L12 2zm0 6l-5.33 10h10.66L12 8z" />
          </svg>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-primary">Adhikari-Marg</span>
            <span className="text-xs text-gray-500">The Direct Path to Public Service Success</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden lg:flex lg:mr-[30%] md:mr-80 space-x-8 text-gray-600 font-medium">
          <Link to="/dashboard" className="hover:text-primary transition duration-300">Home</Link>
          <Link to="/about" className="hover:text-primary transition duration-300">About Us</Link>
          <Link to="/career" className="hover:text-primary transition duration-300">Preferred Careers</Link>
          <Link to="/institutions" className="hover:text-primary transition duration-300">Institutions</Link>
        </nav>

        {/* Upgrade Button */}
        {!user?.premium && (
          <Link to="/premium">
            <button className="hidden md:flex absolute right-44 bg-gradient-to-r from-primary to-blue-400 text-black font-semibold py-2 px-5 rounded-lg shadow-md hover:from-blue-400 hover:to-primary transition duration-300">
              Upgrade to Premium
            </button>
          </Link>
        )}

        {/* Notification Bell */}
        <div className="relative mr-6">
          <FiBell size={24} className="cursor-pointer" onClick={() => setIsNotifOpen(!isNotifOpen)} />
          {notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {notifications.length}
            </span>
          )}
          <Transition
            show={isNotifOpen}
            enter="transition ease-out duration-200 transform"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-150 transform"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded p-2 z-50">
              {notifications.length === 0 ? (
                <p className="text-gray-500 text-sm">No notifications</p>
              ) : (
                notifications.map((n) => (
                  <Link
                  key={n.id}
                     to={`/api/jobs/${n.job.jobId}`}  
                  className="block border-b p-2 text-sm hover:bg-gray-100 transition"
                  >
                   {n.message}
                    </Link>
                ))
              )}
            </div>
          </Transition>
        </div>

        {/* Avatar Dropdown */}
        <div className="relative">
          <button onClick={() => setIsAvatarOpen(!isAvatarOpen)} className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 hover:border-primary transition">
            <img src="src/hero.jpg" alt="User Avatar" className="w-full h-full object-cover" />
          </button>
          <Transition
            show={isAvatarOpen}
            enter="transition ease-out duration-200 transform"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-150 transform"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg border border-gray-200 z-50 origin-top-right">
              <div className="p-4 border-b border-gray-200">
                <p className="font-semibold">{user?.username || "Guest"}</p>
                <p className="text-sm text-gray-500">{user?.email || "No email"}</p>
              </div>
              <Link className="ml-4" to="/change-password">Change password</Link>
              <button onClick={logout} className="text-left px-4 py-2 hover:bg-gray-100 transition w-full">Logout</button>
            </div>
          </Transition>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
