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
router.get('/', getAllUsers);
router.get('/:user_id', validateUserID, getUserById);
router.get('/name/:name', getUsersByName);
router.post('/', validateUserCreation, createUser);
router.put('/:id', validateUserID, validateUserUpdate, updateUser);
router.delete('/:id', validateUserID, deleteUser);


module.exports = router;
