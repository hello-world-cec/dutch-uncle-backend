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
    res.send(place.landmarks);
  },

  async get(req, res) {
    const landmark = await LandMark.findById(req.params.id);
    res.send(landmark);
  },

  async update(req, res) {
    const landmark = await LandMark.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    res.send(landmark);
  },

  async delete(req, res) {
    await LandMark.findOneAndDelete({ _id: req.params.id });
    res.send({ message: "Successfully deleted" });
  },
};

module.exports = { LandMarkController };
