import React, { useEffect, useState } from "react";
import { FaUsers, FaRegCalendarAlt, FaMapMarkerAlt, FaTrash } from "react-icons/fa";
import Modal from "react-modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

import Placeholder from '/tournament-placeholder.webp'

const Tournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/addtournament");
      const data = await response.json();
      setTournaments(data);
    } catch (error) {
      console.error("Error fetching tournaments:", error);
    }
  };

  const openModal = (tournament) => {
    setSelectedTournament(tournament);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTournament(null);
  };

  const handleDelete = async () => {
    if (!selectedTournament) return;

    try {
      const response = await fetch(`http://localhost:5000/api/addtournament/${selectedTournament._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTournaments((prev) => prev.filter((t) => t._id !== selectedTournament._id));
        toast.success("Tournament deleted successfully!");
      } else {
        toast.error("Failed to delete tournament!");
      }
    } catch (error) {
      console.error("Error deleting tournament:", error);
      toast.error("Error deleting tournament!");
    }

    closeModal();
  };

  return (
    <div className="p-2">
      {tournaments.length === 0 ? (
        <p className="text-center text-gray-500">No tournaments available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tournaments.map((tournament) => (
            <div
              key={tournament._id}
              className="bg-white shadow-lg hover:shadow-xl rounded-sm overflow-hidden transform transition-all duration-300"
            >
              <img
                src={tournament.image ? `http://localhost:5000/${tournament.image}` : Placeholder}
                alt={tournament.tournamentName}
                className="w-full h-52 object-cover object-top"
              />

              <div className="px-4 py-4">
                <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{tournament.tournamentName}</h3>
                <p className="text-gray-600 font-semibold text-sm mb-3 line-clamp-1">{tournament.subheading}</p>

                <p className="text-sm text-gray-500 flex items-start ">
                  <FaMapMarkerAlt className="mr-2 mt-1 text-red-600 " /> <span className="line-clamp-1">{tournament.location}</span>
                </p>

                <div className="mt-3 flex justify-between text-sm text-gray-600">
                  <p className="flex items-center">
                    <FaUsers className="mr-2 h-4 w-4 flex-shrink-0 text-green-500" /> {tournament.maxTeams} Teams
                  </p>
                  <p className="flex items-center">
                    <FaUsers className="mr-2 h-4 w-4 flex-shrink-0 text-purple-500" /> {tournament.maxPlayers} Players
                  </p>
                </div>

                <div className="mt-4 text-gray-600 border-t pt-3 text-sm space-y-2">
                  <p className="flex items-center">
                    <FaRegCalendarAlt className="mr-2 text-green-500" />
                    Start: {new Date(tournament.startDate).toLocaleDateString()}
                  </p>
                  <p className="flex items-center">
                    <FaRegCalendarAlt className="mr-2 text-orange-500" />
                    End: {new Date(tournament.endDate).toLocaleDateString()}
                  </p>
                  <p className="flex items-center">
                    <FaRegCalendarAlt className="mr-2 text-red-500" />
                    Registration Closes: {new Date(tournament.lastDate).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <Link
                    to={`${tournament._id}`}
                    className="mt-4 w-full bg-blue-600 text-white py-2 text-center rounded-sm hover:bg-blue-700 transition duration-300">
                    View Details
                  </Link>
                  <button
                    onClick={() => openModal(tournament)}
                    className="mt-4 w-full bg-red-500 text-white py-2 rounded-sm hover:bg-red-600 transition duration-300 flex items-center justify-center"
                  >
                    <FaTrash className="mr-2" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="bg-white p-6 rounded-lg shadow-lg w-96 mx-auto mt-0"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-4">Confirm Delete</h2>
        <p className="text-gray-600">Are you sure you want to delete this tournament?</p>

        <div className="flex justify-end mt-6 space-x-3">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition duration-300"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Tournaments;
