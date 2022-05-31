const express = require("express");
const router = express.Router();
const roleController = require("../controller/role");

router.post("/role", roleController.role);

module.exports = router;
