
const express = require("express");
const router = express.Router();
const {
    showPartners,
    getPartnerDetailsById,
    getPartnersByName,
    addPartnership,
    updatePartnership,
    deletePartner
} = require('../Services/LocalPartnership');
const {
    validatePartnershipId,
    validatePartnershipName,
    validatePartnershipCreation,
    validatePartnershipUpdate,
    validatePartnershipDelete
} = require('../Validation/partnersvalidation');
const { authenticateToken} = require('../middleware/authenticateToken');
const { authorizeRoles} = require('../middleware/authorize');
const {   
    validateUserID
} = require('../Validation/userValidation');
// Define routes
router.get('/', authenticateToken,showPartners); 
router.get('/:partnerId', validatePartnershipId,authenticateToken, getPartnerDetailsById); 
router.get('/:Name',validatePartnershipName ,authenticateToken, getPartnersByName); 
router.post('/', validatePartnershipCreation,authenticateToken,authorizeRoles(['admin']), addPartnership,validateUserID);
router.put('/:partnership_id', validatePartnershipUpdate, authenticateToken,authorizeRoles(['admin','parteners']),updatePartnership,validateUserID);
router.delete('/:partnership_id', validatePartnershipDelete,authenticateToken,authorizeRoles(['admin']), deletePartner);

module.exports = router;
