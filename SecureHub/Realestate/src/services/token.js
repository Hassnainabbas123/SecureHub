import axios from 'axios';

// Mint Tokens
export const mintTokens = async (to, amount) => {
  const response = await axios.post(`http://localhost:5000/api/tokens/mint`, {
    to,
    amount,
  });
  return response.data;
};

// Get Token Balance
export const getTokenBalance = async (email) => {
  const response = await axios.post(`http://localhost:5000/api/tokens/balance`, {
    email,
  });
  return response.data;
};

// Get all token transactions
export const getTokenTransactions = async () => {
    const response = await axios.get('http://localhost:5000/api/tokens/transactions');
    return response.data.transactions;
};
  
