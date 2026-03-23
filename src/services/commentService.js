const db = require("../db");

const getCommentsByTaskId = async (taskId) => {
  const [rows] = await db.query("SELECT * FROM comments WHERE task_id = ? ORDER BY created_at ASC", [taskId]);
  return rows;
};

const postComment = async (taskId, data) => {
  const [result] = await db.query("INSERT INTO comments (task_id, user_id, content) VALUES (?, ?, ?)", [taskId, data.userId, data.content]);

  const [rows] = await db.query("SELECT * FROM comments WHERE id = ?", [result.insertId]);
  return rows[0];
};

const updateComment = async (commentId, data) => {
  const [result] = await db.query("UPDATE comments SET content = ? WHERE id = ?", [data.content, commentId]);

  if (result.affectedRows === 0) {
    throw new Error("Comment not found");
  }

  const [rows] = await db.query("SELECT * FROM comments WHERE id = ?", [commentId]);
  return rows[0];
};

const deleteComment = async (commentId) => {
  const [result] = await db.query("DELETE FROM comments WHERE id = ?", [commentId]);

  if (result.affectedRows === 0) {
    throw new Error("Comment not found");
  }

  return result;
};

module.exports = { getCommentsByTaskId, postComment, updateComment, deleteComment };
