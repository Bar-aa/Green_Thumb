const CropService = require('../Services/CropsService');

const getAllCrops = async (req, res) => {
    try {
        const crops = await CropService.getAllCrops();
        res.json(crops);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCropByName = async (req, res) => {
    const name = req.params.name;
    try {
        const crop = await CropService.getCropByName(name);
        if (!crop) {
            return res.status(404).json({ message: 'Crop not found' });
        }
        res.json(crop);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addCrop = async (req, res) => {
    const cropData = req.body;
    try {
        const newCrop = await CropService.createCrop(cropData);
        res.status(201).json(newCrop);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateCrop = async (req, res) => {
    const cropID = req.params.cropID;
    const cropData = req.body;
    try {
        const updatedCrop = await CropService.updateCrop(cropID, cropData);
        res.json(updatedCrop);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteCrop = async (req, res) => {
    const cropID = req.params.cropID;
    try {
        await CropService.deleteCrop(cropID);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllCrops,
    getCropByName,
    addCrop,
    updateCrop,
    deleteCrop,
};
