const { Restaurant } = require("../models/restaurants");
const { Place } = require("../models/places");

const RestaurantController = {
  async create(req, res) {
    const restaurant = new Restaurant(req.body.restaurant);
    restaurant.save();

    const place = await Place.findById(req.body.placeId);
    place.restaurants.push(restaurant._id);
    place.save();

    res.send(restaurant);
  },

  async getAllByPlaceId(req, res) {
    const place = await Place.findById(req.params.placeId).populate(
      "restaurants"
    );
    res.send(place.restaurants);
  },

  async get(req, res) {
    const restaurant = await Restaurant.findById(req.params.id);
    res.send(restaurant);
  },

  async update(req, res) {
    const restaurant = await Restaurant.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    res.send(restaurant);
  },

  async delete(req, res) {
    await Restaurant.findOneAndDelete({ _id: req.params.id });
    res.send({ message: "Successfully deleted" });
  },
};

module.exports = { RestaurantController };
