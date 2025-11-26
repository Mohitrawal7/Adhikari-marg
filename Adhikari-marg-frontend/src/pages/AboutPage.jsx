import React,{useState} from 'react';
import { Transition } from '@headlessui/react';


import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const featuresData = [
  {
    icon: '💡', // Replace with actual icons (e.g., from Heroicons)
    title: 'Innovation Driven',
    description: 'Constantly exploring new technologies and ideas to deliver cutting-edge solutions.'
  },
  {
    icon: '🤝',
    title: 'Customer Centric',
    description: 'Our users are at the heart of everything we do. We listen, adapt, and deliver value.'
  },
  {
    icon: '🌍',
    title: 'Global Impact',
    description: 'Building products that make a positive difference across the world.'
  },
  {
    icon: '✨',
    title: 'Quality First',
    description: 'Committed to delivering robust, reliable, and high-performance software.'
  },
];

const testimonialsData = [
  {
    id: 1,
    quote: "This company has transformed our workflow! The team is incredibly responsive and the product just works flawlessly.",
    name: "Jane Doe",
    title: "CEO, Tech Solutions Inc.",
    image: "https://randomuser.me/api/portraits/women/1.jpg" // Placeholder image
  },
  {
    id: 2,
    quote: "An outstanding experience from start to finish. Their attention to detail and commitment to quality are unmatched.",
    name: "John Smith",
    title: "Founder, Creative Agency",
    image: "https://randomuser.me/api/portraits/men/2.jpg"
  },
  {
    id: 3,
    quote: "We've seen significant improvements in efficiency since adopting their platform. Highly recommended!",
    name: "Sarah Chen",
    title: "CTO, Global Logistics",
    image: "https://randomuser.me/api/portraits/women/3.jpg"
  },
  {
    id: 4,
    quote: "Their support team is phenomenal! Always there to help and go the extra mile. A true partner.",
    name: "Michael Brown",
    title: "Director of Operations",
    image: "https://randomuser.me/api/portraits/men/4.jpg"
  },
  {
    id: 5,
    quote: "Innovative solutions that genuinely solve real-world problems. A pleasure to work with.",
    name: "Emily White",
    title: "Product Manager, Startup X",
    image: "https://randomuser.me/api/portraits/women/5.jpg"
  },
];

const developersData = [
  {
    name: "Mohit Rawal",
    role: "Lead Frontend Developer",
    bio: "Passionate about creating intuitive user experiences and elegant interfaces.",
    image: "src/hero.jpg" // Placeholder image
  },
  {
    name: "Mohit Rawal",
    role: "Backend Engineer",
    bio: "Specializes in scalable architectures and robust API development.",
    image: "src/hero.jpg"
  },
  {
    name: "Mohit Rawal",
    role: "UI/UX Designer",
    bio: "Crafting beautiful and functional designs that delight users.",
    image: "src/hero.jpg"
  },
  {
    name: "Mohit Rawal",
    role: "Project Manager",
    bio: "Ensuring smooth project delivery and fostering team collaboration.",
    image: "src/hero.jpg"
  },
];

const AboutUs = () => {

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1
    );
  };

  const visibleTestimonials = testimonialsData.slice(currentIndex, currentIndex + 3).concat(
    currentIndex + 3 > testimonialsData.length ? testimonialsData.slice(0, (currentIndex + 3) % testimonialsData.length) : []
  );

  // If there are less than 3 testimonials, just show what's available
  if (testimonialsData.length < 3) {
      // Logic for handling fewer than 3 testimonials if needed, or simply render what's available
  }


  return (

    <>
    <Navbar />
    <div className="min-h-screen bg-gray-50 font-sans antialiased text-gray-800">

      

       <section className="bg-white py-20 px-4 sm:px-6 lg:px-8 shadow-sm">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl">
          About Our Company
        </h1>
        <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
          We are dedicated to building innovative solutions that empower businesses and individuals. Learn more about our mission, values, and the people behind our success.
        </p>
      </div>
    </section>

 <section className="py-16 bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          What Drives Us
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Our core principles guide every decision and action we take.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featuresData.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-center items-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 text-2xl mx-auto">
                {feature.icon}
              </div>
              <h3 className="mt-5 text-xl font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-base text-gray-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>

 <section className="relative py-16 bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          What Our Clients Say
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Hear directly from those who've experienced our commitment to excellence.
        </p>

        <div className="mt-12 relative">
          <div className="flex justify-center items-stretch gap-8 overflow-hidden">
            {visibleTestimonials.map((testimonial, index) => (
              <Transition
                key={testimonial.id}
                show={true} // Always show visible testimonials
                enter="transform ease-out duration-300 transition"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transform ease-in duration-200 transition"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
                className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 p-4"
              >
                <div className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col h-full">
                  <p className="text-lg text-gray-700 italic flex-grow">"{testimonial.quote}"</p>
                  <div className="mt-6 flex items-center justify-center">
                    <img
                      className="h-12 w-12 rounded-full object-cover mr-4"
                      src={testimonial.image}
                      alt={testimonial.name}
                    />
                    <div className="text-left">
                      <p className="text-base font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.title}</p>
                    </div>
                  </div>
                </div>
              </Transition>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute top-1/2 left-0  lg:-left-20 -translate-y-1/2 bg-blue-500 text-white p-3 px-4 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
            aria-label="Previous Testimonial"
          >
            &larr;
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute top-1/2 right-0 lg:-right-20 -translate-y-1/2 bg-blue-500 text-white p-3 px-4 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
            aria-label="Next Testimonial"
          >
            &rarr;
          </button>
        </div>
      </div>
    </section>
  
 <section className="py-16 bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Meet Our Talented Team
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          We're a group of dedicated professionals passionate about bringing great ideas to life.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {developersData.map((dev, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <img
                className="h-32 w-32 rounded-full object-cover mx-auto"
                src={dev.image}
                alt={dev.name}
              />
              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                {dev.name}
              </h3>
              <p className="mt-1 text-blue-600 text-sm">{dev.role}</p>
              <p className="mt-3 text-base text-gray-600">
                {dev.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>



      <footer className="bg-white py-10 lg:mx-40 lg:mt-12 mx-10 mt-4  shadow-inner">
          <div className="container mx-auto px-4 text-center text-gray-600">
            <div className="mb-4">
              <Link
                to="#"
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
        </footer>
    </div>

    </>
  );
};

export default AboutUs;