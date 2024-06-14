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
} = require('../Services/gardenService');

module.exports = {
    validateGarden,
    validateGardenID,
    checkGardenIdExists
} = require('../Validation/gardenValidator');

const { authenticateToken } = require('../middleware/authenticateToken');
const { authorizeRoles } = require('../middleware/authorize');
router.get('/', authenticateToken, getAllGardens,);
router.get('/:id', validateGardenID, authenticateToken, getGardenById);
router.post('/', validateGarden, authenticateToken, authorizeRoles(['admin']), createGarden);
router.put('/:id', validateGardenID, validateGarden, authenticateToken, authorizeRoles(['admin']), updateGarden);
router.delete('/:id', validateGardenID, authenticateToken, authorizeRoles(['admin']), deleteGarden);
router.get('/:id/plots', validateGardenID, authenticateToken, getAllPlotsByGardenId);
router.get('/:id/crops', validateGardenID, authenticateToken, getAllCropsInGarden);

module.exports = router;