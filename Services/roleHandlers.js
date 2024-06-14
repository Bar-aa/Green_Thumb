
const roleHandlers = {
    volunteer: async (userId, userData) => {
        const volunteerData = {
            user_id: userId,
          
        };
        await createUserPersistence.createVolunteer(volunteerData);
    },
    partner: async (userId, userData) => {
        const partnerData = {
            user_id: userId,
         
        };
        await createUserPersistence.createVoluntee(partnerData);
    },
};

module.exports = roleHandlers;
