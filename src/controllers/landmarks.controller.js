const { LandMark } = require("../models/landmarks");
const { Place } = require("../models/places");

const LandMarkController = {
  async create(req, res) {
    const landmark = new LandMark(req.body.landmark);
    landmark.save();

    const place = await Place.findById(req.body.placeId);
    place.landmarks.push(landmark._id);
    place.save();

    res.send(landmark);
  },

  async getAllByPlaceId(req, res) {
    const place = await Place.findById(req.params.placeId).populate(
      "landmarks"
    );

    if (!place) {
      res.status(404).send({ message: "Place not found" });
    } else {
      res.send(place.landmarks);
    }
  },

  async get(req, res) {
    const landmark = await LandMark.findById(req.params.id);
    if (!landmark) {
      res.status(404).send({ message: "Resource not found" });
    } else {
      res.send(landmark);
    }
  },

  async update(req, res) {
    const landmark = await LandMark.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );

    if (!landmark) {
      res.status(404).send({ message: "Resource not found" });
    } else {
      res.send(landmark);
    }
  },

  async delete(req, res) {
    const landmark = await LandMark.findOneAndDelete({ _id: req.params.id });
    if (!landmark) {
      res.status(404).send({ message: "Resource not found" });
    } else {
      res.send({ message: "Successfully deleted" });
    }
  },
};

module.exports = { LandMarkController };
