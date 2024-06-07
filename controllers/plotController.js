const plotPersistence = require('../persistence/plotPersistence');

const getAllPlots = async (req, res) => {
    try {
        const results = await plotPersistence.getAllPlots();
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getPlotById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await plotPersistence.getPlotById(id);
        if (result.length === 0) {
            return res.status(404).json({ message: 'Plot not found' });
        }
        res.json(result[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const createPlot = async (req, res) => {
    const plotData = req.body;
    try {
        const result = await plotPersistence.createPlot(plotData);
        res.status(201).json({ message: 'Plot created successfully', plotId: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updatePlot = async (req, res) => {
    const { id } = req.params;
    const plotData = req.body;
    try {
        const result = await plotPersistence.updatePlot(id, plotData);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Plot not found' });
        }
        res.status(200).json({ message: 'Plot updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deletePlot = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await plotPersistence.deletePlot(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Plot not found' });
        }
        res.json({ message: 'Plot deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getAllPlots,
    getPlotById,
    createPlot,
    updatePlot,
    deletePlot,
};
