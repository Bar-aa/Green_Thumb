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
const { authorizeRoles} = require('../middleware/authorize');

router.get('/',authenticateToken,authorizeRoles(['admin']),getAllCropRotations);
router.get('/:id',validateCropRotationID ,authenticateToken,authorizeRoles(['admin','member']),getCropRotationById);
router.post('/', validateCropRotation,authenticateToken, authorizeRoles(['admin','member']),addCropRotation);
router.put('/:id', validateCropRotation,authenticateToken,authorizeRoles(['admin','member']), updateCropRotation);
router.delete('/:id',validateCropRotationID,authenticateToken,authorizeRoles(['admin','member']), deleteCropRotation);

module.exports = router;