const blacklist = new Set();
const addToBlacklist = (token) => {
    blacklist.add(token);
};

const isBlacklisted = (token) => {
    return blacklist.has(token);
};

const logoutUser = (req, res) => {
    const token = req.header('Authorization');
    if (token) {
        addToBlacklist(token);
        res.status(200).json({ message: 'Logout successful' });
    } else {
        res.status(400).json({ message: 'No token provided' });
    }
};

module.exports = {
    logoutUser,
    isBlacklisted,
};
