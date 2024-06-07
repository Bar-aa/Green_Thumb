/*const express = require('express');
const axios = require('axios');

const router = express.Router();

const API_KEY = '4e389b6c15402feba7f3a82c1c90f4a0';
const CITY_NAME = 'Nablus'; // You can change this to any city name

router.get('/weather', (req, res) => {
  const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${API_KEY}`;

  axios.get(apiUrl)
    .then(response => {
      const weatherData = response.data;
      res.json(weatherData);
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      res.status(500).json({ error: 'Error fetching weather data' });
    });
});

module.exports = router;
*/
const express = require('express');
const axios = require('axios');

const router = express.Router();

const API_KEY = '4e389b6c15402feba7f3a82c1c90f4a0';

router.get('/weather/:cityName', (req, res) => {
  const cityName = req.params.cityName; // Get the city name from route parameter

  const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;

  axios.get(apiUrl)
    .then(response => {
      const weatherData = response.data;
      res.json(weatherData);
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      res.status(500).json({ error: 'Error fetching weather data' });
    });
});

module.exports = router;
