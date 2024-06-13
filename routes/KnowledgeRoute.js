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
const { authenticateToken} = require('../middleware/authenticateToken');
const { authorizeAdmin ,authorizemember,authorizeVolunter,authorizeParteners} = require('../middleware/authorize');
router.get('/title/:title', validateKnowledgeTitle,authenticateToken, authorizeAdmin,getKnowledgeByTitle);
router.get('/', authenticateToken, authorizeAdmin,getAllKnowledges);
router.post('/', validateKnowledgeCreation, authenticateToken, authorizeAdmin,createKnowledgeItem);
router.put('/:id', validateKnowledgeUpdate,authenticateToken, authorizeAdmin, updateKnowledge);
router.delete('/:id', validateKnowledgeId,authenticateToken, authorizeAdmin, deleteKnowledge);
router.get('/:id', validateKnowledgeId,authenticateToken, authorizeAdmin, getKnowledgeById);

module.exports = router;
