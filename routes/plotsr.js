const express = require('express');
const router = express.Router();
const { 
    getAllPlots,
    getPlotById,
    createPlot,
    updatePlot,
    deletePlot,
} = require('../controllers/plots');


router.get('/', getAllPlots);
router.get('/:id', getPlotById);
router.post('/', createPlot);
router.put('/:plotId', updatePlot);
router.delete('/:id', deletePlot);
module.exports = router;