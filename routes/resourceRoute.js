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
const { authorizeRoles} = require('../middleware/authorize');
router.get('/', getAllResources); // Move '/show' route above '/:owner_id'
router.get('/:owner_id' ,validateOwnerId,authenticateToken,getResourcesByOwnerId);
router.delete('/:id', validateResourceId, authenticateToken,authorizeRoles(['admin']),deleteResource);
router.put('/:id', validateResourceId, validateResource,authenticateToken,updateResource );
router.get('/type/:type',validateResourceType,authenticateToken,getResourceByType);
router.post('/',validateResource,authenticateToken,addResourceToDatabase);



module.exports = router;

