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
const { authorizeAdmin } = require('../middleware/authorize');

router.get('/name/:name', validateVolunteerName, authenticateToken, authorizeAdmin, getVolunteersByName);
router.get('/date/:Date', validateVolunteerDate, authenticateToken, authorizeAdmin, getVolunteersByEventDate);
router.get('/', authenticateToken, authorizeAdmin, getAllVolunteers);
router.get('/:id', validateVolunteerID, authenticateToken, authorizeAdmin, getVolunteerById);
router.post('/', validateVolunteer, authenticateToken, authorizeAdmin, addNewVolunteer);
router.put('/:id', validateVolunteerID, authenticateToken, authorizeAdmin, validateVolunteer, updateVolunteer);
router.delete('/:id', validateVolunteerID, authenticateToken, authorizeAdmin, deleteVolunteer);

module.exports = router;
