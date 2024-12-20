const express = require('express');
const router = express.Router();
const RealTokController = require('../controllers/RealTokController');

// Route to add a new plot (only callable by contract owner)
router.post('/add-plot', RealTokController.addPlot);

// Route to get plot details by plotId (only callable by token holders)
router.get('/get-plot/:plotId', RealTokController.getPlotById);

// Route to get all plots (only callable by contract owner)
router.get('/get-all-plots', RealTokController.getAllPlots);

// Route to get all plots by societyId (only callable by contract owner)
router.get('/get-plots-by-society/:societyId', RealTokController.getPlotsBySocietyId);

module.exports = router;
