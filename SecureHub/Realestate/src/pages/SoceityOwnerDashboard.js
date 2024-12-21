import React from "react";
import { useNavigate } from "react-router-dom";

const SocietyOwnerDashboard = () => {
  const navigate = useNavigate();

  // Handle logout function
  const handleLogout = () => {
    // Remove the auth token or user data from localStorage or sessionStorage
    localStorage.removeItem('user'); // Assuming the user data is stored here
    // If you're using sessionStorage, you can do the same with sessionStorage.removeItem('user');

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "250px",
          backgroundColor: "#004d00",
          color: "#fff",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <h2 style={{ color: "#fff", textAlign: "center" }}>Dashboard</h2>
        <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
          <li
            style={{
              margin: "15px 0",
              padding: "10px",
              backgroundColor: "#006600",
              borderRadius: "5px",
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={() => navigate("/addplots")} // Navigate to AddPlots
          >
            Add Plot
          </li>
          <li
            style={{
              margin: "15px 0",
              padding: "10px",
              backgroundColor: "#006600",
              borderRadius: "5px",
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={() => navigate("/showaddedplots")} // Navigate to Show Added Plots
          >
            Show Added Plots
          </li>
          <li
            style={{
              margin: "15px 0",
              padding: "10px",
              backgroundColor: "#006600",
              borderRadius: "5px",
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={handleLogout} // Logout functionality
          >
            Logout
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        <h1>Welcome to the Society Owner Dashboard</h1>
        <p>Select an option from the menu.</p>
      </div>
    </div>
  );
};

export default SocietyOwnerDashboard;