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
    const place = await Place.findById(req.params.id);
    if (!place) {
      res.status(404).send({ message: "Resource not found" });
    } else {
      res.send(place);
    }
  },

  async update(req, res) {
    const place = await Place.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    if (!place) {
      res.status(404).send({ message: "Resource not found" });
    } else {
      res.send(place);
    }
  },

  async delete(req, res) {
    const place = await Place.findOneAndDelete({ _id: req.params.id });
    if (!place) {
      res.status(404).send({ message: "Resource not found" });
    } else {
      res.send({ message: "Successfully deleted" });
    }
  },
};

module.exports = { PlacesController };
