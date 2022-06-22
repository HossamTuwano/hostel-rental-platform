const express = require("express");
const router = express.Router();
const roleController = require("../controller/role");

router.post("/role", roleController.role);
router.get("/single_role/:_id", roleController.get_role);

module.exports = router;
  