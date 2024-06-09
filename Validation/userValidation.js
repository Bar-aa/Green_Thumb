const { body, param, validationResult } = require('express-validator');
const { checkUserExists } = require('../Validation/userValidator');



const validateUserID = [
    param('user_id').isInt().withMessage('User ID must be an integer').custom(async (value, { req }) => {
        const userExists = await checkUserExists(value, req.res); 
        if (!userExists) {
            throw new Error('User ID does not exist in the database');
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

module.exports = {
    validateUserID
};
