import React, { useState, useEffect } from "react";
import { checkOwnership } from "../services/plot";

import { getAllProposals, getUserComments, commentOnProposal } from "../services/construction";  // Corrected function imports
import { useNavigate } from "react-router-dom";

const AddComments = () => {
  const [proposals, setProposals] = useState([]);
  const [userCommentedProposals, setUserCommentedProposals] = useState([]);
  const [comments, setComments] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [activeProposalId, setActiveProposalId] = useState(null);
  const [selectedPdfFiles, setSelectedPdfFiles] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const initializeData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("userData"));
        const token = localStorage.getItem("authToken");

        // Check if user is logged in
        if (!userData || !userData.email) {
          alert("You must be logged in to submit a proposal.");
          navigate("/login");
          return;
        }

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

        // Fetch proposals and user comments
        const proposalsData = await getAllProposals();  // Corrected function
        setProposals(proposalsData.proposals);

        const userComments = await getUserComments(token);  // Corrected function
        if (userComments.success) {
          setUserCommentedProposals(userComments.commentedProposals);
        }
      } catch (error) {
        console.error("Error checking user status or fetching data:", error.message);
        alert("Error checking user status: " + error.message);
      }
    };

    initializeData();
  }, [navigate]);

  const handleCommentSubmit = async (proposalId) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Please log in again.");
      return;
    }

    if (userCommentedProposals.includes(proposalId)) {
      alert("You have already commented on this proposal.");
      return;
    }

    const formData = new FormData();
    formData.append("text", comments[proposalId]);
    if (selectedPdfFiles[proposalId]) {
      formData.append("pdf", selectedPdfFiles[proposalId]);
    }

    try {
      const response = await commentOnProposal(proposalId, formData, token);  // Corrected function
      if (response.success) {
        alert("Comment added successfully.");
        setComments((prev) => ({ ...prev, [proposalId]: "" }));
        setSelectedPdfFiles((prev) => ({ ...prev, [proposalId]: null }));
        setUserCommentedProposals((prev) => [...prev, proposalId]);
      } else {
        alert(response.error || "Failed to add comment.");
      }
    } catch (error) {
      console.error("Error submitting comment:", error.message);
    }
  };

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const filteredProposals = proposals.filter(
    (proposal) =>
      proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proposal.plotSize.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proposal.plotLocation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileChange = (proposalId, file) => {
    setSelectedPdfFiles((prev) => ({ ...prev, [proposalId]: file }));
  };

  return (
    <div>
      <h2>Add Comments</h2>
      <input
        type="text"
        placeholder="Search proposals (title, size, location)"
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <div>
        {filteredProposals.length === 0 ? (
          <p>No proposals found</p>
        ) : (
          filteredProposals.map((proposal) => (
            <div key={proposal._id} className="proposal-card">
              <h3>{proposal.title}</h3>
              <p>{proposal.plotSize} - {proposal.plotLocation}</p>
              <p>{proposal.description}</p>

              {userCommentedProposals.includes(proposal._id) ? (
                <p>You have already commented on this proposal.</p>
              ) : (
                <>
                  <button
                    onClick={() => setActiveProposalId(activeProposalId === proposal._id ? null : proposal._id)}
                  >
                    Comment
                  </button>

                  {activeProposalId === proposal._id && (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleCommentSubmit(proposal._id);
                      }}
                    >
                      <textarea
                        value={comments[proposal._id] || ""}
                        onChange={(e) =>
                          setComments((prev) => ({ ...prev, [proposal._id]: e.target.value }))
                        }
                        placeholder="Write your comment"
                        required
                      />
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handleFileChange(proposal._id, e.target.files[0])}
                      />
                      <button type="submit">Submit Comment</button>
                    </form>
                  )}
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AddComments;
