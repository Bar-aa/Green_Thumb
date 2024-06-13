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
const { authorizeAdmin ,authorizemember,authorizeVolunter,authorizeParteners} = require('../middleware/authorize');
router.get('/', authorizeAdmin,authenticateToken,getAllCrops);
router.get('/:name',authorizeAdmin,authenticateToken, getCropByName);
router.post('/',validateCrop, authorizeAdmin,authenticateToken,addCrop);
router.put('/:cropID', validateCropID, validateCrop,authorizeAdmin,authenticateToken, updateCrop);
router.delete('/:cropID', validateCropID,authorizeAdmin,authenticateToken, deleteCrop);

module.exports = router;
