/*const db = require('../config/dbconnection');

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
    const query = 'SELECT * FROM plots WHERE garden_id = ?';
    db.query(query, [gardenId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.json(results);
    });
};

const getAllCropsInGarden = (req, res) => {
    const { gardenId } = req.params;
    const query = 'SELECT * FROM crops WHERE plot_id IN (SELECT plot_id FROM plots WHERE garden_id = ?)';
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
    getAllCropsInGarden,
};

*/

const gardenPersistence = require('../persistence/gardenPersistence');

const getAllGardens = async (req, res) => {
    try {
        const results = await gardenPersistence.getAllGardens();
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getGardenById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await gardenPersistence.getGardenById(id);
        if (result.length === 0) {
            return res.status(404).json({ message: 'Garden not found' });
        }
        res.json(result[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const createGarden = async (req, res) => {
    const gardenData = req.body;
    try {
        const result = await gardenPersistence.createGarden(gardenData);
        res.status(201).json({ message: 'Garden created successfully', gardenId: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateGarden = async (req, res) => {
    const { id } = req.params;
    const gardenData = req.body;
    try {
        const result = await gardenPersistence.updateGarden(id, gardenData);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Garden not found' });
        }
        res.json({ message: 'Garden updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteGarden = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await gardenPersistence.deleteGarden(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Garden not found' });
        }
        res.json({ message: 'Garden deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getAllPlotsByGardenId = async (req, res) => {
    const { gardenId } = req.params;
    try {
        const results = await gardenPersistence.getAllPlotsByGardenId(gardenId);
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getAllCropsInGarden = async (req, res) => {
    const { gardenId } = req.params;
    try {
        const results = await gardenPersistence.getAllCropsInGarden(gardenId);
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
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
