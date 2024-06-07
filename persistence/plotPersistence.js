const db = require('../config/dbconnection');

const getAllPlots = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM plots';
        db.query(query, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

const getPlotById = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM plots WHERE plot_id = ?';
        db.query(query, [id], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

const createPlot = (plotData) => {
    return new Promise((resolve, reject) => {
        const { garden_id, user_id, plot_number, size } = plotData;
        const query = 'INSERT INTO plots (garden_id, user_id, plot_number, size) VALUES (?, ?, ?, ?)';
        db.query(query, [garden_id, user_id, plot_number, size], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

const updatePlot = (plotId, plotData) => {
    return new Promise((resolve, reject) => {
        const { garden_id, user_id, plot_number, size } = plotData;
        const query = 'UPDATE plots SET garden_id = ?, user_id = ?, plot_number = ?, size = ? WHERE plot_id = ?';
        db.query(query, [garden_id, user_id, plot_number, size, plotId], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

const deletePlot = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM plots WHERE plot_id = ?';
        db.query(query, [id], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

module.exports = {
    getAllPlots,
    getPlotById,
    createPlot,
    updatePlot,
    deletePlot,
};
