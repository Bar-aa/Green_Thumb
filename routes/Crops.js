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
const { authenticateToken} = require('../middleware/authenticateToken');
const { authorize } = require('../middleware/authorize');
router.get('/',authenticateToken,authorize,getAllCrops);
router.get('/:name',authenticateToken,authorize, getCropByName);
router.post('/',validateCrop,authenticateToken, authorize,addCrop);
router.put('/:cropID', validateCropID, validateCrop,authenticateToken,authorize,updateCrop);
router.delete('/:cropID', validateCropID,authenticateToken,authorize,deleteCrop);

module.exports = router;
