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
router.delete('/delete/:id', deleteResource);
router.put('/update/:id',updateResource );
router.get('/type/:type', getResourceByType);
router.post('/add',addResourceToDatabase);




module.exports = router;

