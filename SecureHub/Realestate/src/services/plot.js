import axios from 'axios';

// Add Plot
export const addPlot = async (plotData) => {
  const response = await axios.post(`http://localhost:5000/api/plots/add-plot`, plotData);
  return response.data;
};

// Get All Plots
export const getAllPlots = async () => {
  const response = await axios.get(`http://localhost:5000/api/plots/get-all-plots`);
  return response.data;
};

// Get Plot by ID
export const getPlotById = async (plotId) => {
  const response = await axios.get(`http://localhost:5000/api/plots/get-plot/${plotId}`);
  return response.data;
};

// Get Plots by Society ID
export const getPlotsBySocietyId = async (societyId) => {
  const response = await axios.get(`http://localhost:5000/api/plots/get-plots-by-society/${societyId}`);
  return response.data;
};

  // Check Token Ownership
  export const checkOwnership = async (email) => {
    console.log(email);
    const response = await axios.post(`http://localhost:5000/api/tokens/check-ownership`, { email });
    return response.data;
  };
