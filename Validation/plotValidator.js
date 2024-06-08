
const { getPlotById } = require('../Persistence/plotPersistence');

const checkPlotIdExists = async (id) => {
    try {
        const result = await getPlotById(id);
        return result.length !== 0;
    } catch (err) {
        console.error(err);
        return false;
    }
};

module.exports = {
    checkPlotIdExists
};