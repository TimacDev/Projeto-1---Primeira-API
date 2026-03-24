const db = require("../db");

const getAllTaskUsers = async () => {
  const [rows] = await db.query("SELECT * FROM task_users");
  return rows;
};

const postTaskUser = async (data) => {
  const [result] = await db.query("INSERT INTO task_users (task_id, user_id) VALUES (?, ?)", [data.taskId, data.userId]);
  return { id: result.insertId, taskId: data.taskId, userId: data.userId };
};

const putTaskUser = async (taskUserId, data) => {
  const [result] = await db.query("UPDATE task_users SET task_id = ?, user_id = ? WHERE id = ?", [data.taskId, data.userId, taskUserId]);

  if (result.affectedRows === 0) return null;

  const [rows] = await db.query("SELECT * FROM task_users WHERE id = ?", [taskUserId]);
  return rows[0];
};

const deleteTaskUser = async (taskUserId) => {
  const [result] = await db.query("DELETE FROM task_users WHERE id = ?", [taskUserId]);
  return result;
};

module.exports = { getAllTaskUsers, postTaskUser, putTaskUser, deleteTaskUser };
