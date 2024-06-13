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
const { authenticateToken} = require('../middleware/authenticateToken');
const { authorizeAdmin ,authorizemember,authorizeVolunter,authorizeParteners} = require('../middleware/authorize');

router.get('/',authorizeAdmin,authenticateToken, getAllCropRotations);
router.get('/:id',validateCropRotationID ,authorizeAdmin,authenticateToken,getCropRotationById);
router.post('/', validateCropRotation, authorizeAdmin,authenticateToken,addCropRotation);
router.put('/:id', validateCropRotation,authorizeAdmin,authenticateToken, updateCropRotation);
router.delete('/:id',validateCropRotationID,authorizeAdmin,authenticateToken, deleteCropRotation);

module.exports = router;