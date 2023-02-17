require("dotenv").config();
const express = require("express");
const { userModel } = require("../Model/user.model");
const { userRegister, userSignin } = require("../Controllers/user.controller");
const userRoute = express.Router();
var key = process.env.SECRET_KEY;
// /for test use
userRoute.get("/", async (req, res) => {
  let alluser = await userModel.find();
  res.end(alluser);
});

userRoute.post("/register", userRegister);
userRoute.post("/signin", userSignin);
module.exports = { userRoute };
