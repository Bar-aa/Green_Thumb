
const express = require('express');
const router = express.Router();
const { 
    verifyEmail,
     resetPassword,
     sendPasswordResetEmail
} = require('../Services/verifictionEmailService');
const {
    validateResetPassword,
    validateEmail,
    
} = require('../Validation/EmailValidation');
const { authenticateToken} = require('../middleware/authenticateToken');
const { authorizeAdmin ,authorizemember,authorizeVolunter,authorizeParteners} = require('../middleware/authorize');
// Route to verify email
router.get('/verify-email',authenticateToken,authorizeAdmin ,authorizemember,authorizeVolunter,authorizeParteners, validateEmail, verifyEmail);

// Route to reset password
router.post('/reset-password',authenticateToken,authorizeAdmin ,authorizemember,authorizeVolunter,authorizeParteners ,validateResetPassword, resetPassword);


module.exports = router;


