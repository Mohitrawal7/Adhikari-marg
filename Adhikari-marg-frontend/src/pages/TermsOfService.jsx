import React from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-gray-800">
      <Navbar />

      {/* HERO */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8 shadow-sm">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            Understand your rights and responsibilities while using our platform.
          </p>
        </motion.div>
      </section>

      {/* CONTENT */}
      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 space-y-12">
        {[ 
          {
            title: "Use of Platform",
            text: "You agree to use GOVTCAREERS in a responsible manner and comply with all applicable laws."
          },
          {
            title: "Account Responsibilities",
            text: "You are responsible for maintaining the confidentiality of your login credentials."
          },
          {
            title: "Our Rights",
            text: "We reserve the right to update features, modify services, or suspend accounts if necessary."
          }
        ].map((item, idx) => (
          <motion.div
            key={idx}
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              {item.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">{item.text}</p>
          </motion.div>
        ))}
      </main>
    </div>
  );
};

export default TermsOfService;
