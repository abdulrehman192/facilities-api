const { createTask, updateTask, deleteTask } = require("./task.controller");

const router = require("express").Router();
const { checkToken } = require("../../auth/validation-token");

router.post("/create-task", checkToken, createTask);
router.patch("/update-task", checkToken, updateTask);
router.delete("/delete-task", checkToken, deleteTask);

module.exports = router;