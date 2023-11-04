const { createService, updateService, deleteService, getServices} = require("./service.controller");
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

function checkMissingElement(uploadedFiles){
  var fields = ['serviceCoverImageUrl'];
    var missing = [];
    for (const obj of uploadedFiles) {
      fields.forEach(function(field)
      {
        if(obj.fieldname === field)
        {
          if(!missing.includes(field))
          {
            missing.push(field);
          }
        }
      });
    }
    return fields.find(elementB => !missing.includes(elementB));
}

// Middleware to conditionally use multer based on imageUrl presence
const uploadIfImageUrl = (req, res, next) => {
  if (req.files && req.files.length > 0) {
    const uploadedFiles = req.files; 
    
    const missingElement = checkMissingElement(uploadedFiles);
    if(missingElement)
    {
      return res.status(404).json({
        success : 0,
        message : `${missingElement} as File is Required`
      });
    }
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
    return res.status(404).json({
      success : 0,
      message : "serviceCoverImageUrl  as File is Required"
    });
  
  }
};


const updateUploadIfImageUrl = (req, res, next) => {
  if (req.files && req.files.length > 0) {
    const uploadedFiles = req.files; 

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

router.post("/create-service", checkToken, uploadIfImageUrl, createService);
router.patch("/update-service", checkToken, updateUploadIfImageUrl, updateService);
router.delete("/delete-service", checkToken, deleteService);
router.post("/get-all-services", getServices);

module.exports = router;
