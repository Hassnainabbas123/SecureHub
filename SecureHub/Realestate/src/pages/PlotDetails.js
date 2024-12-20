import React, { useEffect, useState } from 'react';
import { getPlotById, checkOwnership } from '../services/plot';
import { useNavigate, useParams } from 'react-router-dom';

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
            alert('Create a wallet  first.');
            navigate('/userdashboard');
            return;
          }


        const res = await checkOwnership(user.email); 
        // console.log(hasTokens);
        // Use email from localStorage
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
    <div>
      <h1>Plot Details</h1>
      {plot ? (
        <div>
          <p>Size: {plot.size}</p>
          <p>Location: {plot.location}</p>
          <p>Electricity Available: {plot.electricityAvailable ? 'Yes' : 'No'}</p>
          <p>Owner Name: {plot.ownerName}</p>
          <p>Society ID: {plot.societyId}</p>
          <p>Owner: {plot.owner}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PlotDetails;
