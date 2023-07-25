const express = require("express");
const cors = require("cors");
const app = express();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = require("./models/user");

//https://www.npmjs.com/package/bcrypt
const saltRounds = 10;
const myPlaintextPassword = "s0//P4$$w0rD";
const someOtherPlaintextPassword = "not_bacon";

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://nskingdev:62TtcSzEieARXAZS@cluster0.zrtybye.mongodb.net/?retryWrites=true&w=majority"
);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, saltRounds),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(400).json(e);
  }
});

app.listen(4000);
//nskingdev
//OVGhKDUp1mlZnHvb
