const CropPersistence = require('../Persistence/CropsConfig');

const getAllCrops = async () => {
    return await CropPersistence.getAllCrops();
};

const getCropByName = async (name) => {
    return await CropPersistence.getCropByName(name);
};

const createCrop = async (cropData) => {
    return await CropPersistence.createCrop(cropData);
};

const updateCrop = async (cropID, cropData) => {
    return await CropPersistence.updateCrop(cropID, cropData);
};

const deleteCrop = async (cropID) => {
    return await CropPersistence.deleteCrop(cropID);
};

module.exports = {
    getAllCrops,
    getCropByName,
    createCrop,
    updateCrop,
    deleteCrop,
};
