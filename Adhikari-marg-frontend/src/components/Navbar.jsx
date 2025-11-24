
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Transition } from "@headlessui/react";
// import { FiBell } from "react-icons/fi";
// import { useAuth } from "../context/AuthContext";
// import api from "../api/axiosConfig";

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const [isAvatarOpen, setIsAvatarOpen] = useState(false);
//   const [isNotifOpen, setIsNotifOpen] = useState(false);
//   const [notifCount, setNotifCount] = useState(1);
//   const [notifications, setNotifications] = useState([]);
//   const [isMenuOpen, setIsMenuOpen] = useState(false); // MOBILE MENU

//   const fetchNotifications = async () => {
//     try {
//       const res = await api.get("/api/notifications");
//       setNotifications(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchNotifications();
//     setNotifCount(notifications.length);
//   }, [user]);

//   return (
//     <header className="bg-white shadow-sm py-4 relative">
//       <div className="container mx-auto px-4 flex justify-between items-center">

//         {/* Logo */}
//         <Link to="/dashboard" className="flex items-center space-x-2">
//           <svg
//             className="h-8 w-8 text-primary"
//             fill="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path d="M12 2L2 21h20L12 2zm0 6l-5.33 10h10.66L12 8z" />
//           </svg>
//           <div className="flex flex-col">
//             <span className="text-xl font-bold text-primary">Adhikari-Marg</span>
//             <span className="text-xs text-gray-500">
//               The Direct Path to Public Service Success
//             </span>
//           </div>
//         </Link>

//         {/* Desktop Navigation Links */}
//         <nav className="hidden lg:flex lg:mr-[30%] md:mr-80 space-x-8 text-gray-600 font-medium">
//           <Link to="/dashboard" className="hover:text-primary">Home</Link>
//           <Link to="/about" className="hover:text-primary">About Us</Link>
//           <Link to="/career" className="hover:text-primary">Preferred Careers</Link>
//           <Link to="/institutions" className="hover:text-primary">Institutions</Link>
//         </nav>

//         {/* Upgrade Button - Desktop */}
//         {!user?.premium && (
//           <Link to="/premium">
//             <button className="hidden md:flex absolute right-44 bg-gradient-to-r from-primary to-blue-400 text-black font-semibold py-2 px-5 rounded-lg shadow-md hover:from-blue-400 hover:to-primary transition duration-300">
//               Upgrade to Premium
//             </button>
//           </Link>
//         )}

//         {/* Hamburger (Mobile Only) */}
//         <button
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//           className="md:hidden mr-4 text-gray-700 focus:outline-none"
//         >
//           <svg
//             className="w-7 h-7"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             viewBox="0 0 24 24"
//           >
//             {isMenuOpen ? (
//               <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//             ) : (
//               <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
//             )}
//           </svg>
//         </button>

//         {/* Notification Bell */}
//         <div className="relative mr-6 hidden md:block">
//           <FiBell
//             size={24}
//             className="cursor-pointer"
//             onClick={() => {
//               setIsNotifOpen(!isNotifOpen);
//               setNotifCount(0);
//             }}
//           />
//           {notifCount > 0 && (
//             <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
//               {notifCount}
//             </span>
//           )}

//           <Transition
//             show={isNotifOpen}
//             enter="transition ease-out duration-200 transform"
//             enterFrom="opacity-0 scale-95"
//             enterTo="opacity-100 scale-100"
//             leave="transition ease-in duration-150 transform"
//             leaveFrom="opacity-100 scale-100"
//             leaveTo="opacity-0 scale-95"
//           >
//             <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded p-2 z-50">
//               <p className="text-xl ml-4 mt-0 text-blue-600">Notifications</p>
//               <br />
//               {notifications.length === 0 ? (
//                 <p className="text-gray-500 text-sm">No notifications</p>
//               ) : (
//                 notifications.map((n) => (
//                   <Link
//                     key={n.id}
//                     to={`/jobs/${n.jobId}`}
//                     className="block border-b p-2 text-sm hover:bg-gray-100 transition"
//                   >
//                     {n.message}
//                   </Link>
//                 ))
//               )}
//             </div>
//           </Transition>
//         </div>

//         {/* Avatar Dropdown */}
//         <div className="relative hidden md:block">
//           <button
//             onClick={() => setIsAvatarOpen(!isAvatarOpen)}
//             className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 hover:border-primary transition"
//           >
//             <img src="src/hero.jpg" alt="User Avatar" className="w-full h-full object-cover" />
//           </button>

//           <Transition
//             show={isAvatarOpen}
//             enter="transition ease-out duration-200 transform"
//             enterFrom="opacity-0 scale-95"
//             enterTo="opacity-100 scale-100"
//             leave="transition ease-in duration-150 transform"
//             leaveFrom="opacity-100 scale-100"
//             leaveTo="opacity-0 scale-95"
//           >
//             <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
//               <div className="p-4 border-b border-gray-200">
//                 <p className="font-semibold">{user?.username || "Guest"}</p>
//                 <p className="text-sm text-gray-500">{user?.email || "No email"}</p>
//               </div>

//               <Link className="ml-4" to="/change-password">
//                 Change password
//               </Link>

//               <button
//                 onClick={logout}
//                 className="text-left px-4 py-2 hover:bg-gray-100 transition w-full"
//               >
//                 Logout
//               </button>
//             </div>
//           </Transition>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <Transition
//         show={isMenuOpen}
//         enter="transition duration-200"
//         enterFrom="opacity-0 -translate-y-3"
//         enterTo="opacity-100 translate-y-0"
//         leave="transition duration-150"
//         leaveFrom="opacity-100 translate-y-0"
//         leaveTo="opacity-0 -translate-y-3"
//       >
//         <div className="lg:hidden bg-white shadow-md px-6 py-4 space-y-3 text-gray-700 font-medium">

//           {/* Mobile links */}
//           <Link to="/dashboard" className="block hover:text-primary">Home</Link>
//           <Link to="/about" className="block hover:text-primary">About Us</Link>
//           <Link to="/career" className="block hover:text-primary">
//             Preferred Careers
//           </Link>
//           <Link to="/institutions" className="block hover:text-primary">
//             Institutions
//           </Link>

//           {/* Mobile Premium Button */}
//           {!user?.premium && (
//             <Link to="/premium">
//               <button className="w-full bg-primary text-white font-semibold py-2 rounded">
//                 Upgrade to Premium
//               </button>
//             </Link>
//           )}

//         </div>
//       </Transition>
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
  const [notifCount, setNotifCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // MOBILE MENU

  const fetchNotifications = async () => {
    try {
      const res = await api.get("/api/notifications");
      setNotifications(res.data);
      setNotifCount(res.data.length);
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


        {/* Hamburger (MOBILE ONLY) */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden mr-4 text-gray-700 focus:outline-none"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>


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

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex lg:mr-[30%] space-x-8 text-gray-600 font-medium">
          <Link to="/dashboard" className="hover:text-primary">Home</Link>
          <Link to="/about" className="hover:text-primary">About Us</Link>
          <Link to="/career" className="hover:text-primary">Preferred Careers</Link>
          <Link to="/institutions" className="hover:text-primary">Institutions</Link>
        </nav>

        {/* Desktop Premium Button */}
        {!user?.premium && (
          <Link to="/premium">
            <button className="hidden lg:flex absolute right-44 bg-gradient-to-r from-primary to-blue-400 text-black font-semibold py-2 px-5 rounded-lg shadow-md hover:from-blue-400 hover:to-primary transition duration-300">
              Upgrade to Premium
            </button>
          </Link>
        )}

        {/* Hamburger (MOBILE ONLY)
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden mr-4 text-gray-700 focus:outline-none"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button> */}

        {/* Notification Bell */}
        <div className="relative mr-4">
          <FiBell
            size={24}
            className="cursor-pointer"
            onClick={() => {
              setIsNotifOpen(!isNotifOpen);
              setNotifCount(0);
            }}
          />
          {notifCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {notifCount}
            </span>
          )}

          <Transition
            show={isNotifOpen}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded p-3 z-50">
              <h3 className="text-lg font-semibold text-blue-600 mb-2">Notifications</h3>

              {notifications.length === 0 ? (
                <p className="text-gray-500 text-sm">No notifications</p>
              ) : (
                notifications.map((n) => (
                  <Link
                    key={n.id}
                    to={`/jobs/${n.jobId}`}
                    className="block border-b p-2 text-sm hover:bg-gray-100 transition"
                  >
                    {n.message}
                  </Link>
                ))
              )}
            </div>
          </Transition>
        </div>

        {/* Avatar */}
        <div className="relative">
          <button
            onClick={() => setIsAvatarOpen(!isAvatarOpen)}
            className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 hover:border-primary transition"
          >
            <img src="src/hero.jpg" alt="User Avatar" className="w-full h-full object-cover" />
          </button>

          <Transition
            show={isAvatarOpen}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
              <div className="p-4 border-b border-gray-200">
                <p className="font-semibold">{user?.username}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>

              <Link to="/change-password" className="block px-4 py-2 hover:bg-gray-100">
                Change Password
              </Link>

              <button
                onClick={logout}
                className="text-left px-4 py-2 hover:bg-gray-100 w-full"
              >
                Logout
              </button>
            </div>
          </Transition>
        </div>
      </div>

      {/* Mobile Menu */}
      <Transition
        show={isMenuOpen}
        enter="transition duration-200"
        enterFrom="opacity-0 -translate-y-3"
        enterTo="opacity-100 translate-y-0"
        leave="transition duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-3"
      >
        <div className="lg:hidden bg-white shadow-md px-6 py-4 space-y-3 text-gray-700 font-medium">

          <Link to="/dashboard" className="block hover:text-primary">Home</Link>
          <Link to="/about" className="block hover:text-primary">About Us</Link>
          <Link to="/career" className="block hover:text-primary">Preferred Careers</Link>
          <Link to="/institutions" className="block hover:text-primary">Institutions</Link>

          {!user?.premium && (
            <Link to="/premium">
              <button className="w-full bg-primary text-white font-semibold py-2 rounded">
                Upgrade to Premium
              </button>
            </Link>
          )}
        </div>
      </Transition>
    </header>
  );
};

export default Navbar;
