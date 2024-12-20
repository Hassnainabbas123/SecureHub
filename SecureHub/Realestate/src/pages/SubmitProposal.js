import React, { useEffect, useState } from "react";
import { checkOwnership } from "../services/plot";
import { submitProposal } from "../services/construction";
import { useNavigate } from "react-router-dom";

const SubmitProposal = () => {
  const [title, setTitle] = useState("");
  const [plotSize, setPlotSize] = useState("");
  const [plotLocation, setPlotLocation] = useState("");
  const [pdf, setPdf] = useState(null);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // Check user authentication, wallet, and token ownership
  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("user"));

        // Check if user is logged in
        if (!userData || !userData.email) {
          alert("You must be logged in to submit a proposal.");
          navigate("/login");
          return;
        }
        setUser(userData);

        // Check if user has a wallet
        if (!userData.wallet) {
          alert("Please create a wallet first.");
          navigate("/userdashboard");
          return;
        }

        // Check token ownership
        const ownershipResponse = await checkOwnership(userData.email);
        if (!ownershipResponse.hasTokens) {
          alert("You must own tokens to submit a proposal.");
          navigate("/userdashboard");
          return;
        }
      } catch (error) {
        alert("Error checking user status: " + error.message);
      }
    };

    checkUserStatus();
  }, [navigate]);

  // Handle proposal submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please log in again.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("plotSize", plotSize);
    formData.append("plotLocation", plotLocation);
    formData.append("pdf", pdf);

    try {
      const response = await submitProposal(formData, user.authToken); // Using service function
      if (response.success) {
        alert("Proposal submitted successfully.");
        navigate("/userdashboard");
      } else {
        alert("Failed to submit proposal: " + response.error);
      }
    } catch (error) {
      alert("Error submitting proposal: " + error.message);
    }
  };

  return (
    <div>
      <h2>Submit Proposal</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Plot Size"
          value={plotSize}
          onChange={(e) => setPlotSize(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Plot Location"
          value={plotLocation}
          onChange={(e) => setPlotLocation(e.target.value)}
          required
        />
        <div>
          <label>Upload PDF:</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setPdf(e.target.files[0])}
            required
          />
        </div>
        <button type="submit">Submit Proposal</button>
      </form>
    </div>
  );
};

export default SubmitProposal;
