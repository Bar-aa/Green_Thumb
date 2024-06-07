const db = require('../config/dbconnection');

const showPartners = (req, res) => {
    db.query(
        'SELECT * FROM localpartnerships',
        (error, results) => {
            if (error) {
                console.error('Error executing SELECT query:', error);
                return res.status(500).json({ success: false, error: 'An error occurred while retrieving partnerships' });
            }
            res.status(200).json({ success: true, message: 'All partnerships retrieved successfully', partnerships: results });
        }
    );
};




const getPartnerDetailsbyId = (req, res) => {
    const { partnerId } = req.params;

    const query = 'SELECT * FROM localpartnerships WHERE partnership_id = ?';
    db.query(query, [partnerId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: ' Partners not found' });
        }
        res.json(result[0]);
    });
};

const getParternsByName = (req, res) => {
    const {Name} = req.params;

    // Print the title for debugging purposes
    console.log(`Received Name: ${Name}`);

    const query = 'SELECT * FROM localpartnerships  WHERE TRIM(name) = ?';
    db.query(query, [Name.trim()], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Partners is not found' });
        }
        res.json(results);
    });
};

const addPartnership = (req, res) => {
    const { name, description, contact_info } = req.body;
    
    // Check if all required fields are present
    if (!name || !description || !contact_info) {
        return res.status(400).json({ message: 'Missing important fields' });
    }

    const query = 'INSERT INTO localpartnerships (name, description, contact_info) VALUES (?, ?, ?)';
    db.query(query, [name, description, contact_info], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.status(201).json({ id: result.insertId, name, description, contact_info });
    });
};

const UpdatePartnership = (req, res) => {
    const { partnership_id } = req.params;
    const { name, description, contact_info } = req.body;

    // Check if all required fields are present
    if (!name || !description || !contact_info) {
        return res.status(400).json({ message: 'Missing important fields' });
    }

    const query = 'UPDATE localpartnerships SET name = ?, description = ?, contact_info = ? WHERE partnership_id = ?';
    db.query(query, [name, description, contact_info, partnership_id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Partnership not found' });
        }
        res.status(200).json({ message: 'Partnership updated successfully' });
    });
};

const deletePartner = (req, res) => {
    const { partnership_id } = req.params;

    const query = 'DELETE FROM localpartnerships WHERE partnership_id = ?';
    db.query(query, [partnership_id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Partnership not found' });
        }
        res.status(200).json({ message: 'Partnership deleted successfully' });
    });
};








module.exports = {
    showPartners,
    getPartnerDetailsbyId,
    getParternsByName,
    addPartnership,
    UpdatePartnership,
    deletePartner
  };