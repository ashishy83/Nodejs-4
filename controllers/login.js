const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const CONSTANTS = require('../config/constant')

const userLoginController = (req, res) => {
  console.log("Use logged in");
  const loginData = req.body;
  if (loginData.name && loginData.password) {
    console.log("Received login data =>", loginData);
    const user = CONSTANTS.userDetails.find(
      (user) => user.username === loginData.username
    );
    if (user) {
      bcrypt.compare(loginData.password, user.password, (err, result) => {
        if (!result) {
          console.log(result);
          res.status(400).json({ message: "Invalid credentials" });
        } else {
          const jwtToken = jwt.sign(loginData, CONSTANTS.SECRET_KEY);
          res.status(200).json({
            message: "USer LOgged in Successfully",
            token: jwtToken,
          });
        }
      });

    } else {
      res.status(400).json({
        message: "Invalid Credentials",
      });
    }
  } else {
    return res.status(400).json({ message: "Invalid Credentials" });
  }
};

module.exports = { userLoginController };
