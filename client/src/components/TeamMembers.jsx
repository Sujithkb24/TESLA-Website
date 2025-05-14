import React, { useState } from 'react';
import TeamCard from './TeamCard';

const teamSections = [
  {
    name: "Technical Wing",
    members: [
      { name: "Charan S", role: "Junior Technical Lead", image: "/Tesla_photos/Technical/Charan.JPG", description: "" },
      { name: "Harshith M", role: "Member", image: "/Tesla_photos/Technical/Harshith.jpg", description: "" },
      { name: "Shreepad Hangari", role: "Member", image: "/Tesla_photos/Technical/Shreepad.jpg", description: "" },
      { name: "Bhavana M R", role: "Member", image: "/Tesla_photos/Technical/Bhavana.jpg", description: "" },
      { name: "Anusha Savithri I V", role: "Member", image: "/Tesla_photos/Technical/Anusha.jpg", description: "" },
    ],
  },
  {
    name: "Program Coordination Wing",
    members: [
      { name: "Bob Smith", role: "Lead Developer", image: "./img.png", description: "Manages all development tasks." },
      { name: "Chris Evans", role: "Software Engineer", image: "./img.png", description: "Builds and maintains software." },
      { name: "Lisa Wong", role: "Frontend Developer", image: "./img.png", description: "Creates interactive UI." },
      { name: "James Lee", role: "Backend Developer", image: "./img.png", description: "Handles server logic." },
      { name: "Sarah Adams", role: "DevOps Engineer", image: "./img.png", description: "Manages CI/CD pipelines." },
    ],
  },
  {
    name: "Student Coordination Wing",
    members: [
      { name: "Emma Brown", role: "Marketing Head", image: "./img.png", description: "Leads marketing campaigns." },
      { name: "Jacob Miller", role: "Sales Manager", image: "./img.png", description: "Manages client relations." },
      { name: "Sophia Clarke", role: "HR Manager", image: "./img.png", description: "Handles recruitment." },
      { name: "Olivia Martinez", role: "Operations Manager", image: "./img.png", description: "Optimizes workflows." },
      { name: "Ethan Wright", role: "Finance Manager", image: "./img.png", description: "Manages budgets and expenses." },
    ],
  },
  {
    name: "Art & Design Wing",
    members: [
      { name: "Shreyas Pathki", role: "Art & Design Lead", image: "/Tesla_photos/Art & Design/Shreyas.JPG", description: "Creates user-friendly designs." },
      { name: "A S Darshan", role: "Member", image: "/Tesla_photos/Art & Design/Darshan.JPG", description: "Handles branding visuals." },
      { name: "Nishan C R", role: "Member", image: "/Tesla_photos/Art & Design/Nishan.jpg", description: "Creates animations." },
      { name: "Poorvika K B", role: "Member", image: "/Tesla_photos/Art & Design/Poorvika.jpg", description: "Draws digital illustrations." },
      { name: "Sinchana K Y", role: "Member", image: "/Tesla_photos/Art & Design/Sinchana K Y.jpg", description: "Designs user interfaces." },
      { name: "Sinchana K Y", role: "Member", image: "/Tesla_photos/Art & Design/Sinchana K Y.jpg", description: "Designs user interfaces." },
      { name: "Sinchana K Y", role: "Member", image: "/Tesla_photos/Art & Design/Sinchana K Y.jpg", description: "Designs user interfaces." },
    ],
  },
  {
    name: "Web Development Wing",
    members: [
      { name: "Akshay Mirji", role: "Web Wing Lead", image: "/Tesla_photos/Web/Akshay.JPG", description: "Leads marketing campaigns." },
      { name: "Sameer Godabole", role: "Member", image: "/Tesla_photos/Default_pfp.jpg", description: "Manages client relations." },
      { name: "Nischay H R", role: "Member", image: "/Tesla_photos/Web/Nischay.jpg", description: "Handles recruitment." },
      { name: "Prakruthi Prasad", role: "Member", image: "/Tesla_photos/Web/Prakruthi.JPG", description: "Optimizes workflows." },
      { name: "Kshitij", role: "Member", image: "/Tesla_photos/Web/Kshitij.JPG", description: "Manages budgets and expenses." },
      { name: "Mohammed Imad", role: "Member", image: "/Tesla_photos/Default_pfp.jpg", description: "" },
    ],
  },
];

const TeamMembers = () => {
  const [flippedKey, setFlippedKey] = useState(null);

  const toggleFlip = (key) => {
    setFlippedKey((prevKey) => (prevKey === key ? null : key));
  };

  return (
    <div className="bg-[#111] text-white px-4 py-12 md:px-8 lg:px-16 min-h-screen">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-yellow-400 mb-16 mt-16">
        Meet The Team
      </h1>

      {teamSections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-20">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10 text-gray-100 border-b border-gray-600 pb-3 tracking-wide">
            {section.name}
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            {section.members.map((member, memberIndex) => {
              const key = `${sectionIndex}-${memberIndex}`;
              return (
                <TeamCard
                  key={key}
                  team={member}
                  isFlipped={flippedKey === key}
                  onClick={() => toggleFlip(key)}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamMembers;