const { createCategory, updateCategory, deleteCategory, getCategories} = require("./category.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/validation-token");

const { uploadFile } = require("../file-uploader");

// Middleware to conditionally use multer based on imageUrl presence
const uploadIfImageUrl = (req, res, next) => {
  uploadFile(req, res, next); 
};

router.post("/create-service-category", checkToken, uploadIfImageUrl, createCategory);
router.patch("/update-service-category", checkToken, uploadIfImageUrl, updateCategory);
router.delete("/delete-service-category", checkToken, deleteCategory);
router.post("/get-all-service-categories", getCategories);

module.exports = router;
