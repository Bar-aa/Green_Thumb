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
const { authorize} = require('../middleware/authorize');

router.get('/',authenticateToken,authorize,getAllCropRotations);
router.get('/:id',validateCropRotationID ,authenticateToken,authorize,getCropRotationById);
router.post('/', validateCropRotation,authenticateToken, authorize,addCropRotation);
router.put('/:id', validateCropRotation,authenticateToken,authorize, updateCropRotation);
router.delete('/:id',validateCropRotationID,authenticateToken,authorize, deleteCropRotation);

module.exports = router;