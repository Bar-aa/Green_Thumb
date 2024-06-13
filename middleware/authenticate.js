const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401); 

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;




const authenticate = (req, res, next) => {
    if (req.isAuthenticated && !req.isAuthenticated()) {
        return res.status(401).send('Unauthorized');
    }
    next();
};

module.exports = authenticate;


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









module.exports = { authenticateJWT, JWT_SECRET_KEY };