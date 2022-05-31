const User = require("../model/user");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Role = require("../model/role");
const jwt = require("jsonwebtoken");
require("dotenv/config");

const secret = process.env.secret;

exports.signup = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.stataCode = 422;
    throw error;
  }

  const { name, password, email, phone, role_name } = req.body;

  if (!name || !password || !email || !phone) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // checking if user already exists

  User.findOne({ email }).then((user) => {
    if (user) {
      return res.status(400).json({ message: "user already exists" });
    } else {
      //   encryptin password

      const saltRounds = 10;
      const myPlainTextPassword = password;

      Role.findOne({ role_name: role_name }, (error, result) => {
        if (error) {
          res
            .status(400)
            .json({ success: false, message: "could not find role id" });
        } else {
          const id = result._id;
          console.log(id);
          bcrypt
            .hash(myPlainTextPassword, saltRounds)
            .then((hash) => {
              const user = new User({
                name: name,
                password: hash,
                email: email,
                phone: phone,
                role_id: id,
              });

              user.save().then((user) => {
                jwt.sign(
                  { jwt_id: user.id },
                  secret,
                  { expiresIn: 3600 },
                  (error, token) => {
                    if (error) throw error;
                    res.json({
                      token,
                      user: {
                        id: user.id,
                        email: user.email,
                      },
                    });
                  }
                );
              });
            })
            .then((result) =>
              res.status(201).json({ message: "User created!" })
            )
            .catch((err) => {
              if (!err.stataCode) {
                err.stataCode = 500;
              }

              next(err);
            });
        }
      });
    }
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All inputs must be filled" });
  }

  User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.status(400).json({ message: "Could not find the user" });
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch)
        return res.status(400).json({ message: "Incorrect Email or Password" });

      jwt.sign(
        {
          id: user.id,
        },
        secret,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              email: user.email,
            },
          });
        }
      );
    });
  });
};
