import React, { useEffect, useState } from 'react';
import { getPlotsBySocietyId } from '../services/plot';
import { useParams, useNavigate } from 'react-router-dom';

const SocietyPlots = () => {
  const { societyId } = useParams(); // Society ID from route params
  const [plots, setPlots] = useState([]); // Original plots list
  const [filteredPlots, setFilteredPlots] = useState([]); // Filtered plots for search
  const [searchQuery, setSearchQuery] = useState(''); // Search input state

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlots = async () => {
      try {
        const data = await getPlotsBySocietyId(societyId);
        setPlots(data.plots);
        setFilteredPlots(data.plots); // Initialize filteredPlots with all plots
      } catch (error) {
        console.error('Error fetching society plots:', error);
      }
    };
    fetchPlots();
  }, [societyId]);

  // Handle search input change
  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter plots based on plotId
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
    <div>
      <h1>Plots in Society {societyId}</h1>

      {/* Search Box */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search by Plot ID"
          value={searchQuery}
          onChange={handleSearchChange}
          style={{
            padding: '10px',
            width: '300px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />
      </div>

      {/* Plot Table */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Location</th>
            <th>Electricity Available</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlots.length > 0 ? (
            filteredPlots.map((plot) => (
              <tr key={plot.plotId}>
                <td
                  onClick={() => navigate(`/plot/${plot.plotId}`)}
                  style={{
                    cursor: 'pointer',
                    color: 'blue',
                    textDecoration: 'underline',
                  }}
                >
                  {plot.plotId}
                </td>
                <td>{plot.location}</td>
                <td>{plot.electricityAvailable ? 'Yes' : 'No'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: 'center' }}>
                No plots found for the given Plot ID.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SocietyPlots;
