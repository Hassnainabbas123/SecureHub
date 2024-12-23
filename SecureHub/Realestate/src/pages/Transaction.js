import React, { useState, useEffect } from 'react';
import { getTokenTransactions } from '../services/token';
import './Transaction.css';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");  // State for wallet address search

  const fetchTransactions = async () => {
    try {
      const data = await getTokenTransactions();
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Convert timestamp to readable date and time
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    return date.toLocaleString(); // Format to readable date and time
  };

  // Filter transactions by wallet address (search term)
  const filteredTransactions = transactions.filter(transaction =>
    transaction.user.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="transactions-container">
      <h1 className="transactions-title">Token Transactions</h1>

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

      {/* List of filtered transactions */}
      <div className="transactions-list">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction, index) => (
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
          ))
        ) : (
          <p>No transactions found for this wallet address.</p>
        )}
      </div>
    </div>
  );
};

export default Transactions;