const express = require("express");
const router = express.Router();
const resource = require('../Services/resource');

router.get('/show', resource.showresorce); // Move '/show' route above '/:owner_id'
router.get('/idowner/:owner_id', resource.getresource);
router.post('/add', resource.addResource);
router.delete('/delete/:id', resource.deleteresource);
router.put('/update/:id', resource.updateresource);
router.get('/type/:type', resource.getResourceByType);



module.exports = router;


