
const { getPlotById } = require('../Persistence/plotPersistence');
const { body, param, validationResult } = require('express-validator');

const { checkGardenIdExists } = require('../Validation/gardenValidator'); // Importing the function to check if the garden ID exists

const validatePlot = [
    body('garden_id')
        .isInt()
        .withMessage('Garden ID must be an integer')
        .custom(async (value) => {
            const gardenExists = await checkGardenIdExists(value);
            if (!gardenExists) {
                throw new Error('Garden ID does not exist in the database');
            }
            return true;
        }),
    body('user_id')
        .isInt()
        .withMessage('User ID must be an integer'),
    body('plot_number')
        .isInt({ min: 1 })
        .withMessage('Plot number must be a positive integer'),
    body('size')
        .custom((value, { req }) => {
            // Check if size matches the expected format
            const sizeRegex = /^\d+\*\d+$/; // Matches pattern like "12*8"
            if (!sizeRegex.test(value)) {
                throw new Error('Size must be in the format "width*height"');
            }

            // Extract width and height
            const [width, height] = value.split('*').map(Number);

            // Check if width and height are positive numbers
            if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
                throw new Error('Width and height must be positive numbers');
            }

            // Validation passed
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
