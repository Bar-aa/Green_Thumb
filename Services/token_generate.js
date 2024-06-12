const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign({
        userId: user.id,
        username: user.username,
        email: user.email,
        role: user.role
    }, 'your_secret_key_here', { expiresIn: '1h' }); // Adjust expiration time as needed
};

module.exports = {
    generateToken
};
