/*const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    console.log(token);     

    if (!token) {
        return res.status(401).json({ message: 'Access token required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (error) {
        console.error(error);
        res.status(403).json({ message: 'Invalid token' });
    }
};

const authorizeAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};

module.exports = {
    authenticateToken,
    authorizeAdmin,
};*/
// tokenMiddleware.js

/*const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
console.log(authHeader);
    if (!authHeader) {
        return res.status(401).json({ message: 'Access token required' });
    }

    const token = authHeader.split(' ')[1]; // Assuming token is directly provided without "Bearer"

    if (!token) {
        return res.status(401).json({ message: 'Access token required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded user information to the request object
        next();
    } catch (error) {
        console.error(error);
        res.status(403).json({ message: 'Invalid token' });
    }
};

const authorizeAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};

module.exports = {
    authenticateToken,
    authorizeAdmin,
};*/
/*const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = 'my-super-strong-secret'; 
var islog;


const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized. No token provided.' });
    }

    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden. Invalid token.' });
        }

        const sql = 'SELECT token FROM users WHERE token = ? ';
        db.query(sql, [token] ,(error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ error: 'An error occurred while verifying token.' });
            }

            if (results.length === 0) {
                return res.status(403).json({ message: 'You are logged out, please login again' });
            }

            req.user = decoded;
            next();
        });
    });
};











module.exports = { authenticateJWT, JWT_SECRET_KEY };*/






