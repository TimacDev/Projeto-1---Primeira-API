const db = require("../db")

const taskService = require("./taskService");
const userService = require("./userService");

const getCommentsByTaskId = async (taskId) => {
  const task = taskService.getTaskById(taskId);
  if (!task) {
    throw new Error("Task not found");
  }

  return comments.filter((c) => c.taskId === parseInt(taskId));
};

const postComment = async (taskId, data) => {
  const task = taskService.getTaskById(taskId);
  if (!task) {
    throw new Error("Task not found");
  }

  const user = userService.getUserById(data.userId);
  if (!user) {
    throw new Error("User not found");
  }

  comments.push(comment);
  return comment;
};

const deleteComment = async (commentId) => {
  const [existing] = await db.query("SELECT * FROM comments WHERE id = ?", [commentId])

  if (existing.length === 0) {
    throw new Error("Comment not found")
  }

  await db.query("DELETE FROM comments WHERE id = ?", [commentId])

  return existing[0]
};

module.exports = { getCommentsByTaskId, postComment, deleteComment };
