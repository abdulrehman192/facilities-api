const { createService, updateService, deleteService, getServices} = require("./service.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/validation-token");

const { uploadFile } = require("../file-uploader");

// Middleware to conditionally use multer based on imageUrl presence
const uploadIfImageUrl = (req, res, next) => {
  uploadFile(req, res, next); 
};



router.post("/create-service", checkToken, uploadIfImageUrl, createService);
router.patch("/update-service", checkToken, uploadIfImageUrl, updateService);
router.delete("/delete-service", checkToken, deleteService);
router.post("/get-all-services", getServices);

module.exports = router;
