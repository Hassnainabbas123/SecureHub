import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import { getTokenTransactions } from '../services/token'; // Ensure this function is working correctly
import './AdminStats.css';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const AdminStats = () => {
  const [transactions, setTransactions] = useState([]);
  const [pieData, setPieData] = useState({});
  const [barData, setBarData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTokenTransactions();
        if (Array.isArray(data)) {
          setTransactions(data);
          processStats(data);
        } else {
          setError('Invalid data received from server.');
        }
      } catch (error) {
        setError('Failed to fetch transactions. Please try again later.');
      }
    };

    fetchTransactions();
  }, []);

  const processStats = (data) => {
    const timePeriods = { morning: 0, afternoon: 0, night: 0 };
    const daysOfWeek = { Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0, Sunday: 0 };

    data.forEach((transaction) => {
      if (!transaction.timestamp) return;

      const date = new Date(transaction.timestamp * 1000);
      const hours = date.getHours();
      const day = date.toLocaleDateString('en-US', { weekday: 'long' });

      if (hours >= 6 && hours < 12) timePeriods.morning += 1;
      else if (hours >= 12 && hours < 18) timePeriods.afternoon += 1;
      else timePeriods.night += 1;

      if (daysOfWeek[day] !== undefined) {
        daysOfWeek[day] += 1;
      }
    });

    setPieData({
      labels: ['Morning (6 AM - 12 PM)', 'Afternoon (12 PM - 6 PM)', 'Night (6 PM - 6 AM)'],
      datasets: [
        {
          label: 'Transactions by Time of Day',
          data: [timePeriods.morning, timePeriods.afternoon, timePeriods.night],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
      ],
    });

    setBarData({
      labels: Object.keys(daysOfWeek),
      datasets: [
        {
          label: 'Transactions by Day of the Week',
          data: Object.values(daysOfWeek),
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
        },
      ],
    });
  };

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="admin-stats-container">
      <h1>Transaction States</h1>
      {transactions.length === 0 ? (
        <p className="loading-message">Loading transactions...</p>
      ) : (
        <div className="stats-graphs">
          <div className="graph-card">
            <h2>Transactions by Time of Day</h2>
            <Pie data={pieData} />
          </div>
          <div className="graph-card">
            <h2>Transactions by Day of the Week</h2>
            <Bar
              data={barData}
              options={{
                scales: {
                  y: { beginAtZero: true },
                },
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminStats;
