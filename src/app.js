const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

require("dotenv").config();

mongoose.connect(process.env.MONGODB_CONNECTION_URL);

const PORT = process.env.PORT | 3000;

const { NewsController } = require("./controllers/news.controller");
const { PlacesController } = require("./controllers/places.controller");
const { LandMarkController } = require("./controllers/landmarks.controller");

// middleware
app.use(bodyParser.json());

// Routes
const newsRouter = express.Router();
const placeRouter = express.Router();
const landMarkRouter = express.Router();

app.use("/api/v1/news", newsRouter);
app.use("/api/v1/places", placeRouter);
app.use("/api/v1/landmarks/", landMarkRouter);

// place routes
placeRouter.get("/", PlacesController.getAll);
placeRouter.post("/", PlacesController.create);
placeRouter.put("/:id", PlacesController.update);
placeRouter.delete("/:id", PlacesController.delete);
placeRouter.get("/:id", PlacesController.get);

// News Routes
newsRouter.post("/", NewsController.create);
newsRouter.get("/:id", NewsController.get);
newsRouter.get("/place/:placeId", NewsController.getAllByPlaceId);
newsRouter.put("/:id", NewsController.update);
newsRouter.delete("/:id", NewsController.delete);

// landmark routes
landMarkRouter.post("/", LandMarkController.create);
landMarkRouter.get("/:id", LandMarkController.get);
landMarkRouter.get("/place/:placeId", LandMarkController.getAllByPlaceId);
landMarkRouter.put("/:id", LandMarkController.update);
landMarkRouter.delete("/:id", LandMarkController.delete);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
