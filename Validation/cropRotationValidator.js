const { body, param, validationResult } = require('express-validator');
const { checkPlotIdExists } = require('../Validation/plotValidator');
const { checkCropIdExists } = require('../Validation/cropValidator');
const { getCropById } = require('../Persistence/CropsPlaningPersistence');
const validateCropRotation = [
    body('plot_id')
        .isInt().withMessage('Plot ID must be an integer')
        .custom(async (value, { req }) => {
            const plotExists = await checkPlotIdExists(value, req.res);
            if (!plotExists) {
                throw new Error('Plot ID does not exist in the database');
            }
            return true;
        }),
    body('current_crop_id').isInt().withMessage('Current Crop ID must be an integer').custom(async (value, { req }) => {
        const cropExists = await checkCropIdExists(value, req.res);
        if (!cropExists) {
            throw new Error('Crop ID does not exist in the database');
        }
        return true;
    }),
    body('previous_crop_id').isInt().withMessage('Previous Crop ID must be an integer').custom(async (value, { req }) => {
        const cropExists = await checkCropIdExists(value, req.res);
        if (!cropExists) {
            throw new Error('Crop ID does not exist in the database');
        }
        return true;
    }),
    body('rotation_date').isISO8601().toDate().withMessage('Rotation date must be a valid date'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateCropRotationID = [
    param('id').isInt().withMessage('Crop rotation ID must be an integer').custom(async (value, { req }) => {
        const CropRotationExists = await checkCropRotationIdExists(value);
        if (!CropRotationExists) {
            throw new Error('Crop Rotation ID does not exist in the database');
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

const checkCropRotationIdExists = async (id) => {
    try {
        const result = await getCropById(id);
        return result != null;
    } catch (err) {
        console.error(err);
        return false;
    }
};

module.exports = {
    validateCropRotation,
    validateCropRotationID
};
