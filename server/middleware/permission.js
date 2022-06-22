require("dotenv/config");
const jwt = require("jsonwebtoken");
const Hostel = require("../model/hostel");

// checking if user can update

exports.canUpdate = async (req, res, next) => {
  const hostel = await Hostel.findOne({ _id: req.params._id });
  if (hostel.hostel_owner._id != req.user.id) {
    return res.status(401).json({
      error: true,
      message: "Not authorized!",
    });
  }

  next();
};

// verufy if owner delete hostel
exports.canDelete = async (req, res, next) => {
  const hostel = await Hostel.findOne({ _id: req.params._id });
  if (hostel?.hostel_owner._id != req.user.id) {
    return res.status(401).json({
      error: true,
      message: "Not authorized!",
    });
  }

  next();
};

//checking if the user has an access token
exports.verifyUser = (req, res, next) => {
  const accessToken = req.headers.auth;
  //checking if the header has a token
  if (!accessToken) {
    return res.status(401).json({
      error: true,
      message: "Unathorized, Please Login!",
    });
  }

  //verifying if the token is valid
  const token = accessToken.split(" ")[1];

  //verifying the token using jwt
  jwt.verify(token, "myjwtsecret", (error, payload) => {
    if (error) {
      return res.status(403).json({
        error: true,
        message: "Invalid Token!",
      });
    }

    req.user = payload;

    next();
  });
};
