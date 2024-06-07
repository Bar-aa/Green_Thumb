/*const express = require('express');
const axios = require('axios');

const router = express.Router();

// Soil analysis API endpoint
router.get('/soil/:latitude/:longitude', async (req, res) => {
  const { latitude, longitude } = req.params;

  try {
    const apiUrl = `https://rest.soilgrids.org/soilgrids/v2.0/properties/query?lon=${longitude}&lat=${latitude}`;
    const response = await axios.get(apiUrl);
    const soilData = response.data;
    res.json(soilData);
  } catch (error) {
    console.error('Error fetching soil analysis data:', error);
    res.status(500).json({ error: 'Error fetching soil analysis data' });
  }
});

module.exports = router;
/*
*/
// Pest identification API endpoint
router.get('/pest/:plantName', async (req, res) => {
  const { plantName } = req.params;

  try {
    const apiUrl = `https://api.data.gov/pests/concept/${encodeURIComponent(plantName)}`;
    const response = await axios.get(apiUrl);
    const pestData = response.data;
    res.json(pestData);
  } catch (error) {
    console.error('Error identifying pests:', error);
    res.status(500).json({ error: 'Error identifying pests' });
  }
});

// Organic pest control methods API endpoint
router.get('/organic-pest-control/:pestName', async (req, res) => {
  const { pestName } = req.params;

  try {
    const apiUrl = `https://api.omri.org/v1/search/products?q=${encodeURIComponent(pestName)}&filter[category]=Pesticide&filter[status]=Allowed`;
    const response = await axios.get(apiUrl);
    const organicPestControlData = response.data;
    res.json(organicPestControlData);
  } catch (error) {
    console.error('Error fetching organic pest control methods:', error);
    res.status(500).json({ error: 'Error fetching organic pest control methods' });
  }
});
*/
//module.exports = router;
