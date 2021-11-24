const axios = require("axios");

const WeatherService = {
  async getPlaceWeather() {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather?q=Chengannur&appid=73387c4e0f4fed2ef38019456b8c3125"
    );

    return await response.data;
  },
};

module.exports = { WeatherService };
