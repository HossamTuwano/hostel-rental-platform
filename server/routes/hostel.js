const express = require("express");
const hostelController = require("../controller/hostel");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.post("/add-hostel", hostelController.addHostel);
router.get("/hostels", hostelController.getHostel);

module.exports = router;
