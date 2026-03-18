const express = require("express");
const tagController = require("../controllers/tagController");

const router = express.Router();

router.get("/", tagController.getTags);
router.post("/", tagController.postTag);
router.delete("/:id", tagController.deleteTag);
router.get("/:id/tasks", tagController.getTasksByTag);

module.exports = router;
