
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
const { authorizeAdmin ,authorizemember,authorizeVolunter,authorizeParteners} = require('../middleware/authorize');
// Define routes
router.get('/ShowPartner', authenticateToken,authorizeAdmin,showPartners); 
router.get('/:partnerId', validatePartnershipId,authenticateToken,authorizeAdmin, getPartnerDetailsById); 
router.get('/name/:Name',validatePartnershipName ,authenticateToken,authorizeAdmin, getPartnersByName); 
router.post('/addnew', validatePartnershipCreation,authenticateToken,authorizeAdmin, addPartnership);
router.put('/:partnership_id', validatePartnershipUpdate, authenticateToken,authorizeAdmin,updatePartnership);
router.delete('/:partnership_id', validatePartnershipDelete,authenticateToken,authorizeAdmin, deletePartner);

module.exports = router;
