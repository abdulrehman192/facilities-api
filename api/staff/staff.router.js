const { createUser, getAllStaffAccounts, sendBookingNotification, updatePassword, updateStaffAccount, updateStaffFcm, sendNotification, deleteStaffAccount, getOneStaffAccountById, staffLogin, createStaffAccount } = require("./staff.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/validation-token");

const { uploadFile } = require("../file-uploader");

// Middleware to conditionally use multer based on imageUrl presence
const uploadIfImageUrl = (req, res, next) => {
  uploadFile(req, res, next); 
};

router.post("/create-staff-account", uploadIfImageUrl, createStaffAccount);
router.patch("/update-staff-account", checkToken, uploadIfImageUrl, updateStaffAccount);
router.delete("/delete-staff-account", checkToken, deleteStaffAccount);
router.post("/get-all-staff-accounts", getAllStaffAccounts);
router.post("/get-one-staff-by-id", checkToken, getOneStaffAccountById);
router.post("/staffLogin", staffLogin);
router.post("/update-fcm", checkToken, updateStaffFcm);
router.post("/update-password", checkToken, updatePassword);
router.post("/send-notifications", sendNotification);
router.post("/send-booking-notifications", sendBookingNotification);

module.exports = router;
