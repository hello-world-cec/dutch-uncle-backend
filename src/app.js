const express = require("express");
const app = express();
const PORT = process.env.PORT | 3000;

// Routes
app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
