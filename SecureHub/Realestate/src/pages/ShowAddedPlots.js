import React, { useEffect, useState } from "react";
import { getAllPlots } from "../services/plot";
import "./ShowAddedPlots.css"; // Import the CSS file

const ShowAllPlots = () => {
  const [plots, setPlots] = useState([]);

  useEffect(() => {
    const fetchPlots = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        if (
          !user ||
          (user.email !== "sabihulhassan343@gmail.com" &&
            user.password !== "sabih321")
        ) {
          alert("You must be logged in with the correct email and password to view plots.");
          return;
        }

        const data = await getAllPlots();
        console.log("Fetched Plots:", data); // Debug API response
        setPlots(data.plots || []);
      } catch (error) {
        console.error("Error fetching plots:", error);
      }
    };

    fetchPlots();
  }, []);

  return (
    <div className="show-plots-container">
      <h2 className="show-plots-title">All Plots</h2>
      {plots.length > 0 ? (
        <table className="show-plots-table">
          <thead>
            <tr>
              <th>Plot ID</th>
              <th>Size</th>
              <th>Location</th>
              <th>Electricity Available</th>
              <th>Owner Name</th>
              <th>Society ID</th>
              <th>Owner Address</th>
            </tr>
          </thead>
          <tbody>
            {plots.map((plot, index) => (
              <tr key={index}>
                <td>{plot.plotId}</td>
                <td>{plot.size}</td>
                <td>{plot.location}</td>
                <td>{plot.electricityAvailable ? "Yes" : "No"}</td>
                <td>{plot.ownerName}</td>
                <td>{plot.societyId}</td>
                <td>{plot.owner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="show-plots-no-data">No plots available or loading...</p>
      )}
    </div>
  );
};

export default ShowAllPlots;
