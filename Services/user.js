const userPersistence = require('../Persistence/userPersistence');
const { checkDuplicates } = require('../Persistence/UserSignUpPersistence');
const { checkUserExists } = require('../Validation/userValidator');
const bcrypt = require('bcryptjs');


const getAllUsers = async (req, res) => {
    try {
        const results = await userPersistence.getAllUsers();
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getUserById = async (req, res) => {
    const { user_id } = req.params;
    try {
        const result = await userPersistence.getUserById(user_id);
        if (result.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(result[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getUsersByName = async (req, res) => {
    const { name } = req.params;
    console.log(`Received Name: ${name}`);
    try {
        const results = await userPersistence.getUsersByName(name);
        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const createUser = async (req, res) => {
    const userData = req.body;
    try {
        const result = await userPersistence.createUser(userData);
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

const updateUser = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    const { username, password, email, firstName, lastName, role } = updatedData;

    try {
        const userExists = await checkUserExists(id);
        if (!userExists) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (username || email) {
            const hasDuplicates = await checkDuplicates(username, email, id);
            if (hasDuplicates) {
                return res.status(409).json({ message: 'Username or email already exists' });
            }
        }

        let updateFields = [];
        let updateValues = [];

        if (username) {
            updateFields.push('username = ?');
            updateValues.push(username);
        }
        if (email) {
            updateFields.push('email = ?');
            updateValues.push(email);
        }
        if (firstName) {
            updateFields.push('first_name = ?');
            updateValues.push(firstName);
        }
        if (lastName) {
            updateFields.push('last_name = ?');
            updateValues.push(lastName);
        }
        if (role) {
            updateFields.push('role = ?');
            updateValues.push(role);
        }

        if (password) {
            const passwordHash = await bcrypt.hash(password, 10);
            updateFields.push('password_hash = ?');
            updateValues.push(passwordHash);
        }

        if (updateFields.length === 0) {
            return res.status(400).json({ message: 'No fields to update' });
        }

        const result = await userPersistence.updateUser(id, updateFields, updateValues);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await userPersistence.deleteUser(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    getUsersByName,
    createUser,
    updateUser,
    deleteUser
};
