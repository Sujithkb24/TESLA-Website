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
        const containerRect = container.getBoundingClientRect();
        const containerTop = containerRect.top;
        const containerHeight = containerRect.height;
        const viewportHeight = window.innerHeight;
        const viewportCenter = viewportHeight / 2;

        let progress = 0;

        // Calculate progress based on how far the container has scrolled
        // Ball should reach end when last event is at viewport center
        if (containerTop <= viewportCenter) {
          const scrolled = viewportCenter - containerTop;
          const totalScroll = containerHeight - viewportHeight / 2;
          progress = Math.max(0, Math.min(1, scrolled / totalScroll));
          
        }

        // Pass progress directly as 0-1 range
        setScrollPosition(progress);
      }
    };

    // Use requestAnimationFrame for smoother updates
    let ticking = false;
    const smoothScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", smoothScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", smoothScroll);
    };
  }, []);

  return (
    <div className="pt-12 pb-12 md:pt-16 md:pb-20 lg:pt-20 lg:pb-24 overflow-visible" ref={timelineRef}>
      <Timeline items={timelineData} scrollProgress={scrollPosition} />
    </div>
  );
}

export default TimelineContainer;
