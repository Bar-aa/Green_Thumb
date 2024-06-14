const express = require('express');
const router = express.Router();
const {
    getKnowledgeByTitle,
    getAllKnowledges,
    createKnowledgeItem,
    updateKnowledge,
    deleteKnowledge,
    getKnowledgeById
} = require('../Services/KnowledgeSharing');
const {
    validateKnowledgeId,
    validateKnowledgeTitle,
    validateKnowledgeCreation,
    validateKnowledgeUpdate
} = require('../Validation/KnowledgeValidation');
const { authenticateToken } = require('../middleware/authenticateToken');
const { authorizeRoles } = require('../middleware/authorize');
router.get('/title/:title', validateKnowledgeTitle, authenticateToken, getKnowledgeByTitle);
router.get('/', authenticateToken, getAllKnowledges);
router.post('/', validateKnowledgeCreation, authenticateToken, authorizeRoles(['admin', 'author']), createKnowledgeItem);
router.put('/:id', validateKnowledgeUpdate, authenticateToken, authorizeRoles(['admin', 'author']), updateKnowledge);
router.delete('/:id', validateKnowledgeId, authenticateToken, authorizeRoles(['admin', 'author']), deleteKnowledge);
router.get('/:id', validateKnowledgeId, authenticateToken, getKnowledgeById);

module.exports = router;
