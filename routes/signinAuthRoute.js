// authRoutes.js

const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeAdmin } = require('../middleware/tokenMiddleware');
const { loginUser } = require('../Services/UserSignInServices');
const { addToBlacklist } = require('../Services/logout');
const { loginValidationRules } = require('../Validation/SignInValidation');
const { generateToken } = require('../Services/token_generate');



// Sign In Route
router.post('/signin', loginValidationRules, async (req, res) => {
    const { usernameOrEmail, password } = req.body;
    try {
        const user = await loginUser(usernameOrEmail, password);
        const token = generateToken(user); // Assuming generateToken function is correctly implemented
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        if (error.message === 'User not found' || error.message === 'Invalid password') {
            res.status(401).json({ message: 'Invalid credentials' });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
});

// Logout Route
router.post('/logout', authenticateToken, (req, res) => {
    const token = req.header('Authorization').split(' ')[1];
    if (token) {
        addToBlacklist(token);
        res.status(200).json({ message: 'Logout successful' });
    } else {
        res.status(400).json({ message: 'No token provided' });
    }
});

// Example of a protected route with role-based access control
router.get('/admin', authenticateToken, authorizeAdmin, (req, res) => {
    res.status(200).json({ message: 'Welcome, admin!' });
});

module.exports = router;
