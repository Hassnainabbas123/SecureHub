import React, { useState } from 'react';
import './AdminDashboard.css';
import Transactions from './Transaction';
import RecentTransactions from './RecentTransactions';
import AdminStats from './AdminStats';
import Feedbacks from './Feedback';

const AdminPanel = () => {
  const [selectedOption, setSelectedOption] = useState(''); // State to track selected component

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  }; 

  return (
    <div className="admin-panel">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <div>
          <h2>Admin Dashboard</h2>
          <button onClick={() => handleOptionClick('transactions')} className="admin-sidebar-button">
            Transactions
          </button>
          <button onClick={() => handleOptionClick('recentTransactions')} className="admin-sidebar-button">
            Recent Transactions
          </button>
          <button onClick={() => handleOptionClick('stats')} className="admin-sidebar-button">
            Stats
          </button>
          <button onClick={() => handleOptionClick('feedback')} className="admin-sidebar-button">
            Feedback
          </button>
          <button onClick={() => console.log('Logout')} className="admin-sidebar-button">
            Logout
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
