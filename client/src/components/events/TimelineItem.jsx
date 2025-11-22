import React, { useRef } from "react";
import PropTypes from "prop-types";
/* eslint-disable no-unused-vars */
import { motion, useInView } from "framer-motion";
/* eslint-enable no-unused-vars */

function TimelineItem({ item, isEven, isActive }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, delay: 0.2 },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="relative mb-16 md:mb-40 w-full max-w-full"
      initial="visible"
      animate="visible"
      variants={containerVariants}
    >
      {/* Mobile Layout - Simple stacked cards, NO timeline */}
      <div className="md:hidden px-2">
        <motion.div 
          className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-red-500 transition-colors duration-300 max-w-full"
          variants={childVariants}
        >
          {/* Image */}
          <motion.div variants={imageVariants} className="relative">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-56 sm:h-64 object-cover"
            />
            {/* Border frame effect */}
            <div className="absolute inset-0 border-4 border-white/10 pointer-events-none"></div>
          </motion.div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            <motion.h2
              className="text-2xl sm:text-3xl font-black mb-3 uppercase tracking-tight text-red-700"
              variants={childVariants}
            >
              {item.title}
            </motion.h2>
            <motion.p
              className="text-gray-300 text-sm sm:text-base leading-relaxed"
              variants={childVariants}
            >
              {item.description}
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Desktop Layout - Alternating with center timeline */}
      <div className="hidden md:flex flex-row items-center gap-8 lg:gap-16">
        {isEven ? (
          <>
            {/* Content on Left */}
            <motion.div
              className="flex-1 flex flex-col justify-center items-end pr-4 lg:pr-8"
              variants={childVariants}
            >
              <motion.h2
                className={`text-4xl lg:text-5xl xl:text-6xl font-black mb-6 text-right uppercase tracking-tight leading-tight transition-colors duration-100 ${
                  isActive ? 'text-red-700' : 'text-white'
                }`}
                variants={childVariants}
              >
                {item.title}
              </motion.h2>
              <motion.p
                className="text-gray-300 text-base lg:text-lg xl:text-xl leading-relaxed text-right max-w-xl"
                variants={childVariants}
              >
                {item.description}
              </motion.p>
            </motion.div>

            {/* Spacer for center line */}
            <div className="w-0 flex-shrink-0"></div>

            {/* Image on Right */}
            <motion.div
              className="flex-1 flex justify-start pl-4 lg:pl-8"
              variants={imageVariants}
            >
              <div 
                className="relative group max-w-xl w-full" 
                data-timeline-item
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className={`w-full h-[280px] lg:h-[350px] xl:h-[400px] object-cover rounded-lg transition-all duration-00 ${
                    isActive ? 'grayscale-0 brightness-110' : 'grayscale'
                  }`}
                />
                {/* Border frame effect */}
                <div 
                  className={`absolute inset-0 border-4 rounded-lg pointer-events-none transition-all duration-300 ${
                    isActive ? 'border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.5)]' : 'border-white/10 group-hover:border-red-500/30'
                  }`}
                ></div>
              </div>
            </motion.div>
          </>
        ) : (
          <>
            {/* Image on Left */}
            <motion.div
              className="flex-1 flex justify-end pr-4 lg:pr-8"
              variants={imageVariants}
            >
              <div 
                className="relative group max-w-xl w-full" 
                data-timeline-item
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className={`w-full h-[280px] lg:h-[350px] xl:h-[400px] object-cover rounded-lg transition-all duration-300 ${
                    isActive ? 'grayscale-0 brightness-110' : 'grayscale'
                  }`}
                />
                {/* Border frame effect */}
                <div 
                  className={`absolute inset-0 border-4 rounded-lg pointer-events-none transition-all duration-300 ${
                    isActive ? 'border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.5)]' : 'border-white/10 group-hover:border-red-500/30'
                  }`}
                ></div>
              </div>
            </motion.div>

            {/* Spacer for center line */}
            <div className="w-0 flex-shrink-0"></div>

            {/* Content on Right */}
            <motion.div
              className="flex-1 flex flex-col justify-center items-start pl-4 lg:pl-8"
              variants={childVariants}
            >
              <motion.h2
                className={`text-4xl lg:text-5xl xl:text-6xl font-black mb-6 text-left uppercase tracking-tight leading-tight transition-colors duration-100 ${
                  isActive ? 'text-red-700' : 'text-white'
                }`}
                variants={childVariants}
              >
                {item.title}
              </motion.h2>
              <motion.p
                className="text-gray-300 text-base lg:text-lg xl:text-xl leading-relaxed text-left max-w-xl"
                variants={childVariants}
              >
                {item.description}
              </motion.p>
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
}

TimelineItem.propTypes = {
  item: PropTypes.shape({
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string,
  }).isRequired,
  isEven: PropTypes.bool.isRequired,
  index: PropTypes.number,
  totalItems: PropTypes.number,
  isActive: PropTypes.bool,
};

export default TimelineItem;
