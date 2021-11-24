const { News } = require("../models/news");
const { Place } = require("../models/places");

const NewsController = {
  async create(req, res) {
    const news = new News(req.body.news);
    news.save();

    const place = await Place.findById(req.body.placeId);
    place.news.push(news._id);
    place.save();

    res.send(news);
  },

  async getAllByPlaceId(req, res) {
    const place = await Place.findById(req.params.placeId).populate("news");
    if (!place) {
      res.status(404).send({ message: "Place not found" });
    } else {
      res.send(place.news);
    }
  },

  async get(req, res) {
    const news = await News.findById(req.params.id);
    if (!news) {
      res.status(404).send({ message: "Place not found" });
    } else {
      res.send(news);
    }
  },

  async update(req, res) {
    const news = await News.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });
    if (!news) {
      res.status(404).send({ message: "Place not found" });
    } else {
      res.send(news);
    }
  },

  async delete(req, res) {
    const news = await News.findOneAndDelete({ _id: req.params.id });
    if (!news) {
      res.status(404).send({ message: "Place not found" });
    } else {
      res.send({ message: "Successfully deleted" });
    }
  },
};

module.exports = { NewsController };
