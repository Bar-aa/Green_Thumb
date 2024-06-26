
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
const { authenticateToken } = require('../middleware/authenticateToken');
const { authorizeRoles } = require('../middleware/authorize');
const {
    validateUserID
} = require('../Validation/userValidation');
// Define routes

router.get('/', authenticateToken,showPartners); 
router.get('/:partnerId', validatePartnershipId,authenticateToken, getPartnerDetailsById); 
router.get('/name/:Name',validatePartnershipName ,authenticateToken, getPartnersByName); 
router.post('/', validatePartnershipCreation,authenticateToken,authorizeRoles(['admin']), validateUserID,addPartnership);
router.put('/:partnership_id', validatePartnershipUpdate, authenticateToken,authorizeRoles(['admin','partner']),updatePartnership);
router.delete('/:partnership_id', validatePartnershipDelete,authenticateToken,authorizeRoles(['admin','partner']), deletePartner);


module.exports = router;
