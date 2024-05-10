const { createService, getServices, updateService, deleteService, getSubServices} = require("./sub-service.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/validation-token");

const { uploadFile } = require("../file-uploader");

// Middleware to conditionally use multer based on imageUrl presence
const uploadIfImageUrl = (req, res, next) => {
  uploadFile(req, res, next); 
};

router.post("/create-sub-service", checkToken, uploadIfImageUrl, createService);
router.patch("/update-sub-service", checkToken, uploadIfImageUrl, updateService);
router.delete("/delete-sub-service", checkToken, deleteService);
router.post("/get-all-sub-services", getServices);
router.post("/get-sub-services", getSubServices);

module.exports = router;
