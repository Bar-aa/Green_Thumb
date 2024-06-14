const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    getUserById,
    getUsersByName,
    createUser,
    updateUser,
    deleteUser
} = require('../Services/user');

const {   
    validateUserID,
    validateUserCreation,
    validateUserUpdate   
} = require('../Validation/userValidation');
const { authenticateToken} = require('../middleware/authenticateToken');
const { authorizeRoles} = require('../middleware/authorize');
router.get('/', authenticateToken,authorizeRoles(['admin']),getAllUsers);
router.get('/:user_id', validateUserID,authenticateToken,getUserById);
router.get('/name/:name',authenticateToken,authorizeRoles(['admin']), getUsersByName);
router.post('/', validateUserCreation,authenticateToken,authorizeRoles(['admin']), createUser);
router.put('/:id', validateUserID, validateUserUpdate,authenticateToken,updateUser);
router.delete('/:id', validateUserID,authenticateToken,authorizeRoles(['admin']), deleteUser);


module.exports = router;
