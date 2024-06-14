
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
// Route to verify email
router.get('/verify-email',authenticateToken, validateEmail, verifyEmail);
router.post('/reset-password',authenticateToken,validateResetPassword, resetPassword);


module.exports = router;


