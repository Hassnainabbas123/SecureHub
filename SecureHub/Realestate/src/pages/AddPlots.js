import React, { useState } from "react";
import { addPlot } from "../services/plot";
import "./AddPlots.css"; 

const AddPlots = () => {
  const [status, setStatus] = useState("Add Plot");
  const [newPlot, setNewPlot] = useState({
    size: "",
    location: "",
    electricityAvailable: false,
    ownerName: "",
    societyId: "",
    owner: "",
  });

  const handleAddPlot = async (e) => {
    e.preventDefault();
    setStatus("Adding...");

    try {
      await addPlot(newPlot);
      alert("Plot added successfully!");
      setStatus("Add Plot");

      setNewPlot({
        size: "",
        location: "",
        electricityAvailable: false,
        ownerName: "",
        societyId: "",
        owner: "",
      });
    } catch (error) {
      console.error("Error adding plot:", error);
      setStatus("Add Plot");
    }
  };

  return (
    <div className="add-plot-container">
      <form className="add-plot-form" onSubmit={handleAddPlot}>
        <h2>Add Plot</h2>
        <input
          type="text"
          placeholder="Size"
          value={newPlot.size}
          onChange={(e) => setNewPlot({ ...newPlot, size: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={newPlot.location}
          onChange={(e) => setNewPlot({ ...newPlot, location: e.target.value })}
          required
        />
        <label>
          Electricity Available:
          <input
            type="checkbox"
            checked={newPlot.electricityAvailable}
            onChange={(e) =>
              setNewPlot({ ...newPlot, electricityAvailable: e.target.checked })
            }
          />
        </label>
        <input
          type="text"
          placeholder="Owner Name"
          value={newPlot.ownerName}
          onChange={(e) => setNewPlot({ ...newPlot, ownerName: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Society ID"
          value={newPlot.societyId}
          onChange={(e) => setNewPlot({ ...newPlot, societyId: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Owner Address"
          value={newPlot.owner}
          onChange={(e) => setNewPlot({ ...newPlot, owner: e.target.value })}
          required
        />
        <button type="submit">{status}</button>
      </form>
    </div>
  );
};

export default AddPlots;
