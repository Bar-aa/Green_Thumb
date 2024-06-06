const express = require('express');
const router = express.Router();
const { 
    getAllGardens, 
    getGardenById, 
    createGarden, 
    updateGarden, 
    deleteGarden, 
    getAllPlotsByGardenId
} = require('../controllers/gardens');


router.get('/', getAllGardens);
router.get('/:id', getGardenById);
router.post('/', createGarden);
router.put('/:id', updateGarden);
router.delete('/:id', deleteGarden);

router.get('/:id/Plots', getAllPlotsByGardenId);

module.exports = router;
