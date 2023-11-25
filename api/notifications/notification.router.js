const { createNotifications, getNotifications } = require("./notification.controller");

const router = require("express").Router();
const { checkToken } = require("../../auth/validation-token");

router.post("/create-notification", checkToken, createNotifications);
router.post("/get-notifications", checkToken, getNotifications);

module.exports = router;