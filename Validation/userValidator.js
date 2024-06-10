
const { getUserById } = require('../Persistence/userPersistence');

const checkUserExists = async (id) => {
    try {
        const result = await getUserById(id);
        return result.length !== 0;
    } catch (err) {
        console.error(err);
        return false;
    }
};

module.exports = {
    checkUserExists
};