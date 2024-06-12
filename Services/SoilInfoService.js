const axios = require('axios');

// Handler for the /layers endpoint
const getLayers = async (req, res) => {
    try {
        const response = await axios.get('https://api.isda-africa.com/v1/layers', {
            params: {
                key: 'AIzaSyCruMPt43aekqITCooCNWGombhbcor3cf4'
            }
        });
        const layersData = response.data;
        res.json(layersData);
    } catch (error) {
        console.error('Error fetching layers data:', error);
        res.status(500).json({ error: 'Error fetching layers data', details: error.message });
    }
};

// Handler for the /soilproperty endpoint
const getSoilProperty = async (req, res) => {
    try {
        const { lat, lon, property, depth } = req.query;

        const response = await axios.get('https://api.isda-africa.com/v1/soilproperty', {
            params: {
                key: 'AIzaSyCruMPt43aekqITCooCNWGombhbcor3cf4',
                lat: lat,
                lon: lon,
                property: property,
                depth: depth
            }
        });

        const soilData = response.data;
        res.json(soilData);
    } catch (error) {
        console.error('Error fetching soil property data:', error);
        res.status(500).json({ error: 'Error fetching soil property data', details: error.message });
    }
};

module.exports = {
    getLayers,
    getSoilProperty
};
