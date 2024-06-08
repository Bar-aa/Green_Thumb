const express = require("express");
const { getResourcesByOwnerId,
    getAllResources,
    getResourceByType,
    updateResource,
    deleteResource,
    addResourceToDatabase

 } = require("../Services/resource");

const router = express.Router();
//const resource = require('../Services/resource');

router.get('/show', getAllResources); // Move '/show' route above '/:owner_id'
router.get('/idowner/:owner_id', getResourcesByOwnerId);
router.post('/add',addResourceToDatabase);
router.delete('/delete/:id', deleteResource);
router.put('/update/:id',updateResource );
router.get('/type/:type', getResourceByType);



module.exports = router;


