const { createUser, getAllStaffAccounts, updateStaffAccount, deleteStaffAccount, getOneStaffAccountById, staffLogin, createStaffAccount } = require("./staff.controller");
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
    // No imageUrl provided, proceed to the next middleware or route handler
    next();
  }
};


router.post("/create-staff-account", uploadIfImageUrl, createStaffAccount);
router.patch("/update-staff-account", checkToken, uploadIfImageUrl, updateStaffAccount);
router.delete("/delete-staff-account", checkToken, deleteStaffAccount);
router.post("/get-all-staff-accounts", checkToken, getAllStaffAccounts);
router.post("/get-one-staff-by-id", checkToken, getOneStaffAccountById);
router.post("/staffLogin", staffLogin);

module.exports = router;
