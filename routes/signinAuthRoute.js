const express = require('express');
const router = express.Router();
const { loginValidationRules } = require('../Validation/SignInValidation');
const { loginUser } = require('../Services/UserSignInServices');

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

module.exports = router;
