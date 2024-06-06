const db = require('../config/dbconnection');

const getAllGardens = (req, res) => {
    const query = 'SELECT * FROM gardens';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.json(results);
    });
};

const getGardenById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM gardens WHERE garden_id = ?';
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

const createGarden = (req, res) => {
    const { name, location, sunlight_conditions, soil_type, available_plots } = req.body;
    const query = 'INSERT INTO gardens (name, location, sunlight_conditions, soil_type, available_plots) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [name, location, sunlight_conditions, soil_type, available_plots], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.status(201).json({ message: 'Garden created successfully', gardenId: result.insertId });
    });
};

const updateGarden = (req, res) => {
    const { id } = req.params;
    const { name, location, sunlight_conditions, soil_type, available_plots } = req.body;
    const query = 'UPDATE gardens SET name = ?, location = ?, sunlight_conditions = ?, soil_type = ?, available_plots = ? WHERE garden_id = ?';
    db.query(query, [name, location, sunlight_conditions, soil_type, available_plots, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Garden not found' });
        }
        res.json({ message: 'Garden updated successfully' });
    });
};

const deleteGarden = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM gardens WHERE garden_id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Garden not found' });
        }
        res.json({ message: 'Garden deleted successfully' });
    });
};

const getAllPlotsByGardenId = (req, res) => {
    const { gardenId } = req.params;
    const query = 'SELECT * FROM plots WHERE garden_id = 1';
    db.query(query, [gardenId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.json(results);
    });
};

module.exports = {
    getAllGardens,
    getGardenById,
    createGarden,
    updateGarden,
    deleteGarden,
    getAllPlotsByGardenId,
};
