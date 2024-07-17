const express = require("express");
const User = require("../models/user");
const route = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

route.get("/", async (req, res) => {
  const userList = await User.find().select("-passwordHash");

  if (!userList) {
    return res.status(500).json({ success: false });
  }

  res.status(200).send(userList);
});

route.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).select("-passwordHash");
  if (!user) {
    return res.status(404).json({ success: false, message: "user not found" });
  }

  res.status(200).send(user);
});

route.post("/", async (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password),
    phone: req.body.phone,
    role: req.body.role,
    street: req.body.street,
    apartment: req.body.apartment,
    city: req.body.city,
    zip: req.body.zip,
    country: req.body.country,
  });
  user = await user.save();

  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "User cannot created Found" });
  }

  res.status(200).send(user);
});

route.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const secret = process.env.SECRET_KEY;

  if (!user) {
    return res.status(400).json({ success: false, message: "User not found" });
  }

  if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
    const token = jwt.sign(
      {
        userId: user.id,
      },
      secret,
      {
        expiresIn: "8d",
      }
    );
    console.log("Roleee", user.role);

    res
      .status(200)
      .send({ email: user.email, token, userID: user.id, role: user.role });
  } else {
    res.status(400).send("Wrong password");
  }
  // res.status(200).send(user)
});

module.exports = route;
