const express = require("express");
const taskUserController = require("../controllers/taskUserController");

const router = express.Router();

router.get("/", taskUserController.getTaskUsers);
router.post("/", taskUserController.postTaskUser);
router.put("/:id", taskUserController.putTaskUser);
router.delete("/:id", taskUserController.deleteTaskUser);

module.exports = router;
