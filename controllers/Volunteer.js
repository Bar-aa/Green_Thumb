const db = require('../config/dbconnection');

const getAllVolunteers = (req, res) => {
    const query = 'SELECT * FROM volunteers';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.json(results);
    });
};
const getVolunteerById = (req, res) => {
    const { id } = req.params;

    const query = 'SELECT * FROM volunteers WHERE volunteer_id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: ' Vlolunteer is not found' });
        }
        res.json(result[0]);
    });
};

const getVolunteersByName = (req, res) => {
    const {Name} = req.params;

    // Print the title for debugging purposes
    console.log(`Received Name: ${Name}`);

    const query = 'SELECT * FROM volunteers WHERE TRIM(name) = ?';
    db.query(query, [Name.trim()], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Vlolunteer is not found' });
        }
        res.json(results);
    });
};

const getVolunteersByEventDate = (req, res) => {
    const {Date} = req.params;

    // Print the title for debugging purposes
    console.log(`Received Date: ${Date}`);

    const query = 'SELECT * FROM volunteers WHERE TRIM(event_date) = ?';
    db.query(query, [Date.trim()], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Vlolunteer is not found' });
        }
        res.json(results);
    });
};
const addNewVlounteer = (req, res) => {

    const {user_id,garden_id,event_date, role, email,name,phone_number} = req.body;
    if (!user_id || !garden_id || !event_date || !role || !email || !name || !phone_number) {
        return res.status(400).json({ message: 'Missing important fields' });
    }

    const query = 'INSERT INTO volunteers (user_id, garden_id, event_date, role, email, name, phone_number) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [user_id, garden_id, event_date,role,email,name,phone_number], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.status(201).json({ id: result.insertId, user_id, garden_id, event_date,role,email,name,phone_number});
    });
};

const updateVolunteer = (req, res) => {
    const { id } = req.params;
    const {user_id,garden_id,event_date, role, email,name,phone_number} = req.body;

    if (!user_id || !garden_id || !event_date || !role || !email || !name || !phone_number) {
        return res.status(400).json({ message: 'Missing important fields' });
    }

    const query = 'UPDATE volunteers SET user_id = ?, garden_id = ?, event_date = ?, role = ?, email = ?, name = ?, phone_number = ? WHERE volunteer_id = ?';
    db.query(query, [user_id,garden_id,event_date,role,email,name,phone_number,id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'volunteer is not found' });
        }
        res.status(200).json({ message: 'volunteer updated successfully' });
    });
};

const deletevolunteer = (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM volunteers WHERE volunteer_id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'vlounteer not found' });
        }
        res.status(200).json({ message: 'volunteer deleted successfully' });
    });
};

module.exports = {
    getVolunteersByName,
    getVolunteersByEventDate,
    getAllVolunteers,
    getVolunteerById,
    addNewVlounteer,
    updateVolunteer,
    deletevolunteer
};