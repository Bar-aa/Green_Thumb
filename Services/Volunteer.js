const volunteerPersistence = require('../Persistence/VolunteerPersistence');

const getAllVolunteers = async (req, res) => {
    try {
        const results = await volunteerPersistence.getAllVolunteers();
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getVolunteerById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await volunteerPersistence.getVolunteerById(id);
        if (result.length === 0) {
            return res.status(404).json({ message: 'Volunteer not found' });
        }
        res.json(result[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getVolunteersByName = async (req, res) => {
    const { Name } = req.params;
    console.log(`Received Name: ${Name}`);
    try {
        const results = await volunteerPersistence.getVolunteersByName(Name);
        if (results.length === 0) {
            return res.status(404).json({ message: 'Volunteer not found' });
        }
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getVolunteersByEventDate = async (req, res) => {
    const { Date } = req.params;
    console.log(`Received Date: ${Date}`);
    try {
        const results = await volunteerPersistence.getVolunteersByEventDate(Date);
        if (results.length === 0) {
            return res.status(404).json({ message: 'Volunteer not found' });
        }
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const addNewVolunteer = async (req, res) => {
    const { user_id, garden_id, event_date, role, email, name, phone_number } = req.body;
    if (!user_id || !garden_id || !event_date || !role || !email || !name || !phone_number) {
        return res.status(400).json({ message: 'Missing important fields' });
    }

    try {
        const result = await volunteerPersistence.addNewVolunteer(user_id, garden_id, event_date, role, email, name, phone_number);
        res.status(201).json({ id: result.insertId, user_id, garden_id, event_date, role, email, name, phone_number });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateVolunteer = async (req, res) => {
    const { id } = req.params;
    const { user_id, garden_id, event_date, role, email, name, phone_number } = req.body;
    if (!user_id || !garden_id || !event_date || !role || !email || !name || !phone_number) {
        return res.status(400).json({ message: 'Missing important fields' });
    }

    try {
        const result = await volunteerPersistence.updateVolunteer(id, user_id, garden_id, event_date, role, email, name, phone_number);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Volunteer not found' });
        }
        res.status(200).json({ message: 'Volunteer updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteVolunteer = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await volunteerPersistence.deleteVolunteer(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Volunteer not found' });
        }
        res.status(200).json({ message: 'Volunteer deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getVolunteersByName,
    getVolunteersByEventDate,
    getAllVolunteers,
    getVolunteerById,
    addNewVolunteer,
    updateVolunteer,
    deleteVolunteer
};
