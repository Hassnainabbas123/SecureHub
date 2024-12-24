import React, { useState } from 'react';
import './AdminDashboard.css';
import Transactions from './Transaction';
import RecentTransactions from './RecentTransactions';
import AdminStats from './AdminStats';
import Feedbacks from './Feedback';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { FaExchangeAlt, FaHistory, FaChartLine, FaCommentDots, FaSignOutAlt } from 'react-icons/fa'; // Import icons

const AdminPanel = () => {
  const [selectedOption, setSelectedOption] = useState(''); // State to track selected component
  const navigate = useNavigate(); // Initialize useNavigate

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleLogout = () => {
    localStorage.clear(); // Clear any user data stored in localStorage
    navigate('/login'); // Navigate to the login page
  };

  return (
    <div className="admin-panel">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <div>
          <h2>Admin Dashboard</h2>
          <button onClick={() => handleOptionClick('transactions')} className="admin-sidebar-button">
            <FaExchangeAlt className="admin-sidebar-icon" /> Transactions
          </button>
          <button onClick={() => handleOptionClick('recentTransactions')} className="admin-sidebar-button">
            <FaHistory className="admin-sidebar-icon" /> Recent Transactions
          </button>
          <button onClick={() => handleOptionClick('stats')} className="admin-sidebar-button">
            <FaChartLine className="admin-sidebar-icon" /> Stats
          </button>
          <button onClick={() => handleOptionClick('feedback')} className="admin-sidebar-button">
            <FaCommentDots className="admin-sidebar-icon" /> Feedback
          </button>
          <button onClick={handleLogout} className="admin-sidebar-button">
            <FaSignOutAlt className="admin-sidebar-icon" /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="admin-main-content">
        {selectedOption === 'transactions' && <Transactions />}
        {selectedOption === 'recentTransactions' && <RecentTransactions />}
        {selectedOption === 'stats' && <AdminStats />}
        {selectedOption === 'feedback' && <Feedbacks />}
        {!selectedOption && <h2>Select an option from the sidebar</h2>}
      </div>
    </div>
  );
};

export default AdminPanel;
