import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Fpage.css'; // Make sure to add your styles here
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const Fpage = () => {
  const [activeModule, setActiveModule] = useState('properties'); // Default to Properties module
  const [propertyList, setPropertyList] = useState([]);
  const [userShares, setUserShares] = useState([]);
  const [votingData, setVotingData] = useState([]);
  const navigate = useNavigate(); // Hook to handle navigation

  useEffect(() => {
    // Fetch initial data like property listings, shares, voting info, etc.
    fetchProperties();
    fetchUserShares();
    fetchVotingData();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get('http://localhost:3001/properties');
      setPropertyList(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const fetchUserShares = async () => {
    try {
      const response = await axios.get('http://localhost:3001/user-shares');
      setUserShares(response.data);
    } catch (error) {
      console.error('Error fetching user shares:', error);
    }
  };

  const fetchVotingData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/voting');
      setVotingData(response.data);
    } catch (error) {
      console.error('Error fetching voting data:', error);
    }
  };

  const handleLogout = () => {
    // Clear any authentication tokens or session data
    localStorage.removeItem('authToken'); // Example of removing token from localStorage
    
    // Navigate to the Signup page after logout
    navigate('/Signuppage');
  };

  const renderModuleContent = () => {
    switch (activeModule) {
      case 'properties':
        return (
          <div className="module-content">
            <h2>Property Listings</h2>
            <ul>
              {propertyList.map((property) => (
                <li key={property.id}>
                  <h3>{property.name}</h3>
                  <p>{property.description}</p>
                  <p>Owner: {property.owner}</p>
                  <p>Price: {property.price} ETH</p>
                </li>
              ))}
            </ul>
          </div>
        );
      case 'fractional':
        return (
          <div className="module-content">
            <h2>Your Fractional Ownership</h2>
            <ul>
              {userShares.map((share) => (
                <li key={share.id}>
                  <h3>{share.propertyName}</h3>
                  <p>Shares Owned: {share.ownedTokens}</p>
                  <p>Percentage: {share.percentage}%</p>
                </li>
              ))}
            </ul>
          </div>
        );
      case 'voting':
        return (
          <div className="module-content">
            <h2>Voting</h2>
            <ul>
              {votingData.map((vote) => (
                <li key={vote.id}>
                  <h3>{vote.propertyName}</h3>
                  <p>{vote.voteDescription}</p>
                  <button>Vote</button>
                </li>
              ))}
            </ul>
          </div>
        );
      default:
        return <p>Select a module to view details.</p>;
    }
  };

  return (
    <div className="dashboard-container">
      <nav className="sidebar">
        <ul>
          <li onClick={() => setActiveModule('properties')}>Properties</li>
          <li onClick={() => setActiveModule('fractional')}>Fractional Ownership</li>
          <li onClick={() => setActiveModule('voting')}>Voting</li>
          <li onClick={() => setActiveModule('digitalPassport')}>Digital Passport</li>
          <li onClick={() => setActiveModule('liquidity')}>Liquidity</li>
          <li onClick={() => setActiveModule('payment')}>Payment</li>
        </ul>
        <button className="logout-button" onClick={handleLogout}>Logout</button> {/* Logout Button */}
      </nav>
      <div className="main-content">
        {renderModuleContent()}
      </div>
    </div>
  );
};

export default Fpage;
