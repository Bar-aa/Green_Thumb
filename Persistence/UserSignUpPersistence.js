const db = require('../config/dbconnection');
const bcrypt = require('bcryptjs');

const checkDuplicates = (username, email) => {
    return new Promise((resolve, reject) => {
        const checkQuery = `
            SELECT * FROM users WHERE username = ? OR email = ?
        `;
        db.query(checkQuery, [username, email], (err, results) => {
            if (err) {
                return reject(err);
            }
            if (results.length > 0) {
                return resolve(true); // Duplicates found
            }
            resolve(false); // No duplicates
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

module.exports = {
    createUser,
    checkDuplicates,
};