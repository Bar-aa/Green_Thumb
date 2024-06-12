const { check, validationResult } = require('express-validator');

const validateUserID = [
    check('user_id')
        .isInt().withMessage('User ID must be an integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateUserCreation = [
    check('username')
        .notEmpty().withMessage('Username is required')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    check('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    check('email')
        .isEmail().withMessage('Invalid email format'),
    check('firstName')
        .notEmpty().withMessage('First name is required'),
    check('lastName')
        .notEmpty().withMessage('Last name is required'),
    check('role')
        .notEmpty().withMessage('Role is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateUserUpdate = [
    check('username')
        .optional()
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    check('password')
        .optional()
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    check('email')
        .optional()
        .isEmail().withMessage('Invalid email format'),
    check('firstName')
        .optional()
        .notEmpty().withMessage('First name is required'),
    check('lastName')
        .optional()
        .notEmpty().withMessage('Last name is required'),
    check('role')
        .optional()
        .notEmpty().withMessage('Role is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    validateUserID,
    validateUserCreation,
    validateUserUpdate
};
