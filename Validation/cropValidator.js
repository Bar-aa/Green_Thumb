const { body, param, validationResult } = require('express-validator');

const validateCrop = [
    body('plot_id').isInt().withMessage('Plot ID must be an integer'),
    body('name').isString().withMessage('Name must be a string'),
    body('planting_date').isISO8601().toDate().withMessage('Planting date must be a valid date'),
    body('expected_harvest_date').isISO8601().toDate().withMessage('Expected harvest date must be a valid date'),
    body('previous_crop').isString().optional().withMessage('Previous crop must be a string'),
    body('activity').isString().optional().withMessage('Activity must be a string'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateCropID = [
    param('cropID').isInt().withMessage('Crop ID must be an integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    validateCrop,
    validateCropID
};
