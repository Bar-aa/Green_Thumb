const { body, validationResult } = require('express-validator');

const userValidationRules = [
    body('username')
        .isString()
        .withMessage('Username must be a string')
        .isLength({ min: 1, max: 50 })
        .withMessage('Username must be between 1 and 50 characters long'),
    body('password')
        .isString()
        .withMessage('Password must be a string')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long'),
    body('email')
        .isEmail()
        .withMessage('Must be a valid email address')
        .isLength({ max: 100 })
        .withMessage('Email must be less than 100 characters long')
        .normalizeEmail(),
    body('firstName')
        .optional()
        .isString()
        .withMessage('First name must be a string')
        .isLength({ max: 50 })
        .withMessage('First name must be less than 50 characters long'),
    body('lastName')
        .optional()
        .isString()
        .withMessage('Last name must be a string')
        .isLength({ max: 50 })
        .withMessage('Last name must be less than 50 characters long'),
    body('role')
        .optional()
        .isIn(['admin', 'member', 'author', 'volunteer'])
        .withMessage('Role must be one of admin, member, author, or volunteer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    userValidationRules,
};
