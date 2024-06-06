const express=require("express");
const router=express.Router();
const { getKnowledgeByTitle,getAllKnowledges, createKnowledgeItem, updateKnowledge, deleteKnowledge,getKnowledgeById} = require('../controllers/KnowledgeSharing');
router.get('/title/:title', getKnowledgeByTitle); 
router.get('/', getAllKnowledges);
router.post('/', createKnowledgeItem);
router.put('/:id', updateKnowledge);
router.delete('/:id', deleteKnowledge);
router.get('/:id', getKnowledgeById);




module.exports=router;
