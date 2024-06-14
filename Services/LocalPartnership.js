const db = require('../config/dbconnection');


  const partnershipPersistence = require('../Persistence/partnerpersistance');

const showPartners = async (req, res) => {
    try {
        const results = await partnershipPersistence.getAllPartnerships();
        res.status(200).json({ success: true, message: 'All partnerships retrieved successfully', partnerships: results });
    } catch (error) {
        console.error('Error retrieving partnerships:', error);
        res.status(500).json({ success: false, error: 'An error occurred while retrieving partnerships' });
    }
};

const getPartnerDetailsById = async (req, res) => {
    const { partnerId } = req.params;
    try {
        const result = await partnershipPersistence.getPartnershipById(partnerId);
        if (result.length === 0) {
            res.status(404).json({ message: 'Partners not found' });
        } else {
            res.json(result[0]);
        }
    } catch (error) {
        console.error('Error retrieving partner details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getPartnersByName = async (req, res) => {
    const { Name } = req.params;
    try {
        const results = await partnershipPersistence.getPartnershipByName(Name);
        if (results.length === 0) {
            res.status(404).json({ message: 'Partners not found' });
        } else {
            res.json(results);
        }
    } catch (error) {
        console.error('Error retrieving partners by name:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const addPartnership = async (req, res) => {
    const { user_id ,name, description, contact_info } = req.body;
    if (!user_id ||!name || !description || !contact_info) {
        return res.status(400).json({ message: 'Missing important fields' });
    }
    try {
        const insertId = await partnershipPersistence.createPartnership(user_id,name, description, contact_info);
        res.status(201).json({ id: insertId,user_id, name, description, contact_info });
    } catch (error) {
        console.error('Error adding partnership:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updatePartnership = async (req, res) => {
    const { partnership_id } = req.params;
    const { user_id,name, description, contact_info } = req.body;
    if (!user_id||!name || !description || !contact_info) {
        return res.status(400).json({ message: 'Missing important fields' });
    }
    try {
        const affectedRows = await partnershipPersistence.updatePartnership(partnership_id,user_id, name, description, contact_info);
        if (affectedRows === 0) {
            res.status(404).json({ message: 'Partnership not found' });
        } else {
            res.status(200).json({ message: 'Partnership updated successfully' });
        }
    } catch (error) {
        console.error('Error updating partnership:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deletePartner = async (req, res) => {
    const { partnership_id } = req.params;
    try {
        const affectedRows = await partnershipPersistence.deletePartnership(partnership_id);
        if (affectedRows === 0) {
            res.status(404).json({ message: 'Partnership not found' });
        } else {
            res.status(200).json({ message: 'Partnership deleted successfully' });
        }
    } catch (error) {
        console.error('Error deleting partnership:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    showPartners,
    getPartnerDetailsById,
    getPartnersByName,
    addPartnership,
    updatePartnership,
    deletePartner
};
