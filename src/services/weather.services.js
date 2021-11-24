const axios = require("axios");

const WeatherService = {
  async getPlaceWeather(name) {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${process.env.OPENWEATHER_API_KEY}`
    );

    return await response.data;
  },
};

module.exports = { WeatherService };
