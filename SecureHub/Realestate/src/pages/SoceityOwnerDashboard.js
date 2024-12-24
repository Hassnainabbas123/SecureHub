import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaTable, FaSignOutAlt } from "react-icons/fa"; // React Icons
import AddPlots from "./AddPlots"; 
import ShowAllPlots from "./ShowAddedPlots"; 
import "./SoceityOwnerDashboard.css";

const SocietyOwnerDashboard = () => {
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState(null); 

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="dashboard-sidebar">
        <h2 className="dashboard-title">Dashboard</h2>
        <ul className="dashboard-menu">
          <li
            className="dashboard-menu-item"
            onClick={() => setActiveComponent("addPlot")} // Show AddPlots component
          >
            <FaPlus className="dashboard-menu-icon" />
            Add Plot
          </li>
          <li
            className="dashboard-menu-item"
            onClick={() => setActiveComponent("showPlots")} // Show ShowAllPlots component
          >
            <FaTable className="dashboard-menu-icon" />
            Show Added Plots
          </li>
          <li className="dashboard-menu-item" onClick={handleLogout}>
            <FaSignOutAlt className="dashboard-menu-icon" />
            Logout
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="dashboard-main">
        {activeComponent === "addPlot" && <AddPlots />} {/* Render AddPlots */}
        {activeComponent === "showPlots" && <ShowAllPlots />} {/* Render ShowAllPlots */}
        {!activeComponent && (
          <>
            <h1>Welcome to the Society Owner Dashboard</h1>
            <p>Select an option from the menu.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default SocietyOwnerDashboard;
