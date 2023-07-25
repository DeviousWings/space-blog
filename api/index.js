const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/user");

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://nskingdev:<OVGhKDUp1mlZnHvb>@cluster0.zrtybye.mongodb.net/"
);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.create({
    username,
    password,
  });
  res.json(userDoc);
});

app.listen(4000);
//nskingdev
//OVGhKDUp1mlZnHvb
