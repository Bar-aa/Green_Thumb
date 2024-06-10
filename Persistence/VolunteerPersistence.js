const db = require('../config/dbconnection');

const getAllVolunteers = () => {
    const query = 'SELECT * FROM volunteers';
    return new Promise((resolve, reject) => {
        db.query(query, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

const getVolunteerById = (id) => {
    const query = 'SELECT * FROM volunteers WHERE volunteer_id = ?';
    return new Promise((resolve, reject) => {
        db.query(query, [id], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

const getVolunteersByName = async (name) => { 
    const query = 'SELECT * FROM volunteers WHERE name = ?';
    return new Promise((resolve, reject) => {
        db.query(query, [name], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};
const getVolunteersByEventDate = (date) => {
    const query = 'SELECT * FROM volunteers WHERE event_date = ?';
    return new Promise((resolve, reject) => {
        const formattedDate = date.toISOString().split('T')[0]; 
        db.query(query, [formattedDate], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

const addNewVolunteer = (user_id, garden_id, event_date, role, email, name, phone_number) => {
    const query = 'INSERT INTO volunteers (user_id, garden_id, event_date, role, email, name, phone_number) VALUES (?, ?, ?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
        db.query(query, [user_id, garden_id, event_date, role, email, name, phone_number], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

const updateVolunteer = (id, user_id, garden_id, event_date, role, email, name, phone_number) => {
    const query = 'UPDATE volunteers SET user_id = ?, garden_id = ?, event_date = ?, role = ?, email = ?, name = ?, phone_number = ? WHERE volunteer_id = ?';
    return new Promise((resolve, reject) => {
        db.query(query, [user_id, garden_id, event_date, role, email, name, phone_number, id], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

const deleteVolunteer = (id) => {
    const query = 'DELETE FROM volunteers WHERE volunteer_id = ?';
    return new Promise((resolve, reject) => {
        db.query(query, [id], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

module.exports = {
    getAllVolunteers,
    getVolunteerById,
    getVolunteersByName,
    getVolunteersByEventDate,
    addNewVolunteer,
    updateVolunteer,
    deleteVolunteer
};
