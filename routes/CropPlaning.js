const express = require('express');
const router = express.Router();
const {
    getAllCropRotations,
    getCropRotationById,
    addCropRotation,
    updateCropRotation,
    deleteCropRotation,
} = require('../Services/CropPlaningService');
const { validateCropRotation, validateCropRotationID} = require('../Validation/cropRotationValidator');


router.get('/', getAllCropRotations);
router.get('/:id',validateCropRotationID ,getCropRotationById);
router.post('/', validateCropRotation, addCropRotation);
router.put('/:id', validateCropRotation, updateCropRotation);
router.delete('/:id',validateCropRotationID, deleteCropRotation);

module.exports = router;