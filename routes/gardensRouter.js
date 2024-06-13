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

const { authenticateToken} = require('../middleware/authenticateToken');
const { authorize} = require('../middleware/authorize');
router.get('/',authenticateToken, authorize, getAllGardens,);
router.get('/:id',validateGardenID,authenticateToken, authorize, getGardenById);
router.post('/', validateGarden,authenticateToken, authorize,createGarden);
router.put('/:id',validateGardenID,validateGarden ,authenticateToken, authorize,updateGarden);
router.delete('/:id', validateGardenID,authenticateToken, authorize,deleteGarden);
router.get('/:id/plots', validateGardenID,authenticateToken, authorize,getAllPlotsByGardenId);
router.get('/:id/crops',validateGardenID, authenticateToken, authorize,getAllCropsInGarden);

module.exports = router;