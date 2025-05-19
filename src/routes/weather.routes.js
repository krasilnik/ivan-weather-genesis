const express = require('express');
const router = express.Router();
const { getWeather } = require('../controllers/weather.controller');

router.get('/weather', getWeather);

module.exports = router;