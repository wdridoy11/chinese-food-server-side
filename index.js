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

app.get("/chef/:id", (req, res) => {
  const id = req.params.id;
  const selectId = chefData.find((chef) => chef.id === id);
  res.send(selectId);
});

app.listen(port, () => {
  console.log("hello chef ok", port);
});
