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

router.get('/', getAllPlots);
router.get('/:id', validatePlotID, getPlotById);
router.post('/', validatePlot, checkGardenIdExists, createPlot); 
router.put('/:id', validatePlotID, validatePlot, updatePlot);
router.delete('/:id', validatePlotID, deletePlot);

module.exports = router;