const gardenPersistence = require('../Persistence/gardenPersistence');

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
