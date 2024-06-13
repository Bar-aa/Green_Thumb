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
} = require('../Services/Volunteer'); // Ensure the correct path

const {
    validateVolunteerName,
    validateVolunteer,
    validateVolunteerID,
    validateVolunteerDate
} = require('../Validation/VolunteerValidation');
const { authenticateToken} = require('../middleware/authenticateToken');
const {authorize} = require('../middleware/authorize');

router.get('/name/:name', validateVolunteerName, authenticateToken, authorize,getVolunteersByName);
router.get('/date/:Date', validateVolunteerDate, authenticateToken,authorize, getVolunteersByEventDate);
router.get('/', authenticateToken, authorize, getAllVolunteers);
router.get('/:id', validateVolunteerID, authenticateToken, authorize, getVolunteerById);
router.post('/', validateVolunteer, authenticateToken, authorize, addNewVolunteer);
router.put('/:id', validateVolunteerID,validateVolunteer, authenticateToken, authorize, updateVolunteer);
router.delete('/:id', validateVolunteerID, authenticateToken, authorize, deleteVolunteer);

module.exports = router;
