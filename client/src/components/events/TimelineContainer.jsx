import React, { useEffect, useRef, useState } from "react";
import Timeline from "./Timeline";
import { timelineData } from "../../data/timeline";

function TimelineContainer() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const timelineRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (timelineRef.current) {
        const container = timelineRef.current;
        const containerTop = container.getBoundingClientRect().top;
        const containerHeight = container.offsetHeight;
        const viewportHeight = window.innerHeight;

        let progress = 0;

        if (containerTop <= 0) {
          const scrolledAmount = Math.abs(containerTop);
          progress = Math.min(
            scrolledAmount / (containerHeight - viewportHeight),
            1
          );
        }

        setScrollPosition(progress * 100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="px-4 md:px-8 py-12" ref={timelineRef}>
      <Timeline items={timelineData} scrollProgress={scrollPosition} />
    </div>
  );
}

export default TimelineContainer;
