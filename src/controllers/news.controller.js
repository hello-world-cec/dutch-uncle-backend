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
    res.send(place.news);
  },

  async get(req, res) {
    const news = await News.findById(req.params.id);
    res.send(news);
  },

  async update(req, res) {
    const news = await News.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });
    res.send(news);
  },

  async delete(req, res) {
    await News.findOneAndDelete({ _id: req.params.id });
    res.send({ message: "Successfully deleted" });
  },
};

module.exports = { NewsController };
