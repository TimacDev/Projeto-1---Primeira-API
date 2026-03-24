const express = require("express");
const userController = require("../controllers/userController");
const checkUser = require("../middlewares/checkUserExists");

const router = express.Router();

router.get("/stats", userController.getUserStats);
router.get("/", userController.getUsers);
router.post("/", userController.postUser);
router.put("/:id", checkUser, userController.putUser);
router.patch("/:id", checkUser, userController.patchUser);
router.delete("/:id", checkUser, userController.deleteUser);
router.get("/:id/tasks", userController.getTasksByUser);

module.exports = router;
