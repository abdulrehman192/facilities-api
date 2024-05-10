const { createUser, getAllUsers, updateUser, deleteUser, getOneUserById, sendNotification, login, updateUserFcm } = require("./user.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/validation-token");
const { uploadFile } = require("../file-uploader");

// Middleware to conditionally use multer based on imageUrl presence
const uploadIfImageUrl = (req, res, next) => {
  uploadFile(req, res, next); 
};


router.post("/create-user", uploadIfImageUrl, createUser);
router.patch("/update-user", checkToken, uploadIfImageUrl, updateUser);
router.delete("/delete-user", checkToken, deleteUser);
router.post("/get-all-users", checkToken, getAllUsers);
router.post("/get-one-user-by-id", checkToken, getOneUserById);
router.post("/login", login);
router.post("/update-fcm", checkToken, updateUserFcm);
router.post("/send-notifications", sendNotification);

module.exports = router;
