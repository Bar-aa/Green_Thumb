const db = require('../config/dbconnection');
const bcrypt = require('bcryptjs');

const createUser = (userData) => {
    return new Promise((resolve, reject) => {
        const { username, password, email, firstName, lastName, role } = userData;

        bcrypt.hash(password, 10, (err, passwordHash) => {
            if (err) {
                return reject(err);
            }

            const query = `
                INSERT INTO users (username, password_hash, email, first_name, last_name, role)
                VALUES (?, ?, ?, ?, ?, ?)
            `;
            db.query(query, [username, passwordHash, email, firstName, lastName, role], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    });
};

module.exports = {
    createUser,
};