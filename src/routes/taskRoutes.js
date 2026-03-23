const express = require("express");
const taskController = require("../controllers/taskController");

const router = express.Router();

router.get("/stats", taskController.getTaskStats);
router.get("/", taskController.getTasks);
router.post("/", taskController.postTask);
router.put("/:id", taskController.putTask);
router.delete("/:id", taskController.deleteTask);

// tags
router.post("/:id/tags", taskController.postTaskTag);

// comments
router.get("/:id/comments", taskController.getComments);
router.post("/:id/comments", taskController.postComment);
router.put("/:id/comments/:commentId", taskController.putComment);
router.delete("/:id/comments/:commentId", taskController.deleteComment);

module.exports = router;
