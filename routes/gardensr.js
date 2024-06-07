/*const express = require('express');
const router = express.Router();
const { 
    getAllGardens, 
    getGardenById, 
    createGarden, 
    updateGarden, 
    deleteGarden, 
    getAllPlotsByGardenId,
    getAllCropsInGarden
} = require('../controllers/gardenController');


router.get('/', getAllGardens);
router.get('/:id', getGardenById);
router.post('/', createGarden);
router.put('/:id', updateGarden);
router.delete('/:id', deleteGarden);

router.get('/:gardenId/Plots', getAllPlotsByGardenId);
router.get('/:gardenId/Crops', getAllCropsInGarden); 

module.exports = router;
*/
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