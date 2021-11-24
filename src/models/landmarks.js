const mongoose = require("mongoose");

const landMarkSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    about: { type: String, require: true },
  },
  { timestamps: true }
);

const LandMark = new mongoose.model("LandMark", landMarkSchema);

module.exports = { LandMark };
