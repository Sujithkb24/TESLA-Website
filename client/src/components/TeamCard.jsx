import React from 'react';

const TeamCard = ({ team, isFlipped, onClick, isCategoryCard }) => {
  if (isCategoryCard) {
    return (
      <div className="w-[250px] h-[350px] flex items-center justify-center text-yellow-400 text-3xl font-bold bg-transparent">
        {team.name}
      </div>
    );
  }

  return (
    <div
      className="team-card relative w-[70vw] max-w-[280px] min-w-[220px] h-[50vh] min-h-[300px] cursor-pointer"
      onClick={onClick}
    >
      <div
        className={`card-inner relative w-full h-full transform-style-preserve-3d ${isFlipped ? 'flipped' : ''}`}
      >
        <div className="card-front absolute inset-0 p-1 bg-white rounded-xl border-2 border-yellow-400 overflow-hidden shadow-xl">
          <img
            src={team.image}
            alt={team.name}
            className="w-full h-2/3 object-cover rounded-xl border-2 border-yellow-400"
          />
          <div className="p-3 h-1/3 flex flex-col justify-start">
            <h3 className="text-2xl text-black font-bold">{team.name}</h3>
            <p className="text-lg text-gray-600">{team.role}</p>
          </div>
        </div>

        <div className="card-back absolute inset-0 bg-yellow-400 rounded-xl p-6 border-2 border-white">
          <h3 className="text-xl font-bold mb-2">{team.name}</h3>
          <p className="text-sm mb-4">{team.role}</p>
          <p className="text-xs leading-relaxed">{team.description}</p>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
