const db = require('../config/dbconnection');

const updateUserMessage = async (email, message) => {
    try {
        const result = await db.query('UPDATE users SET message = ? WHERE email = ?', [message, email]);
        return result.affectedRows;
    } catch (error) {
        throw error;
    }
};

const updateUserPassword = async (username, newPasswordHash) => {
    try {
        const result = await db.query('UPDATE users SET password_hash = ? WHERE username = ?', [newPasswordHash, username]);
        return result.affectedRows;
    } catch (error) {
        throw error;
    }
};



module.exports = {
    updateUserMessage,
    updateUserPassword,

};