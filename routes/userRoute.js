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
const { authorizeAdmin ,authorizemember,authorizeVolunter,authorizeParteners} = require('../middleware/authorize');
router.get('/', getAllUsers);
router.get('/:user_id', validateUserID,authorizeAdmin,authenticateToken,getUserById);
router.get('/name/:name',authorizeAdmin,authenticateToken, getUsersByName);
router.post('/', validateUserCreation,authorizeAdmin,authenticateToken, createUser);
router.put('/:id', validateUserID, validateUserUpdate,authorizeAdmin,authenticateToken,updateUser);
router.delete('/:id', validateUserID,authorizeAdmin,authenticateToken,deleteUser);


module.exports = router;
