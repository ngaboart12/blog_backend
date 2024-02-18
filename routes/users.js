const express = require("express");
const route = express.Router();
const User = require("../models/users");
var bcrypt = require("bcryptjs");

route.post("/signup", async (req, res) => {
  try {
    const exists = await User.findOne({ email: req.body.email });
    if (exists) {
      return res.json("Email Alresady Used");
    }

    const salt = await bcrypt.genSalt(12);
    const password = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: password,
    });
    await newUser.save();
    res
      .status(201)
      .json({
        data: {username:newUser.username,email:newUser.email},
        message: "User Created successfully",
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
route.get("/sigin", async (req, res) => {
  try {
    const exists = await User.findOne({ email: req.body.email });
    if (!exists) {
      return res.status(500).json("No User Found");
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      exists.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = route;
