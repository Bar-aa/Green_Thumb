const express = require('express');
const router = express.Router();
const {
    getVolunteersByName,
    getVolunteersByEventDate,
    getAllVolunteers,
    getVolunteerById,
    addNewVolunteer,
    updateVolunteer,
    deleteVolunteer
} = require('../Services/Volunteer');

const {
    validateVolunteerName,
    validateVolunteer,
    validateVolunteerID,
    validateVolunteerDate
} = require('../Validation/VolunteerValidation');

router.get('/name/:name', validateVolunteerName, getVolunteersByName);
router.get('/date/:Date', validateVolunteerDate, getVolunteersByEventDate);
router.get('/', getAllVolunteers);
router.get('/:id', validateVolunteerID, getVolunteerById);
router.post('/', validateVolunteer, addNewVolunteer);
router.put('/:id', validateVolunteerID, validateVolunteer, updateVolunteer);
router.delete('/:id', validateVolunteerID, deleteVolunteer);

module.exports = router;
