const { createAddress, updateAddress, deleteAddress, getAllUserAddresses } = require("./address.controller");

const router = require("express").Router();
const { checkToken } = require("../../auth/validation-token");

router.post("/create-user-address", checkToken, createAddress);
router.patch("/update-user-address", checkToken, updateAddress);
router.delete("/delete-user-address", checkToken, deleteAddress);
router.post("/get-user-addresses", checkToken, getAllUserAddresses);

module.exports = router;