const express = require('express');
const router = express.Router();
const {
    getUserById
} = require('../Services/user');

const {   
    validateUserID
    
    
} = require('../Validation/userValidation');

router.get('/:user_id',validateUserID, getUserById);

module.exports = router;
