const express = require('express');
const { getUserByUsername } = require('../Persistence/signin');
const authenticate = require('../middleware/authenticate');
const crypto = require('crypto');

const router = express.Router();

router.post('/signin', authenticate, (req, res) => {
    const { username, password } = req.body;

    // Fetch user from the database by username
    getUserByUsername(username, (err, user) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Database error' });
        }
        if (!user) {
            return res.status(401).json({ message: 'Invalid username' });
        }

        // Hash input password and compare with stored password
        const hashedInputPassword = crypto.createHash('sha1').update(password).digest('hex');
        if (hashedInputPassword !== user.sha1_password) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Authentication successful
        res.status(200).json({ message: 'Sign in successful' });
    });
});

module.exports = router;
