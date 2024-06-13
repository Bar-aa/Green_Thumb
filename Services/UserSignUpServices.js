const createUserPersistence = require('../Persistence/UserSignUpPersistence');

const createUser = async (req, res) => {
    const userData = req.body;
    try {
        const result = await createUserPersistence.createUser(userData);
        res.status(201).json({ message: 'User created successfully', userId: result.insertId });
    } catch (error) {
        console.error(error);
        if (error.message === 'Username or email already exists') {
            res.status(409).json({ message: 'Username or email already exists' });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = {
    createUser,
};