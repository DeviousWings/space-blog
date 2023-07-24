const express = require("express");
const app = express();

app.post("/register", (req, res) => {
  res.json("test ok2");
});

app.listen(4000);
