const { createBooking, updateBooking, deleteBooking, getAllUserBookings } = require("./booking.controller");

const router = require("express").Router();
const { checkToken } = require("../../auth/validation-token");

router.post("/create-user-booking", checkToken, createBooking);
router.patch("/update-user-booking", checkToken, updateBooking);
router.delete("/delete-user-booking", checkToken, deleteBooking);
router.get("/get-user-bookings", checkToken, getAllUserBookings);

module.exports = router;