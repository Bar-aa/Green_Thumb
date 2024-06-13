const express = require('express');
const router = express.Router();

const {
    getAllPlots,
    getPlotById,
    createPlot,
    updatePlot,
    deletePlot
} = require('../Services/plotService')

const {
    validatePlot,
    validatePlotID
} = require('../Validation/plotValidator');

const {
    checkGardenIdExists
} = require('../Validation/gardenValidator');
const { authenticateToken} = require('../middleware/authenticateToken');
const { authorizeAdmin ,authorizemember,authorizeVolunter,authorizeParteners} = require('../middleware/authorize');
router.get('/', authenticateToken,authorizeAdmin,getAllPlots);
router.get('/:id', validatePlotID,authenticateToken,authorizeAdmin, getPlotById);
router.post('/', validatePlot, authenticateToken,authorizeAdmin,checkGardenIdExists, createPlot); 
router.put('/:id', validatePlotID, validatePlot, authenticateToken,authorizeAdmin,updatePlot);
router.delete('/:id', validatePlotID,authenticateToken,authorizeAdmin, deletePlot);

module.exports = router;