const express = require("express");
const { validationResults } = require("express-validator");
const authController = require("../controller/auth");
const roleController = require("../controller/role");
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/role", roleController.role);

module.exports = router;
