const { ethers } = require("ethers");
const walletProvider = require('../utils/walletProvider');
require('dotenv').config();

const rsContract = walletProvider.getRSContract();

class RealTokController {

  // Add a new plot (only callable by contract owner)
  async addPlot(req, res) {
    const { size, location, electricityAvailable, ownerName, societyId, owner  } = req.body;
    
    try {
      if (!size || !location || !ownerName || !owner || societyId == null) {
        return res.status(400).json({ error: "All plot details are required." });
      }

      // Add plot to RealTok contract
      const tx = await walletProvider.getRSContract().addPlot(size, location, electricityAvailable, ownerName, societyId,owner);
      await tx.wait(); // Wait for transaction confirmation

      res.status(200).json({ message: 'Plot added successfully', transaction: tx });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get plot by ID (only callable by token holders)
  async getPlotById(req, res) {
    const { plotId } = req.params;
    
    try {
      // Check if the user is a token holder
      const plot = await rsContract.getPlotById(plotId);
          // Serialize the plot data to handle BigInt values
    const serializedPlot = {
      plotId: plot[0].toString(), // Convert BigInt to string
      size: plot[1],
      location: plot[2],
      electricityAvailable: plot[3],
      ownerName: plot[4],
      societyId: plot[5].toString(), // Convert BigInt to string
      owner: plot[6],
    };

      res.status(200).json({ serializedPlot });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get all plots (only callable by contract owner)
  async getAllPlots(req, res) {
    try {
      const plots = await rsContract.getAllPlots();
      // Convert BigInt values to strings for JSON serialization
      const serializedPlots = plots.map((plot) => ({
        plotId: plot[0].toString(), // Convert BigInt to string
        size: plot[1],
        location: plot[2],
        electricityAvailable: plot[3],
        ownerName: plot[4],
        societyId: plot[5].toString(), // Convert BigInt to string
        owner: plot[6]
      }));
      console.log(serializedPlots);
      res.status(200).json({ plots: serializedPlots });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

// Get plots by societyId (only callable by contract owner)
async getPlotsBySocietyId(req, res) {
  const { societyId } = req.params;

  try {
    // Fetch plots from the contract
    const plots = await rsContract.getPlotsBySocietyId(societyId);

    // Serialize the plot data to handle BigInt values
    const serializedPlots = plots.map((plot) => ({
      plotId: plot[0].toString(), // Convert BigInt to string
      size: plot[1],
      location: plot[2],
      electricityAvailable: plot[3],
      ownerName: plot[4],
      societyId: plot[5].toString(), // Convert BigInt to string
      owner: plot[6],
    }));

    console.log(serializedPlots);
    res.status(200).json({ plots: serializedPlots });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
}

module.exports = new RealTokController();
