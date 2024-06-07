const express = require('express');
const router = express.Router();
const {
    getAllCrops,
    getCropByName,
    addCrop,
    updateCrop,
    deleteCrop,
} = require('../Services/CropsService');
const { validateCrop, validateCropID } = require('../Validation/cropValidator');

router.get('/', getAllCrops);
router.get('/:name', getCropByName);
router.post('/', validateCrop, addCrop);
router.put('/:cropID', validateCropID, validateCrop, updateCrop);
router.delete('/:cropID', validateCropID, deleteCrop);

module.exports = router;
