const axios = require('axios');

exports.getWeatherByCity = async (city) => {
    const apiKey = process.env.WEATHER_API_KEY;
    const res = await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}`
    );

    const { temp_c, humidity, condition } = res.data.current;

    return {
        temperature: temp_c,
        humidity,
        description: condition.text,
    };
};