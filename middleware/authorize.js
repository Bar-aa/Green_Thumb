
const authorizeAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(403).json({ message: 'Access denied: No user' });
    }
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied: Not an admin' });
    }
    next();
};

const authorizemember = (req, res, next) => {
    if (!req.user) {
        return res.status(403).json({ message: 'Access denied: No user' });
    }
    if (req.user.role !== 'member') {
        return res.status(403).json({ message: 'Access denied: Not a member' });
    }
    next();
};

const authorizeVolunter = (req, res, next) => {
    if (!req.user) {
        return res.status(403).json({ message: 'Access denied: No user' });
    }
    if (req.user.role !== 'volunteer') {
        return res.status(403).json({ message: 'Access denied: Not a volunteer' });
    }
    next();
};

const authorizeParteners = (req, res, next) => {
    if (!req.user) {
        return res.status(403).json({ message: 'Access denied: No user' });
    }
    if (req.user.role !== 'partners') {
        return res.status(403).json({ message: 'Access denied: Not a partner' });
    }
    next();
};

module.exports = {
    authorizeAdmin,
    authorizemember,
    authorizeVolunter,
    authorizeParteners
};
