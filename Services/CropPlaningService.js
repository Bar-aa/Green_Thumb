// CropPlanningService.js
const CropPersistence = require('../Persistence/CropsPlaningPersistence');

const getAllCropRotations = async (req, res) => {
  try {
    const crops = await CropPersistence.getAllCrops();
    res.json(crops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCropRotationById = async (req, res) => {
  const id = req.params.id;
  try {
    const crop = await CropPersistence.getCropById(id);
    if (crop) {
      res.json(crop);
    } else {
      res.status(404).json({ message: 'Crop rotation not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addCropRotation = async (req, res) => {
  const cropData = req.body;
  try {
    const newCrop = await CropPersistence.addCrop(cropData);
    res.status(201).json(newCrop);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateCropRotation = async (req, res) => {
  const id = req.params.id;
  const cropData = req.body;
  try {
    const updatedCrop = await CropPersistence.updateCrop(id, cropData);
    res.json(updatedCrop);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteCropRotation = async (req, res) => {
  const id = req.params.id;
  try {
    await CropPersistence.deleteCrop(id);
    res.json({ message: 'Crop rotation deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllCropRotations,
  getCropRotationById,
  addCropRotation,
  updateCropRotation,
  deleteCropRotation,
};
