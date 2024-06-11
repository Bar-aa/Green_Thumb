const express = require('express');
const { getUserByUsername } = require('../Persistence/signin');
const authenticate = require('../middleware/authenticate');
const crypto = require('crypto');

const router = express.Router();

router.post('/signin', authenticate, (req, res) => {
    const { username, password } = req.body;

    getUserByUsername(username, (err, user) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Database error' });
        }
        if (!user) {
            return res.status(401).json({ message: 'Invalid username' });
        }

        const hashedInputPassword = crypto.createHash('sha1').update(password).digest('hex');
        if (hashedInputPassword !== user.sha1_password) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        res.status(200).json({ message: 'Sign in successful' });
    });
});

module.exports = router;
