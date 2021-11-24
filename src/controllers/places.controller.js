const { reset } = require("nodemon");
const { Place } = require("../models/places");

const PlacesController = {
  async getAll(req, res) {
    res.send(await Place.find({}));
  },

  async getByName(req, res) {
    const place = await Place.findOne({ name: req.params.name }).populate([
      "news",
      "landmarks",
      "services",
      "restaurants",
    ]);
    if (!place) {
      res.status(404).send({ message: "Place not found" });
    } else {
      res.send(place);
    }
  },

  async create(req, res) {
    const isExists = await Place.findOne({ name: req.body.name }).select("_id");

    if (!isExists) {
      const place = new Place(req.body);
      place.save();
      res.send(place);
    } else {
      res.send({ message: "Place already exists", id: isExists._id });
    }
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
