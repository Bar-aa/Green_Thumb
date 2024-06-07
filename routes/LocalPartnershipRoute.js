const express = require("express");
const router = express.Router();
const LocalPartnership = require('../controllers/LocalPartnership');

router.get('/ShowPartner', LocalPartnership.showPartners); 
router.get('/:partnerId', LocalPartnership.getPartnerDetailsbyId); 
router.get('/name/:Name', LocalPartnership.getParternsByName); 
router.post('/addnew', LocalPartnership.addPartnership);
router.put('/:partnership_id', LocalPartnership.UpdatePartnership);
router.delete('/:partnership_id', LocalPartnership.deletePartner);
module.exports = router;