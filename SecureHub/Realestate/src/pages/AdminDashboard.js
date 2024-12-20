import React, { useState, useEffect } from 'react';
import { getTokenTransactions } from '../services/token';
import { addPlot } from '../services/plot';
import { set } from 'mongoose';

const AdminDashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [status, setStatus] = useState("Add Plot");
  const [newPlot, setNewPlot] = useState({
    size: '',
    location: '',
    electricityAvailable: false,
    ownerName: '',
    societyId: '',
    owner: '',
  });

  const fetchTransactions = async () => {
    try {
      const data = await getTokenTransactions();
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleAddPlot = async (e) => {
    e.preventDefault();
    setStatus("Adding....")
    try {
      await addPlot(newPlot);
      alert('Plot added successfully!');
      setStatus("Add Plot")
    } catch (error) {
      console.error('Error adding plot:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Dashboard</h1>
      <h2>Add Plot</h2>
      <form onSubmit={handleAddPlot}>
        <input
          type="text"
          placeholder="Size"
          value={newPlot.size}
          onChange={(e) => setNewPlot({ ...newPlot, size: e.target.value })}
          required
        />
        <br/>
        <input
          type="text"
          placeholder="Location"
          value={newPlot.location}
          onChange={(e) => setNewPlot({ ...newPlot, location: e.target.value })}
          required
        />
       
         <label>Electricity Available</label>
        <input
          type="checkbox"
          checked={newPlot.electricityAvailable}
          onChange={(e) =>
            setNewPlot({ ...newPlot, electricityAvailable: e.target.checked })
          }
        />
      
        <br/>
        <input
          type="text"
          placeholder="Owner Name"
          value={newPlot.ownerName}
          onChange={(e) => setNewPlot({ ...newPlot, ownerName: e.target.value })}
          required
        />
           <br/>
        <input
          type="text"
          placeholder="Society ID"
          value={newPlot.societyId}
          onChange={(e) => setNewPlot({ ...newPlot, societyId: e.target.value })}
          required
        />
           <br/>
        <input
          type="text"
          placeholder="Owner Address"
          value={newPlot.owner}
          onChange={(e) => setNewPlot({ ...newPlot, owner: e.target.value })}
          required
        />
           <br/>
        <button type="submit"> {status}</button>
      </form>
      <h2>Token Transactions</h2>
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Amount</th>
            <th>User</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.timestamp}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.user}</td>
              <td>{transaction.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;