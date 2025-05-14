import { motion, useTransform, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import TeamCard from "./TeamCard";
import teams from "../data/Core.js";

const TeamCarousel = () => {
  const containerRef = useRef(null);
  const carouselRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  const [dimensions, setDimensions] = useState({
    container: 0,
    carousel: 0,
    card: 0,
  });
  const [flippedId, setFlippedId] = useState(null);
  const [ready, setReady] = useState(false); // <-- NEW

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current && carouselRef.current) {
        const firstCard = carouselRef.current.querySelector(".team-card");
        const containerWidth = containerRef.current.offsetWidth;
        const carouselWidth = carouselRef.current.scrollWidth;
        const cardWidth = firstCard?.offsetWidth || 0;

        setDimensions({
          container: containerWidth,
          carousel: carouselWidth,
          card: cardWidth,
        });

        if (containerWidth && carouselWidth && cardWidth) {
          setReady(true); // <-- Set ready only when we have real dimensions
        }
      }
    };

    const ro = new ResizeObserver(updateDimensions);
    if (containerRef.current) ro.observe(containerRef.current);
    updateDimensions();

    return () => ro.disconnect();
  }, []);

  const handleCardClick = (id) => {
    setFlippedId((prev) => (prev === id ? null : id));
  };

  const scrollRange = Math.max(
    dimensions.carousel - dimensions.container + dimensions.card / 3,
    0
  );

  const x = useTransform(
    scrollYProgress,
    [0.2, 1],
    [0, ready ? -scrollRange : 0] // <-- Freeze at 0 if not ready
  );

  const scale = useTransform(scrollYProgress, [0, 0.2], [1.5, 1]);

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 h-screen flex flex-col items-center overflow-hidden pt-20">
        <motion.h2
          style={{ scale }}
          className="text-4xl md:text-5xl font-bold text-yellow-400 mb-8 will-change-transform"
        >
          MEET THE CORE
        </motion.h2>

        <div className="w-full h-[60vh] flex items-center px-[5vw] overflow-hidden">
          <motion.div
            ref={carouselRef}
            style={{ x }}
            className="flex gap-4 pr-[25%] will-change-transform"
          >
            {teams.map((team) => (
              <TeamCard
                key={team.id}
                team={team}
                isFlipped={flippedId === team.id}
                onClick={() => handleCardClick(team.id)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TeamCarousel;
