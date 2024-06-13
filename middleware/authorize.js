
const authorizeAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};
const authorizemember = (req, res, next) => {
    if (!req.user || req.user.role !== 'member') {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};
const authorizeVolunter = (req, res, next) => {
    if (!req.user || req.user.role !== 'volunteer') {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};
const authorizeParteners = (req, res, next) => {
    if (!req.user || req.user.role !== 'parteners') {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};
module.exports = {
    authorizeAdmin,
    authorizemember,
    authorizeVolunter,
    authorizeParteners
};