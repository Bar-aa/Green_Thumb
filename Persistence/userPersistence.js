const db = require('../config/dbconnection');
const { checkDuplicates } = require('../Persistence/UserSignUpPersistence');
const bcrypt = require('bcryptjs');


const getAllUsers = () => {
    const query = 'SELECT * FROM users';
    return new Promise((resolve, reject) => {
        db.query(query, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};
const getUserById = (id) => {
    const query = 'SELECT * FROM users WHERE user_id = ?';
    return new Promise((resolve, reject) => {
        db.query(query, [id], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

const getUsersByName = async (name) => { 
    const query = 'SELECT * FROM users WHERE username = ?';
    return new Promise((resolve, reject) => {
        db.query(query, [name], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

const createUser = (userData) => {
    return new Promise(async (resolve, reject) => {
        const { username, password, email, firstName, lastName, role } = userData;

        try {
            const hasDuplicates = await checkDuplicates(username, email);
            if (hasDuplicates) {
                return reject(new Error('Username or email already exists'));
            }

            bcrypt.hash(password, 10, (err, passwordHash) => {
                if (err) {
                    return reject(err);
                }

                const insertQuery = `
                    INSERT INTO users (username, password_hash, email, first_name, last_name, role)
                    VALUES (?, ?, ?, ?, ?, ?)
                `;
                db.query(insertQuery, [username, passwordHash, email, firstName, lastName, role], (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(result);
                });
            });
        } catch (err) {
            reject(err);
        }
    });
};

const updateUser = (userId, updateFields, updateValues) => {
    return new Promise((resolve, reject) => {
        if (!updateFields || !Array.isArray(updateFields) || updateFields.length === 0) {
            return reject(new Error('No fields to update'));
        }
        if (!updateValues || !Array.isArray(updateValues) || updateValues.length === 0) {
            return reject(new Error('No values to update'));
        }
        
        updateValues.push(userId);
        const query = `
            UPDATE users
            SET ${updateFields.join(', ')}
            WHERE user_id = ?
        `;
        db.query(query, updateValues, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};
const deleteUser = (id) => {
    const query = 'DELETE FROM users WHERE user_id = ?';
    return new Promise((resolve, reject) => {
        db.query(query, [id], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

module.exports = {
    getAllUsers,
    getUserById,
    getUsersByName,
    createUser,
    updateUser,
    deleteUser
};