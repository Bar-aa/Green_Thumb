
const authenticate = (req, res, next) => {
    if (req.isAuthenticated && !req.isAuthenticated()) {
        return res.status(401).send('Unauthorized');
    }
    next();
};

module.exports = authenticate;
