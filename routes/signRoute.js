
const express = require('express');
const router = express.Router();
const { loginUser } = require('../Services/UserSignInServices');
const { logoutUser} = require('../Services/logout');
const { loginValidationRules } = require('../Validation/SignInValidation');
const { createUser} = require('../Services/UserSignUpServices');
const  { userValidationRules}=require('../Validation/UserSignUpValidation');
const { authenticateToken} = require('../middleware/authenticateToken');

const { authorizeAdmin ,authorizemember,authorizeVolunter,authorizeParteners} = require('../middleware/authorize');
router.post('/signin', loginValidationRules ,loginUser);
router.post('/SignUp', userValidationRules,createUser);
router.post('/logout',authenticateToken,authorizeAdmin ,authorizemember,authorizeVolunter,authorizeParteners,logoutUser);
module.exports = router;
