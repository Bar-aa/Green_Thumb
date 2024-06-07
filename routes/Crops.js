const express = require('express');
const router = express.Router();
const { 
    getAllCrops,
    getCropByName,
    addCrop,
    updateCrop,
    deleteCrop,
} = require('../controllers/CropsControl');


router.get('/', getAllCrops);
router.get('/:name', getCropByName);
router.post('/', addCrop);
router.put('/:cropID', updateCrop);
router.delete('/:cropID', deleteCrop);

//router.get('/plans', getAllCropPlans);

module.exports = router;