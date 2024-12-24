import React, { useEffect, useState } from 'react';
import { getPlotById, checkOwnership } from '../services/plot';
import { useNavigate, useParams } from 'react-router-dom';
import './PlotDetails.css'; 

const PlotDetails = () => {
  const { plotId } = useParams();
  const [plot, setPlot] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlotDetails = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user')); // Retrieve user from localStorage
        if (!user || !user.email) {
          alert('You must be logged in to view plot details.');
          navigate('/login');
          return;
        }

        if (!user || !user.wallet) {
          alert('Create a wallet first.');
          navigate('/userdashboard');
          return;
        }

        const res = await checkOwnership(user.email); 
        if (!res.hasTokens) {
          alert('You must own tokens to view plot details.');
          navigate('/userdashboard');
          return;
        }

        const data = await getPlotById(plotId);
        setPlot(data.serializedPlot);
      } catch (error) {
        console.error('Error fetching plot details:', error);
      }
    };
    fetchPlotDetails();
  }, [plotId, navigate]);

  return (
    <div className="plot-details-container">
      <h1 className="plot-details-header">Plot Details</h1>
      {plot ? (
        <div>
          <p className="plot-details">Size: <span>{plot.size}</span></p>
          <p className="plot-details">Location: <span>{plot.location}</span></p>
          <p className="plot-details">Electricity Available: <span>{plot.electricityAvailable ? 'Yes' : 'No'}</span></p>
          <p className="plot-details">Owner Name: <span>{plot.ownerName}</span></p>
          <p className="plot-details">Society ID: <span>{plot.societyId}</span></p>
          <p className="plot-details">Owner: <span>{plot.owner}</span></p>
        </div>
      ) : (
        <p className="plot-details">Loading...</p>
      )}
      <button className="plot-details-button" onClick={() => navigate('/plots')}>Back to Plot List</button>
    </div>
  );
};

export default PlotDetails;
