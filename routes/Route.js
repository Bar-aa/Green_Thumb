const express=require("express");
const router=express.Router();
const resource = require('../controllers/resource');
router.get('/getresources',resource.getresource );
router.get('/showallresorce',resource.showresorce );
module.exports=router;

