const { createAddress, updateAddress, deleteAddress, getAllUserAddresses } = require("./booking.controller");

const router = require("express").Router();
const { checkToken } = require("../../auth/validation-token");

router.post("/create-user-booking", checkToken, createAddress);
router.patch("/update-user-booking", checkToken, updateAddress);
router.delete("/delete-user-booking", checkToken, deleteAddress);
router.get("/get-user-bookings", checkToken, getAllUserAddresses);

module.exports = router;