
const express = require('express');
const router = express.Router();
const {
  getWeatherByCity,
} = require('../Services/WeatherService');
router.get('/:cityName', getWeatherByCity);

module.exports = router;

