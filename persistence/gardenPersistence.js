const db = require('../config/dbconnection');

const getAllGardens = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM gardens';
        db.query(query, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

const getGardenById = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM gardens WHERE garden_id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

const createGarden = (gardenData) => {
    return new Promise((resolve, reject) => {
        const { name, location, sunlight_conditions, soil_type, available_plots } = gardenData;
        const query = 'INSERT INTO gardens (name, location, sunlight_conditions, soil_type, available_plots) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [name, location, sunlight_conditions, soil_type, available_plots], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

const updateGarden = (id, gardenData) => {
    return new Promise((resolve, reject) => {
        const { name, location, sunlight_conditions, soil_type, available_plots } = gardenData;
        const query = 'UPDATE gardens SET name = ?, location = ?, sunlight_conditions = ?, soil_type = ?, available_plots = ? WHERE garden_id = ?';
        db.query(query, [name, location, sunlight_conditions, soil_type, available_plots, id], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

const deleteGarden = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM gardens WHERE garden_id = ?';
        db.query(query, [id], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

const getAllPlotsByGardenId = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM plots WHERE garden_id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

const getAllCropsInGarden = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM crops WHERE plot_id IN (SELECT plot_id FROM plots WHERE garden_id = ?)';
        db.query(query, [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

module.exports = {
    getAllGardens,
    getGardenById,
    createGarden,
    updateGarden,
    deleteGarden,
    getAllPlotsByGardenId,
    getAllCropsInGarden,
};
