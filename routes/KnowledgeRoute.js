const express=require("express");
const router=express.Router();
const { getAllKnowledges, createKnowledgeItem ,updateKnowledge} = require('../controllers/KnowledgeSharing');
router.get('/', getAllKnowledges);
router.post('/', createKnowledgeItem);
router.put('/:id', updateKnowledge);

module.exports=router;
