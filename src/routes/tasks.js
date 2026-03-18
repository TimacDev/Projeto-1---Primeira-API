const express = require("express");
const taskController = require("../controllers/taskController");
const taskTagController = require("../controllers/taskTagController");
const commentController = require("../controllers/commentController");

const router = express.Router();

router.get("/stats", taskController.getTaskStats);
router.get("/", taskController.getTasks);
router.post("/", taskController.postTask);
router.put("/:id", taskController.putTask);
router.delete("/:id", taskController.deleteTask);
router.post("/:id/tags", taskTagController.postTaskTag);
router.get("/:id/comments", commentController.getComments);
router.post("/:id/comments", commentController.postComment);

module.exports = router;
