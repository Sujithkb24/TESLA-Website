import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

function TimelineBall({ scrollProgress }) {
  const ballRef = useRef(null);

  useEffect(() => {
    if (ballRef.current) {
      const ballElement = ballRef.current;
      const scrollableArea = document.body.scrollHeight - window.innerHeight;

      if (scrollableArea > 0) {
        const scrollPercentage = Math.min(Math.max(scrollProgress, 0), 100);
        ballElement.style.top = `${scrollPercentage}%`;
      }
    }
  }, [scrollProgress]);

  return (
    <div
      ref={ballRef}
      className="absolute left-1/2 transform -translate-x-1/2 z-20"
      style={{
        transition: "top 0.3s ease-out",
      }}
    >
      <div className="w-6 h-6 bg-red-500 rounded-full shadow-lg relative">
        <div className="absolute inset-0 rounded-full animate-ping bg-red-500 opacity-75"></div>
      </div>
    </div>
  );
}

TimelineBall.propTypes = {
  scrollProgress: PropTypes.number.isRequired,
};

export default TimelineBall;
