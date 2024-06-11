const { body, validationResult } = require('express-validator');

const loginValidationRules = [
    body('usernameOrEmail')
        .isString()
        .withMessage('Username or Email must be a string')
        .isLength({ min: 1 })
        .withMessage('Username or Email is required'),
    body('password')
        .isString()
        .withMessage('Password must be a string')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    loginValidationRules,
};
