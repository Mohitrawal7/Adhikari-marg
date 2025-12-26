

// import React, { useState, useEffect } from "react";
// import { FiMenu, FiBell } from "react-icons/fi";
// import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import api from "../api/axiosConfig";

// const Navbar = () => {
//   const { user, logout } = useAuth();

//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [isNotifOpen, setIsNotifOpen] = useState(false);
//   const [notifications, setNotifications] = useState([]);
//   const [notifCount, setNotifCount] = useState(0);

//   // Fetch notifications
//   const fetchNotifications = async () => {
//     try {
//       const res = await api.get("/api/notifications");
//       setNotifications(res.data);
//       setNotifCount(res.data.length);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     if (user) fetchNotifications();
//   }, [user]);

//   return (
//     <nav className="w-full shadow bg-white px-4 py-6 flex justify-between items-center relative z-50">
//       {/* LEFT — Hamburger + Logo */}
//       <div className="flex items-center gap-3">
//         <FiMenu
//           size={26}
//           className="cursor-pointer block md:hidden"
//           onClick={() => {
//             setIsMenuOpen(!isMenuOpen);
//             setIsNotifOpen(false);
//             setIsProfileOpen(false);
//           }}
//         />

//         <Link to="/dashboard" className="flex items-center space-x-2">
//           <svg
//             className="h-8 w-8 text-primary"
//             fill="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path d="M12 2L2 21h20L12 2zm0 6l-5.33 10h10.66L12 8z" />
//           </svg>
//           <div className="flex flex-col">
//             <span className="text-xl font-bold text-primary">
//               Adhikari-Marg
//             </span>
//             <span className="text-xs text-gray-500">
//               The Direct Path to Public Service Success
//             </span>
//           </div>
//         </Link>
//       </div>

//       {/* DESKTOP NAV */}
//       <div className="hidden lg:flex items-center gap-6">
//         <Link to="/dashboard" className="text-gray-700">
//           Home
//         </Link>
//         <Link to="/about" className="text-gray-700">
//           About
//         </Link>
//         <Link to="/career" className="text-gray-700">
//           Preferred Careers
//         </Link>
//         <Link to="/institutions" className="text-gray-700">
//           Institutions
//         </Link>

//         {!user?.premium && (
//           <Link
//             to="/premium"
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium"
//           >
//             Upgrade to Premium
//           </Link>
//         )}
//       </div>

//       {/* RIGHT — Notifications + Avatar */}
//       <div className="flex items-center gap-5">
//         {/* Notification Bell */}
//         <div className="relative">
//           <FiBell
//             size={24}
//             className="cursor-pointer"
//             onClick={() => {
//               setIsNotifOpen(!isNotifOpen);
//               setIsProfileOpen(false);
//               setIsMenuOpen(false);
//               setNotifCount(0);
//             }}
//           />

//           {notifCount > 0 && (
//             <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] px-[6px] py-[1px] rounded-full">
//               {notifCount}
//             </span>
//           )}

//           {/* NOTIF DROPDOWN */}
//           {isNotifOpen && (
//             <div className="absolute right-0 mt-2 bg-white shadow-md p-3 w-60 rounded animate-fade z-50">
//               <p className="text-blue-600 font-semibold mb-2">Notifications</p>

//               {notifications.length === 0 ? (
//                 <p className="text-sm text-gray-600">No new notifications</p>
//               ) : (
//                 notifications.map((n) => (
//                   <Link
//                     key={n.id}
//                     to={`/jobs/${n.jobId}`}
//                     className="block text-sm border-b p-2 hover:bg-gray-100 transition"
//                   >
//                     {n.message}
//                   </Link>
//                 ))
//               )}
//             </div>
//           )}
//         </div>

//         {/* Profile Avatar */}
//         <div className="relative">
//           <img
//             src="src/hero.jpg"
//             alt="profile"
//             className="w-12 h-12 rounded-full cursor-pointer border"
//             onClick={() => {
//               setIsProfileOpen(!isProfileOpen);
//               setIsNotifOpen(false);
//               setIsMenuOpen(false);
//             }}
//           />
//           {isProfileOpen && (
//             <div className="absolute right-0 mt-2 bg-white shadow-md rounded w-48 py-2 animate-fade z-50">
//               {/* User Info */}
//               <div className="px-3 py-2 border-b">
//                 <p className="font-semibold">{user?.username}</p>
//                 <p className="text-xs text-gray-500">{user?.email}</p>
//               </div>

//               <Link
//                 to="/change-password"
//                 className="block px-3 py-2 text-sm hover:bg-gray-100"
//               >
//                 Change Password
//               </Link>

//               <button
//                 onClick={logout}
//                 className="px-3 py-2 text-sm w-full text-left text-red-500 hover:bg-gray-100"
//               >
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* MOBILE SLIDE MENU */}
//       {isMenuOpen && (
//         <div className="absolute top-0 left-0 w-[40%] h-screen overflow-y-auto  bg-white shadow-md p-4 flex flex-col gap-3 lg:hidden animate-slide z-40">
        
//          <div className="flex items-center gap-3 pt-4">
//         <FiMenu
//           size={26}
//           className="cursor-pointer block md:hidden"
//           onClick={() => {
//             setIsMenuOpen(!isMenuOpen);
//             setIsNotifOpen(false);
//             setIsProfileOpen(false);
//           }}
//         />

//         <Link to="/dashboard" className="flex items-center space-x-2">
//           <svg
//             className="h-8 w-8 text-primary"
//             fill="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path d="M12 2L2 21h20L12 2zm0 6l-5.33 10h10.66L12 8z" />
//           </svg>
//           <div className="flex flex-col">
//             <span className="text-xl font-bold text-primary">
//               Adhikari-Marg
//             </span>
//             <span className="text-xs text-gray-500">
//               The Direct Path to Public Service Success
//             </span>
//           </div>
//         </Link>
//       </div>

//           <Link to="/dashboard" className="text-gray-700">
//             Home
//           </Link>
//           <Link to="/about" className="text-gray-700">
//             About
//           </Link>
//           <Link to="/career" className="text-gray-700">
//             Preferred Careers
//           </Link>
//           <Link to="/institutions" className="text-gray-700">
//             Institutions
//           </Link>





//           {!user?.premium && (
//             <Link to="/premium" className="text-blue-600 font-semibold">
//               Upgrade to Premium
//             </Link>
//           )}  

//           <br className="h-4 to-black" />
//         </div>
//       )}

//       {/* ANIMATIONS */}
//       <style>{`
//         .animate-slide {
//           animation: slideIn 0.25s ease-out;
//         }
//         @keyframes slideIn {
//           from { transform: translateX(-15%); opacity: 0; }
//           to { transform: translateX(0); opacity: 1; }
//         }

//         .animate-fade {
//           animation: fadeIn 0.25s ease-out;
//         }
//         @keyframes fadeIn {
//           from { opacity: 0; transform: scale(0.97); }
//           to { opacity: 1; transform: scale(1); }
//         }
//       `}</style>
//     </nav>
//   );
// };

// export default Navbar;












import React, { useState, useEffect } from "react";
import { FiMenu, FiBell } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axiosConfig";

const Navbar = () => {
  const { user, logout } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notifCount, setNotifCount] = useState(0);

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const res = await api.get("/api/notifications");
      setNotifications(res.data);
      setNotifCount(res.data.length);
    } catch (err) {
      console.error(err);
    }
  };

  // Load notifications + lock scroll when menu open
  useEffect(() => {
    if (user) fetchNotifications();

    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [user, isMenuOpen]);

  return (
    <nav className="w-full shadow bg-white px-4 py-6 flex justify-between items-center relative z-50">
      {/* LEFT — Hamburger + Logo */}
      <div className="flex items-center gap-3">
        <FiMenu
          size={26}
          className="cursor-pointer block lg:hidden"
          onClick={() => {
            setIsMenuOpen(true);
            setIsNotifOpen(false);
            setIsProfileOpen(false);
          }}
        />

        <Link to="/dashboard" className="flex items-center space-x-2">
          <svg className="h-8 w-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 21h20L12 2zm0 6l-5.33 10h10.66L12 8z" />
          </svg>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-primary">Adhikari-Marg</span>
            <span className="text-xs text-gray-500">The Direct Path to Public Service Success</span>
          </div>
        </Link>
      </div>

      {/* DESKTOP NAV */}
      <div className="hidden lg:flex items-center gap-6">
        <Link to="/dashboard" className="text-gray-700">Home</Link>
        <Link to="/about" className="text-gray-700">About</Link>
        <Link to="/career" className="text-gray-700">Preferred Careers</Link>
        <Link to="/institutions" className="text-gray-700">Institutions</Link>

        {/* {!user?.premium && (
          <Link to="/premium" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium">
            Upgrade to Premium
          </Link>
        )} */}
      </div>

      {/* RIGHT — Notifications + Avatar */}
      <div className="flex items-center gap-5">
        {/* Notification Bell */}
        <div className="relative">
          <FiBell
            size={24}
            className="cursor-pointer"
            onClick={() => {
              setIsNotifOpen(!isNotifOpen);
              setIsProfileOpen(false);
              setIsMenuOpen(false);
              setNotifCount(0);
            }}
          />

          {notifCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] px-[6px] py-[1px] rounded-full">
              {notifCount}
            </span>
          )}

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 bg-white shadow-md p-3 w-60 rounded animate-fade z-50">
              <p className="text-blue-600 font-semibold mb-2">Notifications</p>

              {notifications.length === 0 ? (
                <p className="text-sm text-gray-600">No new notifications</p>
              ) : (
                notifications.map((n) => (
                  <Link
                    key={n.id}
                    to={`/jobs/${n.jobId}`}
                    className="block text-sm border-b p-2 hover:bg-gray-100 transition"
                  >
                    {n.message}
                  </Link>
                ))
              )}
            </div>
          )}
        </div>

        {/* Profile Avatar */}
        <div className="relative">
          <img
            src=""
            alt="profile"
            className="w-12 h-12 rounded-full cursor-pointer border"
            onClick={() => {
              setIsProfileOpen(!isProfileOpen);
              setIsNotifOpen(false);
              setIsMenuOpen(false);
            }}
          />

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 bg-white shadow-md rounded w-48 py-2 animate-fade z-50">
              <div className="px-3 py-2 border-b">
                <p className="font-semibold">{user?.username}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>

              {/* <Link to="/change-password" className="block px-3 py-2 text-sm hover:bg-gray-100">
                Change Password
              </Link> */}

              <button
                onClick={logout}
                className="px-3 py-2 text-sm w-full text-left text-red-500 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* BLUR OVERLAY (click to close menu) */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      {/* MOBILE SLIDE MENU */}
      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-[59%] sm:w-[50%] md:w-[35%] h-screen overflow-y-auto bg-white shadow-md p-3 flex flex-col gap-3 lg:hidden animate-slide z-40">
         
          <div className="flex items-center gap-3 pt-4">
            <FiMenu
              size={26}
              className="cursor-pointer block lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />

            <Link to="/dashboard" className="flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
              <svg className="h-8 w-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 21h20L12 2zm0 6l-5.33 10h10.66L12 8z" />
              </svg>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-primary">Adhikari-Marg</span>
                <span className="text-xs text-gray-500">The Direct Path to Public Service Success</span>
              </div>
            </Link>
          </div>

          <Link to="/dashboard" className="text-gray-700" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/about" className="text-gray-700" onClick={() => setIsMenuOpen(false)}>About</Link>
          <Link to="/career" className="text-gray-700" onClick={() => setIsMenuOpen(false)}>Preferred Careers</Link>
          <Link to="/institutions" className="text-gray-700" onClick={() => setIsMenuOpen(false)}>Institutions</Link>

          
        <span className="border-t border-gray-300 mt-4"></span>
          
          
          <div className="container mx-auto px-4 text-center text-gray-600">
            <div className="mb-4">
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-primary mx-3 transition duration-300"
              >
                Privacy Policy
              </Link>
              <span className="text-gray-400">|</span>
              <Link
                to="/terms-of-service"
                className="text-gray-700 hover:text-primary mx-3 transition duration-300"
              >
                Terms of Service
              </Link>
              <span className="text-gray-400">|</span>
              <Link
                to="/contact-us"
                className="text-gray-700 hover:text-primary mx-3 transition duration-300"
              >
                Contact Us
              </Link>
            </div>
            <p>
              &copy; {new Date().getFullYear()} GOVTCAREERS. All rights
              reserved.
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Designed with passion for public service aspirants.
            </p>
          </div>


          {!user?.premium && (
            <Link to="/premium" className="text-blue-600 font-semibold" onClick={() => setIsMenuOpen(false)}>
              Upgrade to Premium
            </Link>
          )}
        </div>
      )}

      {/* ANIMATIONS */}
      <style>{`
        .animate-slide {
          animation: slideIn 0.25s ease-out;
        }
        @keyframes slideIn {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        .animate-fade {
          animation: fadeIn 0.25s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
