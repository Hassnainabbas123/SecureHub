// Owner.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import './Owner.css'; // Import your CSS for styling

const Owner = () => {
  const [properties, setProperties] = useState([]);
  const [newProperty, setNewProperty] = useState({ title: '', location: '', price: '' });
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProperty({ ...newProperty, [name]: value });
  };

  const addProperty = () => {
    setProperties([...properties, newProperty]);
    setNewProperty({ title: '', location: '', price: '' }); // Reset the form
  };

  const deleteProperty = (index) => {
    const updatedProperties = properties.filter((_, i) => i !== index);
    setProperties(updatedProperties);
  };

  const handleLogout = () => {
    // Perform any cleanup tasks (like clearing user session, tokens, etc.)
    localStorage.removeItem('authToken'); // Clear any stored auth tokens (example)
    navigate('/signup'); // Redirect to the signup page
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Property Owner Dashboard</h1>
        <div className="user-profile">
          <span>Welcome, Owner!</span>
          <button onClick={handleLogout}>Logout</button> {/* Logout button */}
        </div>
      </header>

      <div className="dashboard-content">
        <aside className="sidebar">
          <nav>
            <ul>
              <li>Overview</li>
              <li>My Properties</li>
              <li>Add Property</li>
              <li>Messages</li>
              <li>Settings</li>
            </ul>
          </nav>
        </aside>

        <main className="main-content">
          <section className="overview">
            <h2>Overview</h2>
            <p>Total Properties: {properties.length}</p>
            {/* Additional stats can be added here */}
          </section>

          <section className="properties">
            <h2>My Properties</h2>
            <ul>
              {properties.map((property, index) => (
                <li key={index}>
                  <h3>{property.title}</h3>
                  <p>Location: {property.location}</p>
                  <p>Price: ${property.price}</p>
                  <button onClick={() => deleteProperty(index)}>Delete</button>
                </li>
              ))}
            </ul>
          </section>

          <section className="add-property">
            <h2>Add Property</h2>
            <input
              type="text"
              name="title"
              placeholder="Property Title"
              value={newProperty.title}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={newProperty.location}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={newProperty.price}
              onChange={handleInputChange}
            />
            <button onClick={addProperty}>Add Property</button>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Owner;
