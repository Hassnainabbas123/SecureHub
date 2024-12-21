import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createWallet } from "../services/wallet";
import { getTokenBalance } from "../services/token";
import {
  FaWallet,
  FaCoins,
  FaPoll,
  FaSignOutAlt,
  FaClipboard,
  FaClipboardCheck,
  FaHome,
} from "react-icons/fa";
import "./UDashboard.css";
import walletBackground from "../images/wallet-background.jpg";

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("Buy Tokens");
  const [copiedField, setCopiedField] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(storedUser);
      if (storedUser.wallet) {
        setWallet(storedUser.wallet);
        fetchBalance(storedUser.email);
      }
    }
  }, [navigate]);

  const handleCreateWallet = async () => {
    try {
      if (wallet) {
        alert("You have already created a wallet.");
        return;
      }

      const data = await createWallet(user.email);
      const updatedWallet = data.wallet;

      const updatedUser = { ...user, wallet: updatedWallet };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setWallet(updatedWallet);
      alert("Wallet created successfully!");
    } catch (err) {
      setError(err.response?.data?.error || "Error creating wallet");
    }
  };

  const handleBuyTokens = async () => {
    setStatus("Loading...");
    try {
      const amount = prompt("Enter the Amount in Dollar (1 token = $5):");
      if (!amount || isNaN(amount)) {
        alert("Invalid amount");
        setStatus("Buy Tokens");
        return;
      }
      navigate(`/payments/${amount}`);
    } catch (err) {
      setError(err.response?.data?.error || "Error buying tokens");
    }
  };

  const fetchBalance = async (email) => {
    try {
      const data = await getTokenBalance(email);
      setBalance(data.balance);
    } catch (err) {
      setError(err.response?.data?.error || "Error fetching balance");
    }
  };

  const copyToClipboard = (field, text) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="dashboard-wrapper">
      <div className="sidebar">
        <h2>Welcome to User Dashboard</h2>
        <button
          onClick={handleCreateWallet}
          style={{
            opacity: wallet ? 0.5 : 1,
            cursor: wallet ? "not-allowed" : "pointer",
          }}
          disabled={!!wallet}
        >
          <FaWallet style={{ marginRight: "10px" }} />
          {wallet ? "Wallet Already Created" : "Create Wallet"}
        </button>
        <button onClick={handleBuyTokens}>
          <FaCoins style={{ marginRight: "10px" }} /> {status}
        </button>
        <button onClick={() => navigate("/create-poll")}>
          <FaPoll style={{ marginRight: "10px" }} /> Create Poll
        </button>
        <button onClick={() => navigate("/polls")}>
          <FaPoll style={{ marginRight: "10px" }} /> Vote Poll
        </button>
        <button onClick={() => navigate('/Mypolls')}>
  <FaPoll style={{ marginRight: '10px' }} /> My Polls
</button>
        <button onClick={() => navigate("/plots")}>
          <FaHome style={{ marginRight: "10px" }} /> Plot Details
        </button>
        <button onClick={() => navigate("/login")}>
          <FaSignOutAlt style={{ marginRight: "10px" }} /> Logout
        </button>
      </div>

      <div
        className="main-content"
        style={{
          backgroundImage: `url(${walletBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {error && <p className="error-message">{error}</p>}

        {user && (
          <div className="user-info">
            <p>
              <strong>User:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        )}

        {wallet && (
          <div className="wallet-container">
            <div className="wallet-section">
              <p>
                <strong>Wallet Public Key:</strong> {wallet.publicKey}
                <button
                  className={copiedField === "publicKey" ? "copied" : ""}
                  onClick={() => copyToClipboard("publicKey", wallet.publicKey)}
                >
                  {copiedField === "publicKey" ? (
                    <FaClipboardCheck />
                  ) : (
                    <FaClipboard />
                  )}
                </button>
              </p>
            </div>
            <div className="wallet-section mnemonic-section">
              <p>
                <strong>Mnemonic:</strong> {wallet.mnemonic}
                <button
                  className={copiedField === "mnemonic" ? "copied" : ""}
                  onClick={() => copyToClipboard("mnemonic", wallet.mnemonic)}
                >
                  {copiedField === "mnemonic" ? (
                    <FaClipboardCheck />
                  ) : (
                    <FaClipboard />
                  )}
                </button>
              </p>
            </div>
            <div className="wallet-section private-key-section">
              <p>
                <strong>Private Key:</strong> {wallet.privateKey}
                <button
                  className={copiedField === "privateKey" ? "copied" : ""}
                  onClick={() =>
                    copyToClipboard("privateKey", wallet.privateKey)
                  }
                >
                  {copiedField === "privateKey" ? (
                    <FaClipboardCheck />
                  ) : (
                    <FaClipboard />
                  )}
                </button>
              </p>
            </div>
            <div className="wallet-section">
              <p>
                <strong>Token Balance:</strong>{" "}
                {balance !== null ? balance : "Fetching..."}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
