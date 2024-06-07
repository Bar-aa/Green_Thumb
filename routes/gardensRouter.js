const express = require('express');
const router = express.Router();
const gardenController = require('../controllers/gardenController');

router.get('/', gardenController.getAllGardens);
router.get('/:id', gardenController.getGardenById);
router.post('/', gardenController.createGarden);
router.put('/:id', gardenController.updateGarden);
router.delete('/:id', gardenController.deleteGarden);
router.get('/:gardenId/plots', gardenController.getAllPlotsByGardenId);
router.get('/:gardenId/crops', gardenController.getAllCropsInGarden);

module.exports = router;