import React, { useEffect, useState } from 'react';
import { getPlotsBySocietyId, getAllPlots } from '../services/plot';
import { useParams, useNavigate } from 'react-router-dom';

const SocietyPlots = () => {
  const { societyId } = useParams(); // Optional parameter for societyId
  const [plots, setPlots] = useState([]); // All plots
  const [filteredPlots, setFilteredPlots] = useState([]); // Filtered plots based on search
  const [searchQuery, setSearchQuery] = useState(''); // Search input

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
        console.error('Error fetching plots:', error);
      }
    };
    fetchPlots();
  }, [societyId]);

  // Handle search input
  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query) {
      const filtered = plots.filter(
        (plot) => plot.plotId.toString().toLowerCase().includes(query) 
          );
      setFilteredPlots(filtered);
    } else {
      setFilteredPlots(plots); // Reset to all plots if query is empty
    }
  };

  return (
    <div>
      <h1>{societyId ? `Plots in Society ${societyId}` : 'All Plots'}</h1>

      {/* Search Box */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search by Plot ID "
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
            <th>Society ID</th>
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
                <td
                  onClick={() => navigate(`/society/${plot.societyId}`)}
                  style={{
                    cursor: 'pointer',
                    color: 'blue',
                    textDecoration: 'underline',
                  }}
                >
                  {plot.societyId || 'N/A'}
                </td>
                <td>{plot.location}</td>
                <td>{plot.electricityAvailable ? 'Yes' : 'No'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>
                No plots found for the given search.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SocietyPlots;
