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
const { authorizeAdmin ,authorizemember,authorizeVolunter,authorizeParteners} = require('../middleware/authorize');
router.get('/',authenticateToken, authorizeAdmin, getAllGardens,);
router.get('/:id',validateGardenID,authenticateToken, authorizeAdmin, getGardenById);
router.post('/', validateGarden,authenticateToken, authorizeAdmin,createGarden);
router.put('/:id',validateGardenID,validateGarden ,authenticateToken, authorizeAdmin,updateGarden);
router.delete('/:id', validateGardenID,authenticateToken, authorizeAdmin,deleteGarden);
router.get('/:id/plots', validateGardenID,authenticateToken, authorizeAdmin,getAllPlotsByGardenId);
router.get('/:id/crops',validateGardenID, authenticateToken, authorizeAdmin,getAllCropsInGarden);

module.exports = router;