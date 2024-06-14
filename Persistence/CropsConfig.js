const conn = require('../config/dbconnection');

const getAllCrops = async () => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM crops', (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

const getCropByName = async (name) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM crops WHERE name = ?', [name], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results[0]);
            }
        });
    });
};

const getCropById = async (id) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM crops WHERE crop_id = ?', [id], (error, results) => {
            if (error) {
                reject(error); // Reject with the error object
            } else {
                if (results.length > 0) {
                    resolve(results[0]);
                } else {
                    resolve(null);
                }
            }
        });
    });
};

const createCrop = async (cropData) => {
    return new Promise((resolve, reject) => {
        const { plot_id, name, planting_date, expected_harvest_date, activity } = cropData;
        conn.query('INSERT INTO crops (plot_id, name, planting_date, expected_harvest_date, activity) VALUES ( ?, ?, ?, ?,?)', [plot_id, name, planting_date, expected_harvest_date, activity], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(cropData);
            }
        });
    });
};

const updateCrop = async (cropID, cropData) => {
    return new Promise((resolve, reject) => {
        const { plot_id, name, planting_date, expected_harvest_date, activity } = cropData;
        conn.query('UPDATE crops SET plot_id = ?, name = ?, planting_date = ?, expected_harvest_date = ?, activity = ? WHERE crop_id = ?', [plot_id, name, planting_date, expected_harvest_date, activity, cropID], (error) => {
            if (error) {
                reject(error);
            } else {
                resolve(true);
            }
        });
    });
};

const deleteCrop = async (cropID) => {
    return new Promise((resolve, reject) => {
        conn.query('DELETE FROM crops WHERE crop_id = ?', [cropID], (error) => {
            if (error) {
                reject(error);
            } else {
                resolve(true);
            }
        });
    });
};

module.exports = {
    getAllCrops,
    getCropByName,
    createCrop,
    updateCrop,
    deleteCrop,
    getCropById
};