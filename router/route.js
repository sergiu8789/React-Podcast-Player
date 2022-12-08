const express = require("express");
const User = require("../modal/user");
const route = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
route.get("/", function (req, res) {
  res.send("hello world!");
});
route.post("/api/post", async (req, res) => {
  console.log(req.body);
  const password = req.body.password;
  const cpassword = req.body.cpassword;
  const email = req.body.email;
  const data = await User.findOne({ email }).select({ email: 1 });
  if (data === null) {
    if (password === cpassword) {
      const getSalt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, getSalt);
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      });
      try {
        const data = await newUser.save();
        const token = jwt.sign(
          { user: data._id },
          "himanshuisacoderandgraficdeginer"
        );
        res.json({ token, data });
      } catch (error) {
        console.log(error);
      }
    } else {
      res.send("password does not match");
    }
  } else {
    res.send("Email already exists");
  }
});

//login user

route.post("/api/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  // console.log(req.body)
  try {
    const data = await User.findOne({ email });
    if (!data) {
      return res.send("invalid informations");
    }
    const compare = await bcrypt.compare(password, data.password);
    if (compare) {
      const token = jwt.sign(
        { user: data._id },
        "himanshuisacoderandgraficdeginer"
      );
      res.json({ token,data });
    }else{
      res.send("invalid informations");
    }
  } catch (error) {
    console.log(error);
  }
});
module.exports = route;
