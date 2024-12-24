import React, { useEffect, useState } from "react";
import { getPlotsBySocietyId, getAllPlots } from "../services/plot";
import { useParams, useNavigate } from "react-router-dom";
import "./PlotList.css"; // Import CSS file

const SocietyPlots = () => {
  const { societyId } = useParams(); // Optional parameter for societyId
  const [plots, setPlots] = useState([]); // All plots
  const [filteredPlots, setFilteredPlots] = useState([]); // Filtered plots based on search
  const [searchQuery, setSearchQuery] = useState(""); // Search input

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlots = async () => {
      try {
        let data;
        if (societyId) {
          // Fetch plots by society ID if provided
          data = await getPlotsBySocietyId(societyId);
        } else {
          // Fetch all plots if societyId is not specified
          data = await getAllPlots();
        }
        setPlots(data.plots);
        setFilteredPlots(data.plots); // Initialize filteredPlots
      } catch (error) {
        console.error("Error fetching plots:", error);
      }
    };
    fetchPlots();
  }, [societyId]);

  // Handle search input
  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query) {
      const filtered = plots.filter((plot) =>
        plot.plotId.toString().toLowerCase().includes(query)
      );
      setFilteredPlots(filtered);
    } else {
      setFilteredPlots(plots); // Reset to all plots if query is empty
    }
  };

  return (
    <div className="society-plots-container">
      <h1 className="society-plots-header">
        {societyId ? `Plots in Society ${societyId}` : "All Plots"}
      </h1>

      {/* Search Box */}
      <div className="society-plots-search-container">
        <input
          type="text"
          className="society-plots-search-input"
          placeholder="Search by Plot ID"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* Plot Table */}
      <table className="society-plots-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Society ID</th>
            <th>Location</th>
            <th>Electricity Available</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlots.length > 0 ? (
            filteredPlots.map((plot) => (
              <tr key={plot.plotId}>
                <td>
                  <button
                    onClick={() => navigate(`/plot/${plot.plotId}`)}
                    className="society-plots-link"
                  >
                    {plot.plotId}
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => navigate(`/plot/${plot.plotId}`)}
                    className="society-plots-link"
                  >
                    {plot.societyId}
                  </button>
                </td>
                <td>{plot.location}</td>
                <td>{plot.electricityAvailable ? "Yes" : "No"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="society-plots-no-results">
                No plots found for the given search.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <button
        className="society-plots-back-button"
        onClick={() => navigate("/userdashboard")}
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default SocietyPlots;
