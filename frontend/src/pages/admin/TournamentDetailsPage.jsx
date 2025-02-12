import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'

import Placeholder from '/tournament-placeholder.webp'


const TournamentDetailsPage = () => {
    const { id } = useParams();
    const [tournamentDetails, setTournamentDetails] = useState(null);

    useEffect((id) => {
        fetchTournamentDetails();
    }, [id]);

    const fetchTournamentDetails = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/addtournament/${id}`)
            const data = await response.json();
            setTournamentDetails(data);
        } catch (error) {
            console.error("Error fetching tournaments:", error);
        }
    }

    return (
        <>
            <div className="p-0">
                {tournamentDetails ? (
                    <div>
                        <img src={tournamentDetails.image ? `http://localhost:5000/${tournamentDetails.image}` : Placeholder} alt="tournament image" className="h-[500px] w-full object-fill rounded" />
                        <h1 className="text-2xl font-bold">{tournamentDetails.tournamentName}</h1>
                        <p className="text-gray-600">{tournamentDetails.subheading}</p>
                        <p className="text-gray-700">Location: {tournamentDetails.location}</p>
                        <p className="text-gray-700">Max Teams: {tournamentDetails.maxTeams}</p>
                        <p className="text-gray-700">Max Players: {tournamentDetails.maxPlayers}</p>
                    </div>
                ) : (
                    <p className="text-gray-500">Loading tournament details...</p>
                )}
            </div>
        </>
    )
}

export default TournamentDetailsPage