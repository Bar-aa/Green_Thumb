const express = require('express');
const router = express.Router();

const {
    createUser
} = require('../Services/UserSignUpServices');
module.exports = {
    userValidationRules
}=require('../Validation/UserSignUpValidation');

router.post('/', userValidationRules,createUser);


module.exports = router;