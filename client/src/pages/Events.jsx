import React from "react";
import TimelineContainer from "../components/events/TimelineContainer";
import headerImage from "/Tesla_photos/About_us-2.webp";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Events() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar/>
      
      {/* Header Section - Full Width */}
      <header className="relative h-[300px] sm:h-[350px] md:h-[420px] lg:h-[500px] overflow-hidden" data-timeline-header>
        <div className="absolute inset-0">
          <img
            src={headerImage}
            alt="Header background"
            className="w-full h-full object-cover brightness-60"
          />
        </div>
        <div className="relative z-10 h-full flex flex-col justify-center px-4 sm:px-8 md:px-12 lg:px-16 py-4">
          <h1 className="font-bold leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            OUR
            <br />
            <span className="text-red-700 text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-none">
              EVENTS
            </span>
          </h1>
        </div>
      </header>
      
      {/* Main Content with background pattern */}
      <main className="relative overflow-x-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl bg-red-500"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: 'var(--color-gold)' }}></div>
        </div>
        
        <div className="relative px-4 sm:px-6 md:px-8 lg:px-12 max-w-full">
          <TimelineContainer />
        </div>
      </main>
      
      <Footer/>
    </div>
  );
}

export default Events;
