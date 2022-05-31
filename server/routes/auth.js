const express = require("express");
const { validationResults } = require("express-validator");
const authController = require("../controller/auth");

const router = express.Router();

router.post("/signup", authController.signup);

module.exports = router;
