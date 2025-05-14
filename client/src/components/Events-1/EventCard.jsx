import React, { useEffect, useRef } from 'react';

const EventCard = ({ event, isLast }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full flex items-start">
      <div 
        ref={cardRef}
        className="w-full opacity-0 translate-y-10 transition-all duration-1000 ease-out"
      >
        {/* Timeline dot - moved to left side */}
        <div className="absolute left-0 md:left-12 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center z-10">
          <span className="text-white font-bold text-sm">D</span>
        </div>

        {/* Timeline lines */}
        {!isLast && (
          <>
            <div className="absolute left-0 md:left-12 top-6 w-[2px] h-[calc(100%+4rem)] bg-red-500 transform translate-x-[3px]"></div>
            <div className="absolute top-3 left-[6px] md:left-[50px] w-[40px] h-[2px] bg-red-500"></div>
          </>
        )}

        {/* Event card - wider and offset from timeline */}
        <div className="ml-16 md:ml-24 w-[calc(100%-4rem)] md:w-[calc(100%-6rem)]">
          <div className="bg-black bg-opacity-70 p-6 border border-gray-800 transition-all duration-300 hover:scale-[1.02] hover:border-red-500">
            <h2 className="text-white text-2xl font-bold mb-4">{event.title}</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-7/12">
                <p className="text-gray-300 text-sm leading-relaxed">{event.description}</p>
              </div>
              <div className="w-full md:w-5/12">
                <img 
                  src={event.imageSrc} 
                  alt={event.title} 
                  className="w-full h-[150px] object-cover filter grayscale"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;