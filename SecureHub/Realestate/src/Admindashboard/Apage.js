import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Apage.css'; // Ensure you create a CSS file for styles
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router for navigation

const Apage = () => {
  const [activeModule, setActiveModule] = useState('properties'); // Default to Properties module
  const [propertyList, setPropertyList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [votingList, setVotingList] = useState([]);
  const [contactList, setContactList] = useState([]); // New state to store contact messages
  const navigate = useNavigate(); // React Router's navigation hook

  useEffect(() => {
    // Fetch initial data
    fetchProperties();
    fetchUsers();
    fetchVotingData();
    fetchContactMessages(); // New function to fetch contact messages
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get('http://localhost:3001/properties');
      setPropertyList(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/users');
      setUserList(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchVotingData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/voting');
      setVotingList(response.data);
    } catch (error) {
      console.error('Error fetching voting data:', error);
    }
  };

  const fetchContactMessages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/contact-messages');
      setContactList(response.data);
    } catch (error) {
      console.error('Error fetching contact messages:', error);
    }
  };

  const handleLogout = () => {
    // Remove authentication token or any relevant user data
    localStorage.removeItem('authToken'); // Example: Remove token from localStorage
    
    // Redirect to Signup page after logout
    navigate('/Signuppage'); // Redirect to '/signup', ensure the route exists in your router
  };

  // Module components
  const renderModuleContent = () => {
    switch (activeModule) {
      case 'properties':
        return (
          <div className="module-content">
            <h2>Manage Properties</h2>
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
      case 'users':
        return (
          <div className="module-content">
            <h2>Manage Users</h2>
            <ul>
              {userList.map((user) => (
                <li key={user.id}>
                  <h3>{user.name}</h3>
                  <p>Email: {user.email}</p>
                </li>
              ))}
            </ul>
          </div>
        );
      case 'voting':
        return (
          <div className="module-content">
            <h2>Voting Management</h2>
            <ul>
              {votingList.map((vote) => (
                <li key={vote.id}>
                  <h3>{vote.propertyName}</h3>
                  <p>{vote.voteDescription}</p>
                  <button>View Details</button>
                </li>
              ))}
            </ul>
          </div>
        );
      case 'contact':
        return (
          <div className="module-content">
            <h2>Contact Messages</h2>
            <ul>
              {contactList.map((message) => (
                <li key={message.id}>
                  <h3>{message.name}</h3>
                  <p>Email: {message.email}</p>
                  <p>Subject: {message.subject}</p>
                  <p>Message: {message.message}</p>
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
    <div className="admin-dashboard-container">
      <nav className="admin-sidebar">
        <ul>
          <li onClick={() => setActiveModule('properties')}>Manage Properties</li>
 <li onClick={() => setActiveModule('users')}>Manage Users</li>
          <li onClick={() => setActiveModule('voting')}>Manage Voting</li>
          <li onClick={() => setActiveModule('contact')}>Contact Messages</li>
          <li onClick={() => setActiveModule('analytics')}>View Analytics</li>
          <li onClick={() => setActiveModule('settings')}>Settings</li>
        </ul>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      <div className="admin-main-content">
        {renderModuleContent()}
      </div>
    </div>
  );
};

export default Apage;