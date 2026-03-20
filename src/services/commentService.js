const taskService = require("./taskService");
const userService = require("./userService");

const getCommentsByTaskId = (taskId) => {
  const task = taskService.getTaskById(taskId);
  if (!task) {
    throw new Error("Task not found");
  }

  return comments.filter((c) => c.taskId === parseInt(taskId));
};

const postComment = (taskId, data) => {
  const task = taskService.getTaskById(taskId);
  if (!task) {
    throw new Error("Task not found");
  }

  const user = userService.getUserById(data.userId);
  if (!user) {
    throw new Error("User not found");
  }

  const comment = {
    id: id++,
    taskId: parseInt(taskId),
    userId: data.userId,
    content: data.content,
    createdAt: new Date().toISOString(),
  };

  comments.push(comment);
  return comment;
};

const deleteComment = (commentId) => {
  const comment = comments.find((c) => c.id === parseInt(commentId));

  if (!comment) throw new Error("Comment not found");

  comments = comments.filter((c) => c.id !== parseInt(commentId));

  return comment;
};

module.exports = { getCommentsByTaskId, postComment, deleteComment };
