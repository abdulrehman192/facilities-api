const { createReview, updateReview, deleteReview, getAllReviews } = require("./review.controller");

const router = require("express").Router();
const { checkToken } = require("../../auth/validation-token");

router.post("/create-review", checkToken, createReview);
router.patch("/update-review", checkToken, updateReview);
router.delete("/delete-review", checkToken, deleteReview);
router.post("/get-reviews", getAllReviews);

module.exports = router;