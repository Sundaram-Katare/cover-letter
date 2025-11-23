"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import Footer from "@/src/components/Footer";

export default function Pricing() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="relative min-h-screen w-full flex flex-col">
        
        {/* Splash Overlay */}
        <AnimatePresence>
          {showSplash && (
            <motion.div
              className="fixed inset-0 flex justify-center items-center bg-white z-50"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <motion.img
                src="/images/pricing.gif"
                className="h-40 sm:h-48 md:h-56 rounded-full"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        {!showSplash && (
          <motion.div
            className="w-full flex flex-col items-center justify-center px-4 sm:px-8 lg:px-16 py-12 font-poppins mt-10"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-center">
              Pricing and Plans
            </h1>
            <p className="text-gray-700 mt-2 mb-10 text-center text-base sm:text-lg">
              Check out our monthly pricing
            </p>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">

              {/* Free Plan */}
              <div className="p-6 bg-white border shadow-md rounded-xl hover:scale-105 transition-all duration-300 flex flex-col space-y-6">
                <h4 className="text-2xl font-medium">Free</h4>
                <h2 className="text-5xl sm:text-6xl font-semibold">$0</h2>

                <div>
                  <p className="font-semibold mb-2">Includes</p>
                  <ul className="space-y-2 text-gray-800 text-sm sm:text-base">
                    <li className="flex items-center gap-2">
                      <Check color="green" /> 3 Generations
                    </li>
                    <li className="flex items-center gap-2">
                      <Check color="green" /> Upload Resume
                    </li>
                    <li className="flex items-center gap-2">
                      <Check color="green" /> Paste JD
                    </li>
                    <li className="flex items-center gap-2">
                      <Check color="green" /> Save Cover Letter
                    </li>
                  </ul>
                </div>
              </div>

              {/* Pro Plan */}
              <div className="p-6 bg-gray-900 text-gray-100 border shadow-md rounded-xl hover:scale-105 transition-all duration-300 flex flex-col space-y-6">
                <h4 className="text-2xl font-medium">Pro</h4>
                <h2 className="text-5xl sm:text-6xl font-semibold">$12</h2>

                <div>
                  <p className="font-semibold mb-2">Includes</p>
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li className="flex items-center gap-2">
                      <Check color="green" /> 50 Generations
                    </li>
                    <li className="flex items-center gap-2">
                      <Check color="green" /> Upload Multiple Resumes
                    </li>
                    <li className="flex items-center gap-2">
                      <Check color="green" /> Paste JD
                    </li>
                    <li className="flex items-center gap-2">
                      <Check color="green" /> Save Cover Letter
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </div>

      <Footer />
    </>
  );
}
