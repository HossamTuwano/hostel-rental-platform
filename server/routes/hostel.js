const express = require("express");
const hostelController = require("../controller/hostel")

const router = express.Router()

router.post("/add-hostel", hostelController.addHostel)


module.exports = router