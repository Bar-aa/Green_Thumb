const express = require("express");
const { getResourcesByOwnerId,
    getAllResources,
    getResourceByType,
    updateResource,
    deleteResource,
    addResourceToDatabase

 } = require("../Services/resource");
 const {
    validateResourceId,
    validateResource,
    validateResourceType,
    validateOwnerId
} = require('../Validation/Resourcevalidation');
const router = express.Router();
//const resource = require('../Services/resource');

router.get('/show', getAllResources); // Move '/show' route above '/:owner_id'
router.get('/idowner/:owner_id' ,validateOwnerId,getResourcesByOwnerId);
router.delete('/delete/:id', validateResourceId, deleteResource);
router.put('/update/:id', validateResourceId, validateResource,updateResource );
router.get('/type/:type',validateResourceType, getResourceByType);
router.post('/add',validateResource,addResourceToDatabase);



module.exports = router;

