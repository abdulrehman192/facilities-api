const { createCategory, updateCategory, deleteCategory, getCategories} = require("./sub-category.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/validation-token");

const { uploadFile } = require("../file-uploader");

// Middleware to conditionally use multer based on imageUrl presence
const uploadIfImageUrl = (req, res, next) => {
  uploadFile(req, res, next); 
};

router.post("/create-service-sub-category", checkToken, uploadIfImageUrl, createCategory);
router.patch("/update-service-sub-category", checkToken, uploadIfImageUrl, updateCategory);
router.delete("/delete-service-sub-category", checkToken, deleteCategory);
router.post("/get-all-service-sub-categories", getCategories);

module.exports = router;
