const jwt = require('jsonwebtoken');
const { isBlacklisted } = require('../Services/logout');
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (isBlacklisted(token)) {
        return res.status(401).json({ message: 'Token revoked' });
    }

    if (!token) {
        return res.status(401).json({ message: 'Access token required' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid token' });
    }
};


module.exports = {
    authenticateToken,
};
