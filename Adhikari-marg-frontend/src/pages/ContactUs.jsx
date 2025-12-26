import React from "react";
import { motion } from "framer-motion";
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from "@ant-design/icons";
import Navbar from "../components/Navbar";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const ContactUs = () => {
  return (<>
    <Navbar />
    <div className="min-h-screen bg-gray-50 mb-2 pt-24 px-4 sm:px-6 lg:px-8">

      {/* Header */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeUp}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-800">Contact Us</h1>
        <p className="text-gray-600 max-w-2xl mx-auto mt-3">
          We’re here to help! Reach out to us anytime and we’ll respond as soon as possible.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* Contact Info */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="bg-white shadow-xl rounded-2xl p-8"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Get In Touch</h2>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <MailOutlined className="w-8 h-8 text-blue-600" />
              <p className="text-gray-700">support@yourapp.com</p>
            </div>

            <div className="flex items-center gap-4">
              <PhoneOutlined className="w-8 h-8 text-green-600" />
              <p className="text-gray-700">+977-9876543210</p>
            </div>

            <div className="flex items-center gap-4">
              <EnvironmentOutlined className="w-8 h-8 text-red-600" />
              <p className="text-gray-700">Kathmandu, Nepal</p>
            </div>
          </div>

          <div className="mt-10 p-4 bg-blue-50 border-l-4 border-blue-600 rounded-lg">
            <p className="text-gray-700">
              Our team is available 7 days a week. Feel free to write us anytime!
            </p>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="bg-white shadow-xl rounded-2xl p-8 space-y-5"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Send a Message</h2>

          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <textarea
            placeholder="Your Message"
            rows="5"
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          ></textarea>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-blue-700 transition"
          >
            Send Message
          </motion.button>
        </motion.form>
      </div>

      {/* Map Section */}
      <motion.div
  variants={fadeUp}
  initial="hidden"
  animate="show"
  className="mt-14 w-full"
>
  <div className="relative w-full h-0" style={{ paddingBottom: "56.25%" }}>
    <iframe
      title="Map"
      src="https://maps.google.com/maps?q=Kanchanpur&t=&z=13&ie=UTF8&iwloc=&output=embed"
      className="absolute top-0 left-0 w-full h-full rounded-xl shadow-lg"
      allowFullScreen
      loading="lazy"
    ></iframe>
  </div>
</motion.div>

    </div>

    </>
  );
}

export default ContactUs;