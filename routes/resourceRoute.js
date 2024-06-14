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


const { authenticateToken} = require('../middleware/authenticateToken');
router.get('/',authenticateToken, getAllResources);
router.get('/:owner_id' ,validateOwnerId,authenticateToken,getResourcesByOwnerId);
router.delete('/:id', validateResourceId, authenticateToken,deleteResource);
router.put('/:id', validateResourceId, validateResource,authenticateToken,updateResource );
router.get('/type/:type',validateResourceType,authenticateToken,getResourceByType);
router.post('/',validateResource,authenticateToken,addResourceToDatabase);




module.exports = router;

