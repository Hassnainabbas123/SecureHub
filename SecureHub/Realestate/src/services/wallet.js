import axios from "axios";

// Create Wallet
export const createWallet = async (email) => {
  const data = {
    email: email,
  };

  console.log(data);
  const response = await axios.post(
    `http://localhost:5000/api/wallet/create-wallet`,
    data
  );
  return response.data;
};
