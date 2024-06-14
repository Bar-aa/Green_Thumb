// signinPersistence.js
const db = require('../config/dbconnection');
const bcrypt = require('bcryptjs');

const getUserByUsernameOrEmail = (usernameOrEmail) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT * FROM users WHERE username = ? OR email = ?
        `;
        db.query(query, [usernameOrEmail, usernameOrEmail], (err, results) => {
            if (err) {
                return reject(err);
            }
            if (results.length === 0) {
                return resolve(null);
            }
            resolve(results[0]);
        });
    });
};

const verifyPassword = (inputPassword, storedPasswordHash) => {
    return bcrypt.compare(inputPassword, storedPasswordHash);
};

module.exports = {
    getUserByUsernameOrEmail,
    verifyPassword,
};