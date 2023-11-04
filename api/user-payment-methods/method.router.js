const { createMethod, updateMethod, deleteMethod, getAllUserMethods } = require("./method.controller");

const router = require("express").Router();
const { checkToken } = require("../../auth/validation-token");

router.post("/create-user-payment-method", checkToken, createMethod);
router.patch("/update-user-payment-method", checkToken, updateMethod);
router.delete("/delete-user-payment-method", checkToken, deleteMethod);
router.post("/get-user-payment-methods", checkToken, getAllUserMethods);

module.exports = router;