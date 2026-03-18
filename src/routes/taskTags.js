const express = require("express");
const taskTagController = require("../controllers/taskTagController");

const router = express.Router();

router.get("/", taskTagController.getTaskTags);
router.post("/", taskTagController.postTaskTag);
router.put("/:id", taskTagController.putTaskTag);
router.delete("/:id", taskTagController.deleteTaskTag);

module.exports = router;
