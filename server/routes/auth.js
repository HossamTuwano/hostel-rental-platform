const express = require("express");
const { validationResults } = require("express-validator");
const authController = require("../controller/auth");
const roleController = require("../controller/role");
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/role", roleController.role);
router.post("/login", authController.login);
router.get("/users", authController.get_user);

module.exports = router;
