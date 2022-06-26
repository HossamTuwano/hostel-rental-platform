const express = require("express");
const hostelController = require("../controller/hostel");
const isAuth = require("../middleware/is-auth");
const {
  verifyUser,
  canUpdate,
  canDelete,
} = require("../middleware/permission");

const router = express.Router();

router.post("/add-hostel", verifyUser, hostelController.addHostel);


router.post("/hostels", hostelController.getHostel);


router.get("/hostels", hostelController.getHostel);
// delete hostel
router.delete(
  "/delete_hostel/:_id",
  verifyUser,
  canDelete,
  hostelController.delete_hostel
);

// route for single hostel
router.get("/hostel/:_id", hostelController.get_single_hostel);

// route for updating hostel
router.put(
  "/update_hostel/:_id",
  verifyUser,
  canUpdate,
  hostelController.update_hostel
);

router.post("/update_status", hostelController.update_status);

// search hostel

router.get("/hostels/:hostel_name", hostelController.search_hostel);

// get similar hostel

router.get(
  "/similar_hostels/:contact_name",
  hostelController.get_similar_hostels
);

// get booking listing

router.get("/get_booking_listing", hostelController.get_booking_listing);

// accept booking

router.post("/accept_booking", hostelController.accept_booking);

module.exports = router;
