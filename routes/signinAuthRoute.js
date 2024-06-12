// authRoutes.js
const express = require('express');
const router = express.Router();
const { loginValidationRules } = require('../Validation/SignInValidation');
const { loginUser } = require('../Services/UserSignInServices');
const { addToBlacklist } = require('../Services/logout');
const { authenticateToken,authorizeRoles } = require('../middleware/tokenMiddleware');

// Sign In Route
router.post('/signin', loginValidationRules, async (req, res) => {
    const { usernameOrEmail, password } = req.body;
    try {
        const user = await loginUser(usernameOrEmail, password);
        res.status(200).json({ message: 'Login successful', user });
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
    const token = req.header('Authorization')?.split(' ')[1];
    if (token) {
        addToBlacklist(token);
        res.status(200).json({ message: 'Logout successful' });
    } else {
        res.status(400).json({ message: 'No token provided' });
    }
});

// Example of a protected route with role-based access control
router.get('/admin', authenticateToken, authorizeRoles('admin'), (req, res) => {
    res.status(200).json({ message: 'Welcome, admin!' });
});

module.exports = router;
