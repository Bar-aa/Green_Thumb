
const { getVolunteerById } = require('../Persistence/VolunteerPersistence');

const checkAuthorIdExists = async (id) => {
    try {
        const result = await getVolunteerById(id);
        return result.length !== 0;
    } catch (err) {
        console.error(err);
        return false;
    }
};

module.exports = {
    checkAuthorIdExists
};
