const { createBooking, updateBooking, deleteBooking, getAllUserBookings, cancelBooking} = require("./booking.controller");

const router = require("express").Router();
const { checkToken } = require("../../auth/validation-token");

router.post("/create-user-booking", checkToken, createBooking);
router.patch("/update-user-booking", checkToken, updateBooking);
router.patch("/cancel-user-booking", checkToken, cancelBooking);
router.delete("/delete-user-booking", checkToken, deleteBooking);
router.get("/get-user-bookings", checkToken, getAllUserBookings);

module.exports = router;