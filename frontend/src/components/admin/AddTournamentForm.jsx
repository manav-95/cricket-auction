import React, { useState } from "react";

const AddTournamentForm = () => {
  const [formData, setFormData] = useState({
    tournamentName: "",
    subheading: "",
    organizer: "",
    startDate: "",
    endDate: "",
    lastDate: "",
    location: "",
    maxTeams: "",
    maxPlayers: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("tournamentName", formData.tournamentName);
    formDataToSend.append("subheading", formData.subheading);
    formDataToSend.append("organizer", formData.organizer);
    formDataToSend.append("startDate", formData.startDate);
    formDataToSend.append("endDate", formData.endDate);
    formDataToSend.append("lastDate", formData.lastDate);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("maxTeams", formData.maxTeams);
    formDataToSend.append("maxPlayers", formData.maxPlayers);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      const response = await fetch("http://localhost:5000/api/addtournament", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();
      if (response.ok) {
        alert("Tournament added successfully!");
        setFormData({
          tournamentName: "",
          subheading: "",
          organizer: "",
          startDate: "",
          endDate: "",
          lastDate: "",
          location: "",
          maxTeams: "",
          maxPlayers: "",
          image: null,
        });
        setImagePreview(null);
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error adding tournament:", error);
    }
  };


  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Tournament</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Tournament Name */}
        <input
          type="text"
          name="tournamentName"
          placeholder="Tournament Name"
          value={formData.tournamentName}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />

        {/* Subheading */}
        <input
          type="text"
          name="subheading"
          placeholder="One-line Subheading"
          value={formData.subheading}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />

        {/* Organizer Name */}
        <input
          type="text"
          name="organizer"
          placeholder="Organizer Name"
          value={formData.organizer}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />

        {/* Dates */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-sm">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="text-sm">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="text-sm">Last Date for Registration</label>
            <input
              type="date"
              name="lastDate"
              value={formData.lastDate}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
        </div>

        {/* Location */}
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />

        {/* Max Teams Dropdown */}
        <div>
          <label className="text-sm">Max Teams</label>
          <select
            name="maxTeams"
            value={formData.maxTeams}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="">Select</option>
            {[4,6, 8, 10, 12, 14, 16, 18].map((num) => (
              <option key={num} value={num}>
                {num} Teams
              </option>
            ))}
          </select>
        </div>

        {/* Max Players */}
        <input
          type="number"
          name="maxPlayers"
          placeholder="Max Players"
          value={formData.maxPlayers}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />

        {/* Image Upload */}
        <div>
          <label className="block text-sm">Upload Tournament Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded-md"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Tournament"
              className="mt-2 h-32 w-full object-cover rounded-md"
            />
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Add Tournament
        </button>
      </form>
    </div>
  );
};

export default AddTournamentForm;
