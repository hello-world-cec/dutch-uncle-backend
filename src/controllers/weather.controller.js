const { Place } = require("../models/places");
const { WeatherService } = require("../services/weather.services");

const WeatherController = {
  async get(req, res) {
    const placeId = req.params.id;

    const place = await Place.findById(placeId);
    const weather = await WeatherService.getPlaceWeather();

    res.send(weather);
  },
};

module.exports = { WeatherController };
