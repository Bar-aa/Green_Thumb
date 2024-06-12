
const { getUserById } = require('../Persistence/userPersistence');

const checkAuthorIdExists = async (id) => {
    try {
        const result = await getUserById(id);
        return result.length !== 0;
    } catch (err) {
        console.error(err);
        return false;
    }
};

module.exports = {
    checkAuthorIdExists
};
