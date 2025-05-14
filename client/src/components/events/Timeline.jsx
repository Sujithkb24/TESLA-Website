import React from "react";
import PropTypes from "prop-types";
import TimelineItem from "./TimelineItem";
import TimelineBall from "./TImelineObject";

function Timeline({ items, scrollProgress }) {
  return (
    <div className="relative max-w-7xl mx-auto px-2 md:px-4">
      {/* Center line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-red-500"></div>

      {/* Moving ball */}
      <TimelineBall scrollProgress={scrollProgress} />

      {/* Timeline items */}
      <div className="relative z-10">
        {items.map((item, index) => (
          <TimelineItem
            key={index}
            item={item}
            isEven={index % 2 === 0}
            index={index}
            totalItems={items.length}
          />
        ))}
      </div>
    </div>
  );
}

Timeline.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string,
    })
  ).isRequired,
  scrollProgress: PropTypes.number.isRequired,
};

export default Timeline;
