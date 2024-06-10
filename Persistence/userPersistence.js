const db = require('../config/dbconnection');
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
module.exports = {
    getUserById
};