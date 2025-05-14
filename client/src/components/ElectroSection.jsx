import React from "react";
import { motion } from "framer-motion";

const ElectroSection = () => {
  return (
    <motion.div
      className="relative w-full h-screen flex flex-col items-center justify-between overflow-hidden"
      style={{ height: "100dvh" }} // This is the key fix
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full"
          style={{ backgroundImage: "url('/TeamPhoto.jpg')" }}
        />
      </motion.div>

      {/* Concave Arc Overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse 100% 100% at 50% 100%,
              rgba(0, 0, 0, 0) 30%,
              rgba(0, 0, 0, 0) 40%,
              rgba(0, 0, 0, 0.5) 50%,
              rgba(0, 0, 0, 0.7) 60%,
              rgba(0, 0, 0, 1) 70%,
              rgba(0, 0, 0, 1) 100% 
            )`
        }}
      />

      {/* Content Section */}
      <div className="relative z-10 text-center px-4 sm:px-6 pt-12 sm:pt-16 max-w-3xl flex-shrink-0">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#D4AF37] tracking-wide"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          ELECTROVAGANZA
        </motion.h1>

        <motion.p
          className="text-white text-sm sm:text-md mt-3 sm:mt-4 leading-relaxed line-clamp-3 sm:line-clamp-none"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Our annual flagship fest, Electrovaganza brings together the excitement of cultural performances and the spirit of innovation. With a vibrant mix of technical contests, fun challenges, and creative showcases, it's a celebration of all things electrical and beyond.

        </motion.p>
      </div>

      {/* Spacer to push content apart */}
      <div className="flex-grow"></div>

      {/* Explore Button */}
      <motion.div
        className="relative z-10 mb-8 sm:mb-12 flex-shrink-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <a href="/events">
          <motion.button
            className="px-6 sm:px-8 py-2 sm:py-3 bg-[#D4AF37] text-black text-base sm:text-lg font-semibold rounded-full 
                     hover:bg-[#DAA520] transition-all duration-300 transform hover:scale-105
                     focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            EXPLORE MORE
          </motion.button>
        </a>
      </motion.div>
    </motion.div>
  );
};

export default ElectroSection;