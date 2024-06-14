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


const { authenticateToken } = require('../middleware/authenticateToken');
const { authorizeRoles } = require('../middleware/authorize');
router.get('/', authenticateToken, getAllPlots);
router.get('/:id', validatePlotID, authenticateToken, getPlotById);
router.post('/', validatePlot, authenticateToken, authorizeRoles(['admin', 'member']), createPlot);
router.put('/:id', validatePlotID, validatePlot, authenticateToken, authorizeRoles(['admin', 'member']), updatePlot);
router.delete('/:id', validatePlotID, authenticateToken, authorizeRoles(['admin', 'member']), deletePlot);

module.exports = router;