const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    source: { type: String, required: false },
  },
  { timestamps: true }
);

const News = new mongoose.model("News", NewsSchema);

module.exports = { News };
