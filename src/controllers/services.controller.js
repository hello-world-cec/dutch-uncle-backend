const { Service } = require("../models/services");
const { Place } = require("../models/places");

const ServiceController = {
  async create(req, res) {
    const service = new Service(req.body.service);
    service.save();

    const place = await Place.findById(req.body.placeId);
    place.services.push(service._id);
    place.save();

    res.send(service);
  },

  async getAllByPlaceId(req, res) {
    const place = await Place.findById(req.params.placeId).populate("services");
    res.send(place.services);
  },

  async get(req, res) {
    const service = await Service.findById(req.params.id);
    console.log(service);
    res.send(service);
  },

  async update(req, res) {
    const service = await Service.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    res.send(service);
  },

  async delete(req, res) {
    await Service.findOneAndDelete({ _id: req.params.id });
    res.send({ message: "Successfully deleted" });
  },
};

module.exports = { ServiceController };
