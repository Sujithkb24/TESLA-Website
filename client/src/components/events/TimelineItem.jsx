import React, { useRef } from "react";
import PropTypes from "prop-types";
/* eslint-disable no-unused-vars */
import { motion, useInView } from "framer-motion";
/* eslint-enable no-unused-vars */

function TimelineItem({ item, isEven }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: 0.1 },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="relative flex flex-col md:flex-row items-center mb-20 md:mb-32 w-full"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {isEven ? (
        <>
          {/* Content */}
          <motion.div
            className="flex-1 flex flex-col justify-center items-end md:pr-12 w-full md:w-auto px-2 md:px-0"
            variants={childVariants}
          >
            <motion.h2
              className="text-2xl md:text-5xl font-bold mb-2 md:mb-4 text-right md:text-left"
              variants={childVariants}
            >
              {item.title}
            </motion.h2>
            <motion.p
              className="text-gray-300 text-base md:text-lg leading-normal mb-2 md:mb-4 text-right md:text-left"
              variants={childVariants}
            >
              {item.description}
            </motion.p>
          </motion.div>
          {/* Vertical line */}
          <div className="relative flex flex-col items-center">
            <div className="h-full w-[2px] bg-red-500 min-h-[120px] md:min-h-[300px]" />
          </div>
          {/* Image */}
          <motion.div
            className="flex-1 flex justify-start md:pl-12 w-full md:w-auto px-2 md:px-0 mt-4 md:mt-0"
            variants={imageVariants}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full max-w-xs md:max-w-[550px] h-40 md:h-[300px] object-cover rounded-none"
            />
          </motion.div>
        </>
      ) : (
        <>
          {/* Image */}
          <motion.div
            className="flex-1 flex justify-end md:pr-12 w-full md:w-auto px-2 md:px-0 mt-4 md:mt-0"
            variants={imageVariants}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full max-w-xs md:max-w-[550px] h-40 md:h-[300px] object-cover rounded-none"
            />
          </motion.div>
          {/* Vertical line */}
          <div className="relative flex flex-col items-center">
            <div className="h-full w-[2px] bg-red-500 min-h-[120px] md:min-h-[300px]" />
          </div>
          {/* Content */}
          <motion.div
            className="flex-1 flex flex-col justify-center items-start md:pl-12 w-full md:w-auto px-2 md:px-0"
            variants={childVariants}
          >
            <motion.h2
              className="text-2xl md:text-5xl font-bold mb-2 md:mb-4 text-left"
              variants={childVariants}
            >
              {item.title}
            </motion.h2>
            <motion.p
              className="text-gray-300 text-base md:text-lg leading-normal mb-2 md:mb-4 text-left"
              variants={childVariants}
            >
              {item.description}
            </motion.p>
          </motion.div>
        </>
      )}
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
};

export default TimelineItem;
