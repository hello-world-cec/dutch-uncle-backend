const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    imageURL: { type: String },
  },
  { timestamps: true }
);

const Restaurant = new mongoose.model("Restaurant", RestaurantSchema);

module.exports = { Restaurant };
