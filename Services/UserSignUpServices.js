const createUserPersistence = require('../Persistence/UserSignUpPersistence');
const roleHandlers = require('../Services/roleHandlers');

const createUser = async (req, res) => {
    const userData = req.body;
    try {
        const result = await createUserPersistence.createUser(userData);
        const userId = result.insertId;
        if (userData.role && roleHandlers[userData.role]) {
            const handlerResult = await roleHandlers[userData.role](userId, userData);
            res.status(201).json({ message: 'User created successfully', userId });
        } else {
            res.status(201).json({ message: 'User created successfully', userId });
        }
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
