const { body, param, validationResult } = require('express-validator');

/*const validatePartnershipId = [
    param('partnership_id').isInt().withMessage('Partnership ID must be an integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];*/
const validatePartnershipId = [
    param('partnerId').isInt().withMessage('Partner ID must be an integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
const validatePartnershipDelete = [
    param('partnership_id')
        .notEmpty()
        .withMessage('Partnership ID parameter is required')
        .isNumeric()
        .withMessage('Partnership ID must be a number'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];


const validatePartnershipCreation = [
    body('name').isString().withMessage('Name must be a string'),
    body('description').optional().isString().withMessage('Description must be a string'),
    body('contact_info').optional().isString().withMessage('Contact info must be a string'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validatePartnershipUpdate = [
    param('partnership_id').isInt().withMessage('Partnership ID must be an integer'),
    body('name').isString().withMessage('Name must be a string'),
    body('description').optional().isString().withMessage('Description must be a string'),
    body('contact_info').optional().isString().withMessage('Contact info must be a string'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
const validatePartnershipName = [
    param('Name').isString().withMessage('Name must be a string'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    validatePartnershipId,
    validatePartnershipName,
    validatePartnershipCreation,
    validatePartnershipUpdate,
    validatePartnershipDelete
};
