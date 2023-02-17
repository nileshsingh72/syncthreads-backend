const { userModel } = require("../Model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRegister = async (req, res) => {
  const { email, password } = req.body;
  const isPresent = await userModel.findOne({ email: email });
  if (isPresent) {
    res.json({ status: false, message: "User already registered!" });
  } else {
    try {
      bcrypt.hash(password, 8, async function (err, hash) {
        if (err) {
          console.log(err);
          res.json({ status: false, message: err.message });
        } else {
          const newUser = new userModel({ ...req.body, password: hash });
          await newUser.save();
          res.json({ status: true, message: "User successfully registered!" });
        }
      });
    } catch (error) {
      res.json({ status: false, message: error.message });
    }
  }
};

const userSignin = async (req, res) => {
  const { email, password } = req.body;

  const isExist = await userModel.findOne({ email });
  if (!isExist) {
    res.json({ status: false, message: "No user with that email" });
  } else {
    let hashpassword = isExist.password;
    try {
      bcrypt.compare(password, hashpassword, async (err, result) => {
        if (err) {
          res.json({ status: false, message: err.message });
        } else {
          if (!result) {
            res.json({ status: false, message: "wrong password" });
          } else {
            var token = jwt.sign(
              {
                data: isExist,
              },
              key,
              { expiresIn: "1h" }
            );

            res.json({
              status: true,
              message: "Login successful",
              token: token,
              user: isExist,
            });
          }
        }
      });
    } catch (error) {
      res.json({ status: false, message: error.message });
    }
  }
};

module.exports = { userRegister, userSignin };
