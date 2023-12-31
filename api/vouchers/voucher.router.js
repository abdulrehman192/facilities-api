const { createVoucher, updateVoucher, deleteVoucher, getVouchers} = require("./voucher.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/validation-token");
const multer = require('multer');

// Create a storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/files/');
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Middleware to conditionally use multer based on imageUrl presence
const uploadIfImageUrl = (req, res, next) => {
  if (req.files && req.files.length > 0) {
    const uploadedFiles = req.files; // This is an array of uploaded files
    uploadedFiles.forEach((file) => {
        // Access file information
        const fieldName = file.fieldname; // Fieldname of the input field
        const originalName = file.originalname; // Original name of the file
        const buffer = file.buffer; // Buffer containing the file data
      
        // Save the file to a directory
        // Example using the fs module:
        const fs = require('fs');
        const filePath = 'public/files/' + originalName;
        fs.writeFileSync(filePath, buffer);
      });
      next();
      
  } else {
    return res.status(401).json(
      {
        success: 0,
        message : "imageUrl as File is required"
      }
    );
  }
};


const updateUploadIfImageUrl = (req, res, next) => {
  if (req.files && req.files.length > 0) {
    const uploadedFiles = req.files; // This is an array of uploaded files
    uploadedFiles.forEach((file) => {
        // Access file information
        const fieldName = file.fieldname; // Fieldname of the input field
        const originalName = file.originalname; // Original name of the file
        const buffer = file.buffer; // Buffer containing the file data
      
        // Save the file to a directory
        // Example using the fs module:
        const fs = require('fs');
        const filePath = 'public/files/' + originalName;
        fs.writeFileSync(filePath, buffer);
      });
      next();
      
  } else {
    next();
  }
};


router.post("/create-voucher", checkToken, uploadIfImageUrl, createVoucher);
router.patch("/update-voucher", checkToken, updateUploadIfImageUrl, updateVoucher);
router.delete("/delete-voucher", checkToken, deleteVoucher);
router.post("/get-vouchers", getVouchers);

module.exports = router;
