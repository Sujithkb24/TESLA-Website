"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import TeamCard from "./TeamCard";

const teamSections = [
  {
    name: "Board",
    members: [
      { name: "Alice Johnson", role: "Project Manager", image: "https://via.placeholder.com/150", description: "Leads projects and teams." },
      { name: "John Doe", role: "CEO", image: "https://via.placeholder.com/150", description: "Oversees company strategy." },
      { name: "Jane Smith", role: "COO", image: "https://via.placeholder.com/150", description: "Handles daily operations." },
      { name: "Michael Brown", role: "CFO", image: "https://via.placeholder.com/150", description: "Manages financial planning." },
      { name: "Emily Davis", role: "CTO", image: "https://via.placeholder.com/150", description: "Leads technology initiatives." }
    ]
  },
  {
    name: "Techies",
    members: [
      { name: "Aadya", role: "Senior Technical Lead", image: "", description: "" },
      { name: "Charan S", role: "Junior Technical Lead", image: "./Technical/Charan.JPG", description: "" },
      { name: "Bhavana M R", role: "Member", image: "", description: "" },
      { name: "Harshith M", role: "Member", image: "", description: "" },
      { name: "Shreepad Hangari", role: "Member", image: "", description: "" },
      { name: "Anusha Savithri I V", role: "Member", image: "", description: "" }
    ]
  },
  {
    name: "Art & Design",
    members: [
      { name: "Shreyas Pathki", role: "UX Designer", image: "https://via.placeholder.com/150", description: "Creates user-friendly designs." },
      { name: "Nina Patel", role: "Graphic Designer", image: "https://via.placeholder.com/150", description: "Handles branding visuals." },
      { name: "Sam Carter", role: "Motion Designer", image: "https://via.placeholder.com/150", description: "Creates animations." },
      { name: "Laura Green", role: "Illustrator", image: "https://via.placeholder.com/150", description: "Draws digital illustrations." },
      { name: "Tom Wilson", role: "UI Designer", image: "https://via.placeholder.com/150", description: "Designs user interfaces." }
    ]
  },
  {
    name: "Managers",
    members: [
      { name: "Emma Brown", role: "Marketing Head", image: "https://via.placeholder.com/150", description: "Leads marketing campaigns." },
      { name: "Jacob Miller", role: "Sales Manager", image: "https://via.placeholder.com/150", description: "Manages client relations." },
      { name: "Sophia Clarke", role: "HR Manager", image: "https://via.placeholder.com/150", description: "Handles recruitment." },
      { name: "Olivia Martinez", role: "Operations Manager", image: "https://via.placeholder.com/150", description: "Optimizes workflows." },
      { name: "Ethan Wright", role: "Finance Manager", image: "https://via.placeholder.com/150", description: "Manages budgets and expenses." }
    ]
  }
];


export default function MeetTheTeam() {
  const [isShrunk, setIsShrunk] = useState(false);
  const [activeSection, setActiveSection] = useState("Board");
  const [clickedSection, setClickedSection] = useState(null);
  const [flippedIndex, setFlippedIndex] = useState(null);
  const sectionRefs = useRef([]);
  const componentRef = useRef(null);
  const contentRef = useRef(null);
  const timeoutRef = useRef(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isSmallScreen) return;
      if (!componentRef.current) return;

      const rect = componentRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const componentScrollProgress = (viewportHeight - rect.top) / (rect.height - viewportHeight);
      const shouldShrink = componentScrollProgress > 0.3;
      setIsShrunk(shouldShrink);

      if (!clickedSection && contentRef.current) {
        const contentRect = contentRef.current.getBoundingClientRect();
        if (contentRect.top < viewportHeight) {
          for (let i = sectionRefs.current.length - 1; i >= 0; i--) {
            const section = sectionRefs.current[i];
            if (section && section.getBoundingClientRect().top < viewportHeight * 0.7) {
              setActiveSection(teamSections[i].name);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [clickedSection, isSmallScreen]);

  const handleMenuClick = (sectionName) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setClickedSection(sectionName);
    setActiveSection(sectionName);

    const index = teamSections.findIndex((s) => s.name === sectionName);
    const section = sectionRefs.current[index];
    if (section && componentRef.current) {
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const scrollOffset = sectionTop - 32;

      window.scrollTo({ top: scrollOffset, behavior: "smooth" });
      timeoutRef.current = setTimeout(() => setClickedSection(null), 1000);
    }
  };

  return (
    <section
      ref={componentRef}
      className="relative w-full min-h-[300vh] bg-[#0e0e10] text-white"
      id="meet-the-team"
    >
      <motion.div
        initial={false}
        animate={{
          width: isSmallScreen ? "100vw" : isShrunk ? "35vw" : "100vw",
          height: "auto",
          position: isSmallScreen ? "relative" : "sticky",
          top: 0,
          padding: isSmallScreen ? "2rem" : isShrunk ? "2rem" : "8rem 6rem",
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="bg-transparent text-white flex flex-col items-start justify-center z-10"
      >
        <motion.h1
          animate={{
            fontSize: isSmallScreen ? "2.5rem" : isShrunk ? "2.5rem" : "4rem",
            marginBottom: isSmallScreen ? "2rem" : isShrunk ? "1.5rem" : "2rem",
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="font-extrabold text-yellow-400 text-left tracking-tight leading-tight"
        >
          MEET THE TEAM
        </motion.h1>
        <motion.p
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.6 }}
          className="text-left text-white text-lg md:text-xl mb-12 max-w-2xl leading-relaxed"
        >
          We’ve got a strong team filled with caffeine addicted developers, gradients loving designers, and machine-like working managers.
        </motion.p>

        <div className="flex flex-col items-start gap-4">
          {teamSections.map((section) => (
            <motion.div
              key={section.name}
              className={`cursor-pointer py-2 flex items-center gap-2 transition-all text-center ${activeSection === section.name
                  ? "text-[#B8860B] font-bold text-2xl"
                  : "text-white text-xl hover:text-[#B8860B]"
                }`}
              onClick={() => handleMenuClick(section.name)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{section.name}</span>
              {activeSection === section.name && <span className="text-2xl">➤</span>}
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div
        ref={contentRef}
        className={`relative w-full flex ${isSmallScreen ? "flex-col pt-0" : "pt-[100vh]"} min-h-screen`}
      >
        {!isSmallScreen && <div className="w-[35vw]" />}
        <div className={`${isSmallScreen ? "w-full px-6 py-10" : "w-[65vw] px-8 py-20"} flex flex-col gap-20`}>
          {teamSections.map((section, index) => (
            <div
              key={section.name}
              ref={(el) => (sectionRefs.current[index] = el)}
              id={`team-section-${section.name}`}
              className="min-h-screen flex flex-col gap-12"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 place-items-center">
                <TeamCard
                  team={{
                    name: section.name,
                    role: "",
                    image: "/Tesla_photos",
                    description: `Our ${section.name.toLowerCase()} team members`
                  }}
                  isCategoryCard={true}
                  isFlipped={false}
                  onClick={() => { }}
                />
                {section.members.map((member, i) => (
                  <TeamCard
                    key={i}
                    team={member}
                    isFlipped={flippedIndex === `${index}-${i}`}
                    onClick={() =>
                      setFlippedIndex(
                        flippedIndex === `${index}-${i}` ? null : `${index}-${i}`
                      )
                    }
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}