import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { FaUsers, FaRegCalendarAlt, FaMapMarkerAlt, FaTrash } from "react-icons/fa";

import Placeholder from "/tournament-placeholder.webp";

const TournamentDetailsPage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(0);
  const [tournamentDetails, setTournamentDetails] = useState(null);

  useEffect(
    (id) => {
      fetchTournamentDetails();
    },
    [id]
  );

  const fetchTournamentDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/addtournament/${id}`
      );
      const data = await response.json();
      setTournamentDetails(data);
    } catch (error) {
      console.error("Error fetching tournaments:", error);
    }
  };

  const tabButtons = [
    { buttonText: 'Teams', },
    { buttonText: 'Batsmans', },
    { buttonText: 'All-Rouonders', },
    { buttonText: 'Bowlers', },
  ]

  return (
    <>
      <div className="p-0">
        {tournamentDetails ? (
          <>
            <div className="relative">
              <img
                src={tournamentDetails.image ? `http://localhost:5000/${tournamentDetails.image}` : Placeholder}
                alt="tournament image"
                className="h-full w-full object-cover aspect-[2/1] rounded opacity-80"
              />
              <div className="absolute inset-0 bg-black bg-opacity-65 text-white">

                <div className="flex flex-col justify-center items-center h-full w-full">
                  <p className="text-5xl mb-2 font-semibold">{tournamentDetails.tournamentName}</p>
                  <p className="text-3xl font-medium">{tournamentDetails.subheading}</p>
                </div>

                <div className="absolute bottom-3 flex flex-col items-center justify-center mx-auto w-full">
                  <div className="flex space-x-6 mb-4 font-medium">
                    <p>Max Teams : <span className="text-yellow-500">{tournamentDetails.maxTeams}</span></p>
                    <p>Max Players : <span className="text-yellow-500">{tournamentDetails.maxPlayers}</span></p>
                  </div>
                  <p className="flex text-center items-center gap-2 text-lg font-medium"><FaMapMarkerAlt className="text-red-500 mt-0" />{tournamentDetails.location}</p>
                  <div className="flex space-x-8 font-medium mt-4">
                    <p>Start Date : <span className="text-green-500">{new Date(tournamentDetails.startDate).toLocaleDateString()}</span></p>
                    <p>End Date : <span className="text-blue-500">{new Date(tournamentDetails.endDate).toLocaleDateString()}</span></p>
                    <p>Registration Closes : <span className="text-red-500">{new Date(tournamentDetails.lastDate).toLocaleDateString()}</span></p>
                  </div>
                </div>

              </div>
            </div>

            <div className="w-full bg-blue-800 px-1.5 py-1.5 mt-1 rounded-sm grid grid-cols-4">
              {tabButtons.map((button, index) =>
                <button key={index} onClick={() => setActiveTab(index)} className={`py-2 ${activeTab === index ? 'bg-white text-blue-900 font-medium' : 'text-white'} rounded transition-all`}>
                  {button.buttonText} 
                </button>
              )}
            </div>

          </>
        ) : (
          <p className="text-gray-500">Loading tournament details...</p>
        )}
      </div>
    </>
  );
};

export default TournamentDetailsPage;
