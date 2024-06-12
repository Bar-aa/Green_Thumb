
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

// Route to verify email
router.get('/verify-email', validateEmail, verifyEmail);

// Route to reset password
router.post('/reset-password', validateResetPassword, resetPassword);


module.exports = router;


