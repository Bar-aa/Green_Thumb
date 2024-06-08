const { body, param, validationResult } = require('express-validator');

const validateVolunteer = [
    body('user_id').isInt().withMessage('User ID must be an integer'),
    body('garden_id').isInt().withMessage('Garden ID must be an integer'),
    body('event_date').isISO8601().toDate().withMessage('Event date must be a valid date'),
    body('role').isString().withMessage('Role must be a string'),
    body('email').isEmail().withMessage('Email must be a valid email address'),
    body('name').isString().withMessage('Name must be a string'),
    body('phone_number').matches(/^[0-9]+$/).withMessage('Phone number must contain only digits'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateVolunteerID = [
    param('id').isInt().withMessage('Volunteer ID must be an integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateVolunteerName = [
    param('name').isString().withMessage('Name must be a string'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];


const validateVolunteerDate = [
    param('Date').isISO8601().toDate().withMessage('Date must be a valid ISO 8601 date'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    validateVolunteerName,
    validateVolunteer,
    validateVolunteerID,
    validateVolunteerDate
};
