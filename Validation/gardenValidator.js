const { body, param, validationResult } = require('express-validator');
const { getGardenById } = require('../Persistence/gardenPersistence');

const validateGarden = [
    body('name')
        .isString()
        .withMessage('Name must be a string')
        .isLength({ min: 1, max: 100 })
        .withMessage('Name must be between 1 and 100 characters'),
    body('location')
        .isString()
        .withMessage('Location must be a string')
        .isLength({ min: 1, max: 255 })
        .withMessage('Location must be between 1 and 255 characters'),
    body('sunlight_conditions')
        .isString()
        .withMessage('Sunlight conditions must be a string')
        .isIn(['full sun', 'partial shade', 'full shade'])
        .withMessage('Sunlight conditions must be either "full sun", "partial shade", or "full shade"'),
    body('soil_type')
        .isString()
        .withMessage('Soil type must be a string')
        .isIn(['clay', 'sandy', 'silty', 'peaty', 'chalky', 'loamy'])
        .withMessage('Soil type must be one of "clay", "sandy", "silty", "peaty", "chalky", or "loamy"'),
    body('available_plots')
        .isInt({ min: 0 })
        .withMessage('Available plots must be an integer greater than or equal to 0'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateGardenID = [
    param('id')
        .isInt()
        .withMessage('Garden ID must be an integer')
        .custom(async (value) => {
            const gardenExists = await checkGardenIdExists(value);
            if (!gardenExists) {
                throw new Error('Garden ID does not exist in the database');
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

const checkGardenIdExists = async (id) => {
    try {
        const result = await getGardenById(id);
        return result != null;
    } catch (err) {
        console.error(err);
        return false;
    }
};

module.exports = {
    validateGarden,
    validateGardenID,
    checkGardenIdExists
};
