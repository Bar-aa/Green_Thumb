const { body, param, validationResult } = require('express-validator');
const { getCropById } = require('../Persistence/CropsConfig');
const { checkPlotIdExists } = require('../Validation/plotValidator');

 
const validateCrop = [
    body('plot_id').isInt().withMessage('Plot ID must be an integer').custom( async (value, { req }) => {
        const plotExists = await checkPlotIdExists (value,req.res); 
        if (!plotExists) {
            throw new Error('Plot ID does not exist in the database');
        }
        return true;
    }),
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
    param('cropID').isInt().withMessage('Crop ID must be an integer').custom( async (value, { req }) => {
        const cropExists = await checkCropIdExists (value,req.res); 
        if (!cropExists) {
            throw new Error('Crop ID does not exist in the database');
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


const checkCropIdExists = async (id) => {
    try {
        const result = await getCropById(id);
        return result!=null;
    } catch (err) {
        console.error(err);
        return false;
    }
};



module.exports = {
    validateCrop,
    validateCropID,
    checkCropIdExists
};
