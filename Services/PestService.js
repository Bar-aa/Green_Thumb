const axios = require('axios');

const getPestInfo = async (req, res) => {
    try {
        const { name } = req.params; // Access the parameter from URL

        const response = await axios.get(`https://api.gbif.org/v1/species/search?q=${name}`);
        const pestData = response.data;
        res.json(pestData);
    } catch (error) {

        res.status(500).json({ error: 'Pest Not Found', details: error.message });
    }
};

module.exports = {
    getPestInfo 
};
