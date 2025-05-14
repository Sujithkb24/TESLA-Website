import React, { useRef, useEffect, forwardRef } from "react";
import Scene from "../components/bulb/Scene";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const InitialSection = forwardRef((props, ref) => {
  const sectionRef = useRef();
  const textRef = useRef();

  const bulbRef = useRef();

  useEffect(() => {
    if (ref) ref.current = bulbRef.current;
  }, [ref]);

  return (
    <div
      ref={sectionRef}
      className="hero-section relative w-full h-screen flex flex-col md:flex-row items-center justify-center bg-[var(--off-black)]"
    >
      {/* 3D Bulb Scene */}
      <div className="absolute inset-0 z-0">
      <Scene ref={bulbRef} textRef={textRef} />

      </div>

      {/* Text */}
      <div
        ref={textRef}
        className="relative z-10 text-left w-full max-w-7xl px-8 sm:px-16 opacity-0"
      >
        <img src="/Tesla-logo.jpg" alt="Tesla"  className="h-48 md:min-h-auto"/>
        <h1 className="text-8xl sm:text-7xl font-bold text-yellow-400 tracking-tight">
          TESLA-SJCE
        </h1>
        <p className="text-white text-base sm:text-xl mt-4 max-w-lg">
          Innovation meets education with SJCE's cutting-edge projects and
          technologies.
        </p>
      </div>
    </div>
  );
});

export default InitialSection;













