const db = require('../config/dbconnection');

const getAllPlots = (req, res) => {
    const query = 'SELECT * FROM plots';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.json(results);
    });
};

const getPlotById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM plots WHERE plot_id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Garden not found' });
        }
        res.json(result[0]);
    });
};

const createPlot = (req, res) => {
    const { garden_id, user_id, plot_number, size } = req.body; 
    const query = 'INSERT INTO plots (garden_id, user_id, plot_number, size) VALUES (?, ?, ?, ?)';
    db.query(query, [garden_id, user_id, plot_number, size], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.status(201).json({ message: 'Plot created successfully', plotId: result.insertId });
    });
};


const updatePlot = (req, res) => {
    const {plotId} = req.params;
    const { garden_id, user_id, plot_number, size } = req.body;
    const query = 'UPDATE plots SET garden_id = ?, user_id = ?, plot_number = ?, size = ? WHERE plot_id = ?';
    db.query(query, [garden_id, user_id, plot_number, size, plotId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.status(200).json({ message: 'Plot updated successfully' });
    });
};



const deletePlot = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM plots WHERE plot_id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Plot not found' });
        }
        res.json({ message: 'Plot deleted successfully' });
    });
};



module.exports = {
    getAllPlots,
    getPlotById,
    createPlot,
    updatePlot,
    deletePlot,
};
