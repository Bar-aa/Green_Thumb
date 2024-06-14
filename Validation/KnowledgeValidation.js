const { body, param, validationResult } = require('express-validator');
const { checkAuthorIdExists } = require('../Validation/authorValidator');

const validateKnowledgeId = [
    param('id').isInt().withMessage('ID must be an integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateKnowledgeTitle = [
    param('title').isString().withMessage('Title must be a string'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateKnowledgeCreation = [
    body('title').isString().withMessage('Title must be a string'),
    body('content').isString().withMessage('Content must be a string'),
    body('author_id').isInt().withMessage('Author ID must be an integer').custom(async (value, { req }) => {
        const authorExists = await checkAuthorIdExists(value, req.res);
        if (!authorExists) {
            throw new Error('Author ID does not exist in the database');
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

const validateKnowledgeUpdate = [
    param('id').isInt().withMessage('ID must be an integer'),
    body('title').isString().withMessage('Title must be a string'),
    body('content').isString().withMessage('Content must be a string'),
    body('author_id').isInt().withMessage('Author ID must be an integer').custom(async (value, { req }) => {
        const authorExists = await checkAuthorIdExists(value, req.res);
        if (!authorExists) {
            throw new Error('Author ID does not exist in the database');
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
    validateKnowledgeId,
    validateKnowledgeTitle,
    validateKnowledgeCreation,
    validateKnowledgeUpdate
};
