const { Place } = require("../models/places");
const { WeatherService } = require("../services/weather.services");

const WeatherController = {
  async get(req, res) {
    const placeId = req.params.id;

    const place = await Place.findById(placeId);
    if (!place) {
      res.status(404).send({ message: "Place not found" });
    } else {
      try {
        const weather = await WeatherService.getPlaceWeather(place.name);
        res.send(weather);
      } catch (e) {
        res
          .status(500)
          .send({ message: "Error occurred during weather fetch" });
      }
    }
  },
};

module.exports = { WeatherController };
