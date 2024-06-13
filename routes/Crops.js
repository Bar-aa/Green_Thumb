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
const { authorizeRoles } = require('../middleware/authorize');

router.get('/',authenticateToken,authorizeRoles(['admin']),getAllCrops);
router.get('/:name',authenticateToken,authorizeRoles(['admin']), getCropByName);
router.post('/',validateCrop,authenticateToken,authorizeRoles(['admin','member']),addCrop);
router.put('/:cropID', validateCropID, validateCrop,authenticateToken,authorizeRoles(['admin','member']),updateCrop);
router.delete('/:cropID', validateCropID,authenticateToken,authorizeRoles(['admin','member']),deleteCrop);

module.exports = router;
