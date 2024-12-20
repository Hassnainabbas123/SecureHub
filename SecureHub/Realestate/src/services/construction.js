import axios from "axios";

// Get all proposals
export const getAllProposals = async () => {
  const response = await axios.get("http://localhost:5000/api/proposals/all");
  return response.data;
};

// Get proposals submitted by the logged-in user
export const getUserProposals = async (authToken) => {
  const response = await axios.get(
    "http://localhost:5000/api/proposals/my-proposals",
    {
      headers: { authToken },
    }
  );
  return response.data;
};

// Submit a proposal
export const submitProposal = async (proposalData, authToken) => {
  const response = await axios.post(
    "http://localhost:5000/api/proposals/submit",
    proposalData,
    {
      headers: { authToken },
    }
  );
  return response.data;
};

// Get proposals where the user has commented
export const getUserComments = async (authToken) => {
  const response = await axios.get(
    "http://localhost:5000/api/proposals/my-comments",
    {
      headers: { authToken },
    }
  );
  return response.data;
};

// Add a comment to a proposal
export const commentOnProposal = async (proposalId, commentData, authToken) => {
  const response = await axios.post(
    `http://localhost:5000/api/proposals/comment/${proposalId}`,
    commentData,
    {
      headers: { authToken },
    }
  );
  return response.data;
};
