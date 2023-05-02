const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const chefData = require("./data/chefData.json");

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello chef");
});

app.get("/chef", (req, res) => {
  res.send(chefData);
});

app.listen(port, () => {
  console.log("hello chef ok", port);
});
