
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

// Define routes
router.get('/ShowPartner', showPartners); 
router.get('/:partnerId', validatePartnershipId, getPartnerDetailsById); 
router.get('/name/:Name',validatePartnershipName , getPartnersByName); 
router.post('/addnew', validatePartnershipCreation, addPartnership);
router.put('/:partnership_id', validatePartnershipUpdate, updatePartnership);
router.delete('/:partnership_id', validatePartnershipDelete, deletePartner);

module.exports = router;
