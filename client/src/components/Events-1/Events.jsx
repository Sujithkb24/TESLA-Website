import React from 'react';
import EventCard from './EventCard';
import { eventsData } from './EventsData';

const Events = () => {
  return (
    <div className="bg-black min-h-screen py-16 px-4 md:px-8 relative overflow-hidden">
      {/* Header */}
      <div className="relative mb-24 max-w-screen-xl mx-auto">
        <div className="border border-gray-800 overflow-hidden">
          <div className="relative h-[200px] md:h-[300px] overflow-hidden">
            <img 
              src="https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="Events Banner" 
              className="w-full h-full object-cover filter grayscale"
            />
            <div className="absolute inset-0 bg-black bg-opacity-70"></div>
            <div className="absolute inset-0 flex items-center justify-start p-8">
              <h1 className="text-4xl md:text-6xl font-extrabold">
                <span className="text-white">OUR</span>
                <br />
                <span className="text-red-600">EVENTS</span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Events Timeline - added padding to align with the left-side timeline */}
      <div className="max-w-screen-xl mx-auto relative py-16 pl-4 md:pl-8 pr-4">
        <div className="space-y-32">
          {eventsData.map((event, index) => (
            <EventCard 
              key={event.id} 
              event={event} 
              isLast={index === eventsData.length - 1}
            />
          ))}
        </div>
      </div>

      {/* Footer logo */}
      <div className="mt-32 text-center">
        <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-wider">
          CODECHEF
        </h2>
      </div>
    </div>
  );
};

export default Events;