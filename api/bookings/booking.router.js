const { createBooking, updateBooking, getDateWiseBookings, updateBookingStatus, deleteBooking, getAllProfessionalBookings, getAllUserBookings, getAllBookings, cancelBooking} = require("./booking.controller");

const router = require("express").Router();
const { checkToken } = require("../../auth/validation-token");

router.post("/create-user-booking", checkToken, createBooking);
router.patch("/update-user-booking", checkToken, updateBooking);
router.patch("/cancel-user-booking", checkToken, cancelBooking);
router.patch("/update-user-booking-status", checkToken, updateBookingStatus);
router.delete("/delete-user-booking", checkToken, deleteBooking);
router.post("/get-user-bookings", checkToken, getAllUserBookings);
router.post("/get-professional-bookings", checkToken, getAllProfessionalBookings);
router.post("/get-all-bookings", checkToken, getAllBookings);
router.post("/get-date-wise-bookings", checkToken, getDateWiseBookings);

module.exports = router;