const express=require("express");
const router=express.Router();
const {getVolunteersByName,
    getVolunteersByEventDate,
    getAllVolunteers,
    getVolunteerById,
    addNewVolunteer,
    updateVolunteer,
    deleteVolunteer} = require('../Services/Volunteer');
router.get('/name/:Name', getVolunteersByName);
router.get('/date/:Date', getVolunteersByEventDate);
router.get('/', getAllVolunteers);
router.get('/:id', getVolunteerById);
router.post('/', addNewVolunteer);
router.put('/:id', updateVolunteer);
router.delete('/:id', deleteVolunteer);




module.exports=router;

