const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign({
        userId: user.id,
        username: user.username,
        email: user.email,
        role: user.role
    }, process.env.JWT_SECRET, { expiresIn: '1h' }); 
};

module.exports = {
    generateToken
};
