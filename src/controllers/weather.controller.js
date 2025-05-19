const weatherService = require('../services/weather.service');

exports.getWeather = async (req, res) => {
    const { city } = req.query;

    if (!city) {
        return res.status(400).json({ error: 'City is requered' });
    }

    try {
        const weather = await weatherService.getWeatherByCity(city);
        res.json(weather);
    } catch (error) {
        res.status(404).json({ error: 'City not found' });
    }
};