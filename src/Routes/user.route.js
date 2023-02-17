const express = require("express");
const { userModel } = require("../Model/user.model");
const { userRegister, userSignin } = require("../Controllers/user.controller");
const userRoute = express.Router();
// /for test use
userRoute.get("/", async (req, res) => {
  let alluser = await userModel.find();
  res.end(alluser);
});

userRoute.post("/register", userRegister);
userRoute.post("/signin", userSignin);
module.exports = { userRoute };
