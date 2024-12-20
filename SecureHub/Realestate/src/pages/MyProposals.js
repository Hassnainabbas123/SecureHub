import React, { useEffect, useState } from 'react';
import { checkOwnership } from '../services/plot'; 
 // Import the checkOwnership function
 import { submitProposal } from "../services/construction";



const MyProposals = () => {
    const [proposals, setProposals] = useState([]);
    const authToken = localStorage.getItem('authToken'); // Retrieve token from localStorage

    useEffect(() => {
        const fetchUserProposals = async () => {
            try {
                // Check if user is logged in
                if (!authToken) {
                    alert("You must be logged in to view your proposals.");
                    window.location.href = "/login"; // Redirect to login if not logged in
                    return;
                }

                // Fetch user data (assuming you have an endpoint that provides user info)
                const userResponse = await fetch('http://localhost:4000/api/user', {
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                    },
                });
                const userData = await userResponse.json();

                // Check if user has a wallet
                if (!userData.wallet) {
                    alert("Please create a wallet first.");
                    window.location.href = "/userdashboard"; // Redirect to dashboard if no wallet
                    return;
                }

                // Check token ownership
                const ownershipResponse = await checkOwnership(userData.email);
                if (!ownershipResponse.hasTokens) {
                    alert("You must own tokens to view proposals.");
                    window.location.href = "/userdashboard"; // Redirect to dashboard if no tokens
                    return;
                }

                // If all checks pass, fetch proposals
                const response = await fetch('http://localhost:4000/api/my-proposals', {
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                if (data.success) {
                    setProposals(data.proposals);
                } else {
                    alert('Failed to fetch proposals: ' + data.error);
                }
            } catch (error) {
                console.error('Error fetching proposals:', error);
            }
        };

        fetchUserProposals();
    }, [authToken]);

    return (
        <div>
            <h2>My Proposals</h2>
            {proposals.length === 0 ? (
                <p>You have not submitted any proposals yet.</p>
            ) : (
                proposals.map((proposal) => (
                    <div key={proposal._id} className="proposal-card">
                        <h3>{proposal.title}</h3>
                        <p>{proposal.plotSize} - {proposal.plotLocation}</p>
                        {/* Check if the PDF is available and render a link */}
                        {proposal.pdf ? (
                            <a href={`http://localhost:4000/${proposal.pdf}`} target="_blank" rel="noopener noreferrer">
                                View Proposal PDF
                            </a>
                        ) : (
                            <p>No PDF uploaded.</p>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default MyProposals;
