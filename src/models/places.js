const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    imageURL: { type: String },
    overview: { type: String },
    culture: {
      overview: { type: String },
      features: [{ type: String }],
      imageURL: { type: String },
    },
    dos: {
      overview: { type: String },
      features: [{ type: String }],
      imageURL: { type: String },
    },
    news: [{ type: mongoose.Schema.Types.ObjectId, ref: "News" }],
    landmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: "LandMark" }],
    restaurants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" }],
    services: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
  },
  { timestamps: true }
);

const Place = new mongoose.model("Place", placeSchema);

module.exports = { Place };
