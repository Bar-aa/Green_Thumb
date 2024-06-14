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
const {authorizeRoles} = require('../middleware/authorize');


router.get('/name/:name', validateVolunteerName, authenticateToken,authorizeRoles(['admin','volunteer']), getVolunteersByName);
router.get('/date/:Date', validateVolunteerDate, authenticateToken,authorizeRoles(['admin','volunteer']), getVolunteersByEventDate);
router.get('/', authenticateToken,  authorizeRoles(['admin','volunteer']), getAllVolunteers);
router.get('/:id', validateVolunteerID, authenticateToken,authorizeRoles(['admin','volunteer']), getVolunteerById);
router.post('/', validateVolunteer, authenticateToken,authorizeRoles(['admin']), addNewVolunteer);
router.put('/:id', validateVolunteerID,validateVolunteer, authenticateToken,authorizeRoles(['admin']), updateVolunteer);
router.delete('/:id', validateVolunteerID, authenticateToken,authorizeRoles(['admin']), deleteVolunteer);

module.exports = router;
