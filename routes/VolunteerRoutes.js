const express=require("express");
const router=express.Router();
const {getVolunteersByName,getVolunteersByEventDate,getAllVolunteers,getVolunteerById,addNewVlounteer,updateVolunteer,deletevolunteer} = require('../controllers/Volunteer');
router.get('/name/:Name', getVolunteersByName);
router.get('/date/:Date', getVolunteersByEventDate);
router.get('/', getAllVolunteers);
router.get('/:id', getVolunteerById);
router.post('/', addNewVlounteer);
router.put('/:id', updateVolunteer);
router.delete('/:id', deletevolunteer);




module.exports=router;

