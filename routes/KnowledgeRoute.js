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

router.get('/title/:title', validateKnowledgeTitle, getKnowledgeByTitle);
router.get('/', getAllKnowledges);
router.post('/', validateKnowledgeCreation, createKnowledgeItem);
router.put('/:id', validateKnowledgeUpdate, updateKnowledge);
router.delete('/:id', validateKnowledgeId, deleteKnowledge);
router.get('/:id', validateKnowledgeId, getKnowledgeById);

module.exports = router;
