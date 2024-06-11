const db = require('../config/dbconnection');

const getUserByUsername = (username, callback) => {
    const query = 'SELECT username, sha1_password FROM users WHERE username = ?';
    db.query(query, [username], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return callback(err);
        }
        if (results.length === 0) {
            return callback(null, null); 
        }

        const user = results[0];
        callback(null, user);
    });
};

module.exports = { getUserByUsername };
