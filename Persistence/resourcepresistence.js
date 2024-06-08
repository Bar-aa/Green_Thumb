const db = require('../config/dbconnection');

const getResourcesByOwnerId = (owner_id) => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM resources WHERE owner_id = ?',
            [owner_id],
            (error, results) => {
                if (error) {
                    console.error('Error executing SELECT query:', error);
                    return reject(new Error('An error occurred while retrieving resources'));
                }
                resolve(results);
            }
        );
    });
};
const getAllResources = () => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM resources',
            (error, results) => {
                if (error) {
                    console.error('Error executing SELECT query:', error);
                    return reject(new Error('An error occurred while retrieving resources'));
                }
                resolve(results);
            }
        );
    });
};
const getResourceByType = (type, callback) => {
    const query = 'SELECT * FROM resources WHERE TRIM(type) = ?';
    db.query(query, [type.trim()], callback);
};
const updateResource = (id, type, description, owner_id, callback) => {
    const allowedTypes = ['tool', 'seed', 'compost', 'produce'];
    if (!allowedTypes.includes(type)) {
        return callback({ status: 400, message: 'Invalid type value' });
    }

    const query = 'UPDATE resources SET type = ?, description = ?, owner_id = ?, updated_at = CURRENT_TIMESTAMP WHERE resource_id = ?';
    db.query(query, [type, description, owner_id, id], (err, result) => {
        if (err) {
            console.error(err);
            return callback({ status: 500, message: 'Internal server error' });
        }
        if (result.affectedRows === 0) {
            return callback({ status: 404, message: 'Resource not found' });
        }
        callback(null, { status: 200, message: 'Resource updated successfully' });
    });
};
const deleteResource = (id, callback) => {
    const query = 'DELETE FROM resources WHERE resource_id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            return callback({ status: 500, message: 'Internal server error' });
        }
        if (result.affectedRows === 0) {
            return callback({ status: 404, message: 'Resource not found' });
        }
        callback(null, { status: 200, message: 'Resource deleted successfully' });
    });
};

const addResourceToDatabase = (type, description, owner_id) => {
    const query = 'INSERT INTO resources (type, description, owner_id) VALUES (?, ?, ?)';
    return new Promise((resolve, reject) => {
        db.query(query, [type, description, owner_id], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};
module.exports = {
    getResourcesByOwnerId,
    getAllResources,
    getResourceByType,
    updateResource,
    deleteResource,
    addResourceToDatabase
};
