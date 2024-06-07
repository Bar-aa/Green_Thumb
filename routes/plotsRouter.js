const express = require('express');
const router = express.Router();
const plotController = require('../Services/plotService');

router.get('/', plotController.getAllPlots);
router.get('/:id', plotController.getPlotById);
router.post('/', plotController.createPlot);
router.put('/:id', plotController.updatePlot);
router.delete('/:id', plotController.deletePlot);

module.exports = router;
