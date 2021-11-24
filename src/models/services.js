const mongoose = require("mongoose");

const ServicesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    contact: { type: String },
    distance: { type: mongoose.Schema.Types.Number },
    openingTime: { type: String },
    closingTime: { type: String },
    address: { type: String },
  },
  { timestamps: true }
);

const Service = new mongoose.model("Service", ServicesSchema);

module.exports = { Service };
