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
    if (!place) {
      res.status(404).send({ message: "Resource not found" });
    } else {
      res.send(place.services);
    }
  },

  async get(req, res) {
    const service = await Service.findById(req.params.id);
    if (!service) {
      res.status(404).send({ message: "Resource not found" });
    } else {
      res.send(service);
    }
  },

  async update(req, res) {
    const service = await Service.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    if (!service) {
      res.status(404).send({ message: "Resource not found" });
    } else {
      res.send(service);
    }
  },

  async delete(req, res) {
    const service = await Service.findOneAndDelete({ _id: req.params.id });
    if (!service) {
      res.status(404).send({ message: "Resource not found" });
    } else {
      res.send({ message: "Successfully deleted" });
    }
  },
};

module.exports = { ServiceController };
