const userPersistence = require('../Persistence/userPersistence');
const getUserById = async (req, res) => {
    const { user_id } = req.params;
    try {
        const result = await userPersistence.getUserById(user_id);
        if (result.length === 0) {
            return res.status(404).json({ message: 'user not found' });
        }
        res.json(result[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getUserById
};