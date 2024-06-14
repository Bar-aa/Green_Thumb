const db = require('../config/dbconnection');

const getAllPartnerships = async () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM localpartnerships', (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

const getPartnershipById = async (partnerId) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM localpartnerships WHERE partnership_id = ?';
        db.query(query, [partnerId], (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
};

const getPartnershipByName = async (name) => {

    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM localpartnerships WHERE name = ?';
        db.query(query, [name], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

const createPartnership = async (user_id, name, description, contactInfo) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO localpartnerships (user_id,name, description, contact_info) VALUES (?,?, ?, ?)';
        db.query(query, [user_id, name, description, contactInfo], (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result.insertId);
            }
        });
    });
};

const updatePartnership = async (partnershipId, user_id, name, description, contactInfo) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE localpartnerships SET user_id = ?, name = ?, description = ?, contact_info = ? WHERE partnership_id = ?';
        db.query(query, [user_id, name, description, contactInfo, partnershipId], (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result.affectedRows);
            }
        });
    });
};

const deletePartnership = async (partnershipId) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM localpartnerships WHERE partnership_id = ?';
        db.query(query, [partnershipId], (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result.affectedRows);
            }
        });
    });
};

module.exports = {
    getAllPartnerships,
    getPartnershipById,
    getPartnershipByName,
    createPartnership,
    updatePartnership,
    deletePartnership
};
