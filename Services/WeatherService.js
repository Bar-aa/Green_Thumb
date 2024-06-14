
const axios = require('axios');
const API_KEY = '4e389b6c15402feba7f3a82c1c90f4a0';


const getWeatherByCity = async (req, res) => {
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
};

module.exports = {
  getWeatherByCity
};