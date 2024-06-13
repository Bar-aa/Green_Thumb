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
const { authenticateToken} = require('../middleware/authenticateToken');
const { authorizeAdmin ,authorizemember,authorizeVolunter,authorizeParteners} = require('../middleware/authorize');
router.get('/show', getAllResources); // Move '/show' route above '/:owner_id'
router.get('/idowner/:owner_id' ,validateOwnerId,authenticateToken,authorizeAdmin,getResourcesByOwnerId);
router.delete('/delete/:id', validateResourceId, authenticateToken,authorizeAdmin,deleteResource);
router.put('/update/:id', validateResourceId, validateResource,authenticateToken,authorizeAdmin,updateResource );
router.get('/type/:type',validateResourceType,authenticateToken,authorizeAdmin, getResourceByType);
router.post('/add',validateResource,authenticateToken,authorizeAdmin,addResourceToDatabase);



module.exports = router;

