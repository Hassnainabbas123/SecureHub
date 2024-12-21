import React, { useEffect, useState } from 'react';
import { getAllPlots } from '../services/plot';
import { useNavigate } from 'react-router-dom';

const ShowAllPlots = () => {
  const [plots, setPlots] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlots = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));

        if (!user || user.email !== 'sabihulhassan343@gmail.com' && user.password !== 'sabih321') {
          alert('You must be logged in with the correct email and password to view plots.');
          navigate('/login');
          return;
        }

        const data = await getAllPlots();
        console.log('Fetched Plots:', data); // Debug API response
        setPlots(data.plots || []);
      } catch (error) {
        console.error('Error fetching plots:', error);
      }
    };

    fetchPlots();
  }, [navigate]);

  return (
    <div>
      <h1>All Plots</h1>
      {plots.length > 0 ? (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Plot ID</th>
              <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Size</th>
              <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Location</th>
              <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Electricity Available</th>
              <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Owner Name</th>
              <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Society ID</th>
              <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Owner</th>
            </tr>
          </thead>
          <tbody>
            {plots.map((plot, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{plot.plotId}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{plot.size}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{plot.location}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                  {plot.electricityAvailable ? 'Yes' : 'No'}
                </td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{plot.ownerName}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{plot.societyId}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{plot.owner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No plots available or loading...</p>
      )}

      <button onClick={() => navigate('/society-owner-dashboard')}>Go to Dashboard</button>
    </div>
  );
};

export default ShowAllPlots;