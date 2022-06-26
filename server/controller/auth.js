const User = require("../model/user");
const crypto = require("crypto");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Role = require("../model/role");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");
require("dotenv/config");

const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key: `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 `,
    },
  })
);
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
      //   encrypting password

      const saltRounds = 10;
      const myPlainTextPassword = password;

      Role.findOne({ role_name: role_name }, (error, result) => {
        if (error) {
          res
            .status(400)
            .json({ success: false, message: "could not find role id" });
        } else {
          const id = result?._id;
          console.log(id);
          bcrypt.hash(myPlainTextPassword, saltRounds).then((hash) => {
            const user = new User({
              name: name,
              password: hash,
              email: email,
              phone: phone,
              role_id: id,
            });

            user.save().then((user) => {
              transporter.sendMail({
                to: email,
                from: `hostelrentalplatform@gmail.com`,
                subject: "sign up succeeded",
                html: `<h1>Thank You for Signing Up to Hostel Renting Platform</h1>`,
              });
              jwt.sign(
                { jwt_id: user.id, role: user.role_name },
                secret,
                (error, token) => {
                  if (error) throw error;
                  res.json({
                    success: true,
                    token,
                    user: {
                      user: user,
                    },
                  });
                }
              );
            });
            // .then(
            //   transporter.sendMail({
            //     to: email,
            //     from: `hostelrentalplatform@gmail.com`,
            //     subject: "sign up succeeded",
            //     html: `<h1>Thank for Signing Up</h1>`,
            //   })
            // );
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
          role: user.role_id,
        },
        secret,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.set("auth", token).json({
            success: true,
            token,
            user: {
              id: user.id,
              email: user.email,
              role: user.role_id,
            },
          });
        }
      );
    });
  });
};

exports.get_user = (req, res) => {
  User.find((error, hostel) => {
    if (error) {
      return res.status(200).json({ success: false, msg: "not found" });
    } else {
      return res.status(200).json({ success: true, hostel });
    }
  });
};

exports.post_reset = (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    }
    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        return res.status(422).json({ error: true, message: "user not found" });
      }

      user.resetToken = token;
      user.expireToken = Date.now() + 3600000;
      user.save().then((result) => {
        transporter.sendMail({
          to: user.email,
          from: `hostelrentalplatform@gmail.com`,
          subject: "sign up succeeded",
          html: `<h1>You requested a new password reset</h1>
           <h5>Click on this  <a href="http://localhost:3000/reset/${token}"> link</a>
        `,
        });
        res.json({ message: "check your email" });
      });
    });
  });
};

exports.new_password = (req, res) => {
  const newPassword = req.body.password;
  const sentToken = req.body.token;

  User.findOne({
    resetToken: sentToken,
    expireToken: { $gt: Date.now() },
  }).then((user) => {
    if (!user) {
      return res
        .status(422)
        .json({ message: "Error Try Again Session Expired" });
    }
    bcrypt
      .hash(newPassword, 12)
      .then((hashedPassword) => {
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.expireToken = undefined;
        user.save().then((savedUser) => {
          res.json({ message: "Password Updated Successfully" });
        });
      })
      .catch((error) => console.log(error));
  });
};
