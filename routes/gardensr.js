const express = require('express');
const router = express.Router();
const { 
    getAllGardens, 
    getGardenById, 
    createGarden, 
    updateGarden, 
    deleteGarden, 
    getAllPlotsByGardenId,
    getAllCropsInGarden
} = require('../controllers/gardens');


router.get('/', getAllGardens);
router.get('/:id', getGardenById);
router.post('/', createGarden);
router.put('/:id', updateGarden);
router.delete('/:id', deleteGarden);

router.get('/:gardenId/Plots', getAllPlotsByGardenId);
router.get('/:gardenId/Crops', getAllCropsInGarden); 

module.exports = router;
