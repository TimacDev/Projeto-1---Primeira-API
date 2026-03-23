const db = require("../db");

const getCommentsByTaskId = async (taskId) => {
  const [rows] = await db.query("SELECT * FROM comments WHERE task_id = ?", [
    taskId,
  ]);
  return rows;
};

const postComment = async (taskId, data) => {
  const [result] = await db.query(
    "INSERT INTO comments (task_id, user_id, content) VALUES (?, ?, ?)",
    [taskId, data.userId, data.content],
  );

  const [rows] = await db.query("SELECT * FROM comments WHERE id = ?", [
    result.insertId,
  ]);
  return rows[0];
};

const deleteComment = async (commentId) => {
  const [existing] = await db.query("SELECT * FROM comments WHERE id = ?", [
    commentId,
  ]);

  if (existing.length === 0) {
    throw new Error("Comment not found");
  }

  await db.query("DELETE FROM comments WHERE id = ?", [commentId]);

  return existing[0];
};

module.exports = { getCommentsByTaskId, postComment, deleteComment };
