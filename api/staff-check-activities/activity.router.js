const { createCheck, updateCheck, getMyCheckHistory, getStaffCheckHistory } = require("./activity.controller");

const router = require("express").Router();
const { checkToken } = require("../../auth/validation-token");

router.post("/create-check", checkToken, createCheck);
router.patch("/update-check", checkToken, updateCheck);
router.delete("/get-my-check-history", checkToken, getMyCheckHistory);
router.delete("/get-staff-check-history", checkToken, getStaffCheckHistory);

module.exports = router;