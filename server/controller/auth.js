const User = require("../model/user");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

exports.signup = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.stataCode = 422;
    throw error;
  }

  const { name, password, email, phone } = req.body;

  if (!name || !password || !email || !phone) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //   encryptin password

  const saltRounds = 10;
  const myPlainTextPassword = password;

  bcrypt
    .hash(myPlainTextPassword, saltRounds)
    .then((hash) => {
      const user = new User({
        name: name,
        password: hash,
        email: email,
        phone: phone,
      });

      user.save();
    })
    .then((result) =>
      res.status(201).json({ message: "User created!", result: result })
    )
    .catch((err) => {
      if (!err.stataCode) {
        err.stataCode = 500;
      }

      next(err);
    });
};

exports.login = (req, res) => {};
