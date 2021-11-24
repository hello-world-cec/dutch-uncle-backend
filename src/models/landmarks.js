const mongoose = require("mongoose");

const landMarkSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    imageURL: { type: String },
    about: { type: String },
  },
  { timestamps: true }
);

const LandMark = new mongoose.model("LandMark", landMarkSchema);

module.exports = { LandMark };
