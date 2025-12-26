// // src/pages/HomePage.jsx (or src/HomePage.jsx if you prefer)
// import React from "react";
// import HowItWorksCard from "../components/HowItWorksCard";
// import { Link } from "react-router-dom";

// const HomePage = () => {
//   return (
//     <div className="min-h-screen bg-gray-300 font-sans  text-dark-text">
//       {/* Top Bar with Name and Auth Links */}
//       <div className="bg-white mx-10 rounded-md shadow-sm py-4">
//         <div className="container mx-auto px-4 flex justify-between items-center">
//           {/* Logo/Name */}
//           <div className="flex items-center space-x-2">
//             {/* You can replace this with an actual SVG logo or image */}
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

//           {/* Login / Register Links */}
//           <div className="flex items-center space-x-6 text-gray-700 font-medium">
//             <Link
//               to="/login"
//               className="hover:text-primary transition duration-300"
//             >
//               Login
//             </Link>
//             <Link
//               to="/register"
//               className="bg-blue-500 text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
//             >
//               Register
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Hero Section */}
//       <div className="bg-slate-200 mx-10 mt-2">
//       <section className="relative bg-white rounded-md py-24 overflow-hidden md:py-24">
//         <div className="container mx-8 bg-white px-8 flex flex-col md:flex-row items-center justify-between ">
//           {/* Text Content */}
//           <div className="w-full md:w-1/2 text-center md:text-left mb-12 md:mb-0">
//             <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-dark-text leading-tight mb-4">
//               Find your perfect <br className="hidden sm:inline" /> government
//               job faster
//             </h1>
//             <p className="text-base sm:text-lg text-gray-text mb-8 max-w-md mx-auto md:mx-0">
//               We help you to find the perfect government job fast and get
//               alerts. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//               Integer nec odio. Praesent libero.
//             </p>
//             <div className="flex justify-center md:justify-start space-x-4">
//               <Link
//                 to="/register"
//                 className="bg-blue-500 text-white font-semibold py-3 px-8 rounded-lg shadow-md border-2 border-blue-500 
//                    hover:bg-white hover:text-blue-500 transition duration-300 text-lg"
//               >
//                 Get Started
//               </Link>

//               {/* Login Button */}
//               <Link
//                 to="/login"
//                 className="bg-white text-blue-500 font-semibold py-3 px-8 rounded-lg shadow-md border-2 border-primary 
//                    hover:bg-blue-500 hover:text-white transition duration-300 text-lg"
//               >
//                 Login
//               </Link>
//             </div>
//           </div>

//           {/* Illustration */}
//           <div className="w-full md:w-1/2 flex justify-center md:justify-end">
//             <img
//               src="/images/hero.jpg.png" // Placeholder
//               alt="People finding government jobs"
//               className="w-full max-w-md md:max-w-lg lg:max-w-xl h-auto"
//             />
//           </div>
//         </div>

//         {/* Abstract background shapes */}
//         <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-30">
//           <div className="absolute top-0 left-0 w-64 h-64 bg-light-blue rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
//           <div className="absolute top-0 -right-20 w-72 h-72 bg-light-blue rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
//           <div className="absolute -bottom-8 left-1/4 w-80 h-80 bg-light-blue rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
//         </div>
//       </section>
//       </div>

//       <div className="bg-gray-200 shadow-white mx-10 mt-10 ">
//         {/* How It Works Section */}
//         <section className="py-16 bg-light-gray-bg">
//           <div className="container mx-auto px-4 max-w-4xl">
//             <h2 className="text-3xl font-bold text-dark-text text-center mb-10">
//               How It Works
//             </h2>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               <HowItWorksCard
//                 icon={
//                   <svg
//                     className="h-6 w-6"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                     ></path>
//                   </svg>
//                 }
//                 title="Search Jobs"
//               />
//               <HowItWorksCard
//                 icon={
//                   <svg
//                     className="h-6 w-6"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
//                     ></path>
//                   </svg>
//                 }
//                 title="Get Alerts"
//                 isActive={true}
//               />
//               <HowItWorksCard
//                 icon={
//                   <svg
//                     className="h-6 w-6"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
//                     ></path>
//                   </svg>
//                 }
//                 title="Join Courses"
//               />
//             </div>
//           </div>
//         </section>

//         {/* Footer */}

//         <footer className="bg-white py-10 mx-40 mt-12 shadow-inner">
//           <div className="container mx-auto px-4 text-center text-gray-600">
//             <div className="mb-4">
//               <a
//                 href="#"
//                 className="text-gray-700 hover:text-primary mx-3 transition duration-300"
//               >
//                 Privacy Policy
//               </a>
//               <span className="text-gray-400">|</span>
//               <a
//                 href="#"
//                 className="text-gray-700 hover:text-primary mx-3 transition duration-300"
//               >
//                 Terms of Service
//               </a>
//               <span className="text-gray-400">|</span>
//               <a
//                 href="#"
//                 className="text-gray-700 hover:text-primary mx-3 transition duration-300"
//               >
//                 Contact Us
//               </a>
//             </div>
//             <p>
//               &copy; {new Date().getFullYear()} GOVTCAREERS. All rights
//               reserved.
//             </p>
//             <p className="mt-2 text-sm text-gray-500">
//               Designed with passion for public service aspirants.
//             </p>
//           </div>
//         </footer>
//       </div>
//       <div className="bg-gray-300 h-[1%] text-black">
//         <p> .</p>
//       </div>
//     </div>
//   );
// };

// export default HomePage;




import React from "react";
import { Link } from "react-router-dom";
import HowItWorksCard from "../components/HowItWorksCard";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">

      {/* ================= NAVBAR ================= */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold">
              A
            </div>
            <div>
              <h1 className="text-lg font-bold text-blue-600">
                Adhikari-Marg
              </h1>
              <p className="text-xs text-gray-500">
                Direct Path to Public Service
              </p>
            </div>
          </div>

          <div className="flex gap-6 items-center">
            <Link to="/login" className="font-medium hover:text-blue-600">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Register
            </Link>
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-14 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              Your dream government job  
              <span className="text-blue-600"> starts here</span>
            </h2>

            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Discover verified government job vacancies, instant alerts,
              and preparation courses designed for serious aspirants.
            </p>

            <div className="flex gap-4">
              <Link
                to="/register"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
              >
                Get Started
              </Link>

              <Link
                to="/login"
                className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg text-lg hover:bg-blue-50 transition"
              >
                Login
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <img
              src="/images/hero.jpg.png"
              alt="Government job preparation"
              className="max-w-md w-full"
            />
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-14">
            How It Works
          </h3>

          <div className="grid md:grid-cols-3 gap-10">
            <HowItWorksCard
              title="Search Jobs"
              icon={<span className="text-xl">🔍</span>}
            />
            <HowItWorksCard
              title="Get Alerts"
              isActive
              icon={<span className="text-xl">🔔</span>}
            />
            <HowItWorksCard
              title="Join Courses"
              icon={<span className="text-xl">📘</span>}
            />
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-6 py-10 text-center text-gray-600">
          <div className="mb-4 space-x-6">
            <a href="#" className="hover:text-blue-600">Privacy</a>
            <a href="#" className="hover:text-blue-600">Terms</a>
            <a href="#" className="hover:text-blue-600">Contact</a>
          </div>

          <p className="text-sm">
            © {new Date().getFullYear()} Adhikari-Marg. All rights reserved.
          </p>

          <p className="text-xs mt-2">
            Built for Nepal’s public service aspirants 🇳🇵
          </p>
        </div>
      </footer>

    </div>
  );
};

export default HomePage;
