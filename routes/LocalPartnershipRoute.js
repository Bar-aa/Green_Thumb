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

router.get('/ShowPartner', showPartners); 
router.get('/:partnerId', getPartnerDetailsById); 
router.get('/name/:Name',getPartnersByName); 
router.post('/addnew',addPartnership);
router.put('/:partnership_id',updatePartnership);
router.delete('/:partnership_id', deletePartner);
module.exports = router;