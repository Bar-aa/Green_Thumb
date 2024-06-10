
const { getGardenById } = require('../Persistence/gardenPersistence');

const checkgardenIdExists = async (id) => {
    try {
        const result = await getGardenById(id);
        return result.length !== 0;
    } catch (err) {
        console.error(err);
        return false;
    }
};

module.exports = {
    checkgardenIdExists
};