const { createVoucher, updateVoucher, deleteVoucher, getVouchers} = require("./voucher.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/validation-token");
const { uploadFile } = require("../file-uploader");

// Middleware to conditionally use multer based on imageUrl presence
const uploadIfImageUrl = (req, res, next) => {
  uploadFile(req, res, next); 
};


router.post("/create-voucher", checkToken, uploadIfImageUrl, createVoucher);
router.patch("/update-voucher", checkToken, uploadIfImageUrl, updateVoucher);
router.delete("/delete-voucher", checkToken, deleteVoucher);
router.post("/get-vouchers", getVouchers);

module.exports = router;
