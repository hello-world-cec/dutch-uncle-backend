const { Place } = require("../models/places");

const PlacesController = {
  async getAll(req, res) {
    res.send(await Place.find({}));
  },

  async create(req, res) {
    const place = new Place(req.body);
    place.save();
    res.send(place);
  },

  async get(req, res) {
    res.send(await Place.findById(req.params.id));
  },

  async update(req, res) {
    await Place.findOneAndUpdate({ _id: req.params.id }, req.body);
    res.send(await Place.findById(req.params.id));
  },

  async delete(req, res) {
    await Place.findOneAndDelete({ _id: req.params.id });
    res.send({ message: "Successfully deleted" });
  },
};

module.exports = { PlacesController };
