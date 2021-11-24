const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    news: [{ type: mongoose.Schema.Types.ObjectId, ref: "News" }],
    landmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: "LandMark" }],
  },
  { timestamps: true }
);

const Place = new mongoose.model("Place", placeSchema);

module.exports = { Place };
