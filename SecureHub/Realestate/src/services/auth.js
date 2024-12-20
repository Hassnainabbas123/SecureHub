import axios from 'axios';

// Register User
export const registerUser = async (userData) => {
  const response = await axios.post('http://localhost:5000/api/auth/register', userData);
  return response.data;
};

// Login User
export const loginUser = async (userData) => {
  const response = await axios.post('http://localhost:5000/api/auth/signin', userData);
  return response.data;
};

// Verify OTP
export const verifyOtp = async ({ email, otp }) => {
  const response = await axios.post('http://localhost:5000/api/auth/verify-otp', { email, otp });
  return response.data;
};
