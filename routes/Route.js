const express=require("express");
const router=express.Router();
const resource = require('../controllers/resource');

const { getAllKnowledges, createKnowledgeItem } = require('../controllers/KnowledgeSharing');
router.get('/knowledge', getAllKnowledges);
router.post('/knowledge', createKnowledgeItem);


router.get('/getresources',resource.getresource );
module.exports=router;

