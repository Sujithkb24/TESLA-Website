import React from "react";
import ElectroSection from "../components/ElectroSection";
import TeamSection from "../components/TeamsSection";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import BentoGrid from "../components/BentoGrid";

const Home = () => {
  return (
    <div
      className="w-full h-screen overflow-y-auto bg-black snap-y snap-mandatory"
      style={{ scrollBehavior: "smooth", height: "100dvh" }}
    >
      <div className="w-full">
        <Navbar />
      </div>

      <div className='w-full h-screen snap-start' style={{ height: "100dvh" }}>
        <BentoGrid/>
      </div>

      <div className="w-full h-screen bg-black snap-start" style={{ height: "100dvh" }}>
        <ElectroSection />
      </div>

      <div className="w-full h-screen snap-start" style={{ height: "100dvh" }}>
        <TeamSection />
      </div>

      <div className="snap-start">
        <Footer/>
      </div>
    </div>
  );
};

export default Home;

// import React, { useRef, useEffect } from "react";
// import Lenis from "@studio-freight/lenis";
// import InitialSection from "../components/InitialSection";
// import ElectroSection from "../components/ElectroSection";
// import TeamsSection from "../components/TeamsSection";
// import Footer from "../components/Footer";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import gsap from "gsap";

// const Home = () => {
//   const bulbRef = useRef();

//   useEffect(() => {
//     gsap.registerPlugin(ScrollTrigger);

//     const lenis = new Lenis({
//       duration: 1.2,
//       easing: (t) => t,
//       smoothWheel: true,
//     });

//     ScrollTrigger.scrollerProxy(document.body, {
//       scrollTop(value) {
//         return arguments.length
//           ? lenis.scrollTo(value, { immediate: true })
//           : window.scrollY;
//       },
//       getBoundingClientRect() {
//         return {
//           top: 0,
//           left: 0,
//           width: window.innerWidth,
//           height: window.innerHeight,
//         };
//       },
//       pinType: document.body.style.transform ? "transform" : "fixed",
//     });

//     const raf = (time) => {
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     };
//     requestAnimationFrame(raf);

//     ScrollTrigger.refresh();

//     return () => {
//       lenis.destroy();
//       ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//     };
//   }, []);

//   return (
//     <div className="relative w-full overflow-hidden">
//       {/* Hero + bulb animation */}
//       <InitialSection ref={bulbRef} />

//       {/* Snap scroll behavior starts from ElectroSection onward */}
//       <div
//         className="w-full overflow-y-auto snap-y snap-mandatory"
//         style={{ scrollBehavior: "smooth" }}
//       >
//         <div className="w-full h-screen snap-start">
//           <ElectroSection />
//         </div>

//         <div className="w-full h-screen snap-start">
//           <TeamsSection />
//         </div>

//         <div className="w-full snap-start">
//           <Footer />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;