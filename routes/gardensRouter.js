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
}=require('../Services/gardenService');

module.exports = {
    validateGarden,
    validateGardenID,
    checkGardenIdExists
}=require('../Validation/gardenValidator');


router.get('/', getAllGardens,);
router.get('/:id',validateGardenID, getGardenById);
router.post('/', validateGarden,createGarden);
router.put('/:id',validateGardenID,validateGarden ,updateGarden);
router.delete('/:id', validateGardenID,deleteGarden);
router.get('/:id/plots', validateGardenID,getAllPlotsByGardenId);
router.get('/:id/crops',validateGardenID, getAllCropsInGarden);

module.exports = router;