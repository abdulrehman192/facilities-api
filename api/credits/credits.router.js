const { createCredit, updateCredit, deleteCredit, getAllUserCredits } = require("./credits.controller");

const router = require("express").Router();
const { checkToken } = require("../../auth/validation-token");

router.post("/create-user-credit", checkToken, createCredit);
router.patch("/update-user-credit", checkToken, updateCredit);
router.delete("/delete-user-credit", checkToken, deleteCredit);
router.post("/get-user-credits", checkToken, getAllUserCredits);

module.exports = router;