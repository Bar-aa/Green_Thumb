const partnershipPersistence = require('../Persistence/partnerpersistance');
const volunteerPersistence = require('../Persistence/VolunteerPersistence');

const roleHandlers = {
    volunteer: async (userId, volunteerData) => {
        const { garden_id, event_date, role, email, name, phone_number } = volunteerData;
        const result = await volunteerPersistence.addNewVolunteer(userId, garden_id, event_date, role, email, name, phone_number);
        return { id: result.insertId, ...volunteerData };
    },
    partner: async (userId, partnerData) => {
        const { name, description, contact_info } = partnerData;
        await partnershipPersistence.createPartnership(userId, name, description, contact_info);
        return { user_id: userId, name, description, contact_info };
    },
};

module.exports = roleHandlers;
