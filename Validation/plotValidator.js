
const { getPlotById } = require('../Persistence/plotPersistence');
const { body, param, validationResult } = require('express-validator');

const validatePlot = [
    body('garden_id')
        .isInt()
        .withMessage('Garden ID must be an integer'),
    body('user_id')
        .isInt()
        .withMessage('User ID must be an integer'),
    body('plot_number')
        .isString()
        .withMessage('Plot number must be a string'),
    body('size')
        .isFloat({ min: 0 })
        .withMessage('Size must be a positive number'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validatePlotID = [
    param('id')
        .isInt()
        .withMessage('Plot ID must be an integer')
        .custom(async (value) => {
            const plotExists = await checkPlotIdExists(value);
            if (!plotExists) {
                throw new Error('Plot ID does not exist in the database');
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

const checkPlotIdExists = async (id) => {
    try {
        const result = await getPlotById(id);
        return result.length !== 0;
    } catch (err) {
        console.error(err);
        return false;
    }
};

module.exports = {
    validatePlot,
    validatePlotID,
    checkPlotIdExists
};
