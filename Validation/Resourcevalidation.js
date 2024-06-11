

const { body, param, validationResult } = require('express-validator');
const { checkUserExists } = require('../Validation/userValidator');
//const { checkgardenIdExists } = require('../Validation/gardenValidator');
const validateResource = [
    body('type').isIn(['tool', 'seed', 'compost', 'produce']).withMessage('Type must be one of: tool, seed, compost, produce'),
    body('description').optional().isString().withMessage('Description must be a string'),
    body('owner_id').optional().isInt().withMessage('Owner ID must be an integer').custom(async (value, { req }) => {
        // Custom validation to check if owner_id exists in the database
        const ownerExists = await checkUserExists(value, req.res);
        if (!ownerExists) {
            throw new Error('Owner ID does not exist in the database');
        }
        return true;
    }),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
const validateResourceId = [
    param('id').isInt().withMessage('Resource ID must be an integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateResourceType = [
    param('type')
        .custom(value => {
            // Check if the type value is one of the allowed enum values
            if (!['tool', 'seed', 'compost', 'produce'].includes(value)) {
                throw new Error('Type must be one of: tool, seed, compost, produce');
            }
            return true;
        }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateOwnerId = [
    param('owner_id').optional().isInt().withMessage('Owner ID must be an integer').custom(async (value, { req }) => {
        // Custom validation to check if owner_id exists in the database
        const ownerExists = await checkUserExists(value, req.res);
        if (!ownerExists) {
            throw new Error('Owner ID does not exist in the database');
        }
        return true;
    }),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
module.exports = {
    validateResourceId,
    validateResource,
    validateResourceType,
    validateOwnerId
};
