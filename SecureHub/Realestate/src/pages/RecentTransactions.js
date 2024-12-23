import React, { useState, useEffect } from 'react';
import { getTokenTransactions } from '../services/token';
import './RecentTransactions.css';

const RecentTransactions = () => {
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [search, setSearch] = useState(""); // State for wallet address search

  useEffect(() => {
    const fetchRecentTransactions = async () => {
      try {
        const allTransactions = await getTokenTransactions();
        const now = new Date().getTime();
        const twelveHoursAgo = now - 12 * 60 * 60 * 1000; // 12 hours in milliseconds

        // Filter transactions from the last 12 hours
        const filtered = allTransactions.filter(
          (transaction) => transaction.timestamp * 1000 >= twelveHoursAgo
        );

        setRecentTransactions(filtered);
      } catch (error) {
        console.error('Error fetching recent transactions:', error);
      }
    };

    fetchRecentTransactions();
  }, []);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    return date.toLocaleString(); // Format to readable date and time
  };

  // Filter transactions by wallet address (search term)
  const filteredTransactions = recentTransactions.filter(transaction =>
    transaction.user.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="recent-transactions-container">
      <h1>Recent Transactions (Last 12 Hours)</h1>

      {/* Search bar to filter by wallet address */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by wallet address..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      {/* List of filtered recent transactions */}
      {filteredTransactions.length > 0 ? (
        <div className="transactions-list">
          {filteredTransactions.map((transaction, index) => (
            <div key={index} className="transaction-card">
              <div className="transaction-details">
                <div><strong>From:</strong> {transaction.user}</div>
                <div className="transaction-timestamp">
                  <strong>Date:</strong> {formatTimestamp(transaction.timestamp)}
                </div>
              </div>
              <div className="transaction-amount">
                {transaction.amount} SEH
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No transactions found in the last 12 hours.</p>
      )}
    </div>
  );
};

export default RecentTransactions;
