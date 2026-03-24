const db = require("../db");

const getAllTaskTags = async () => {
  const [rows] = await db.query("SELECT * FROM task_tags");
  return rows;
};

const postTaskTag = async (taskId, tagId) => {
  const [duplicate] = await db.query("SELECT * FROM task_tags WHERE task_id = ? AND tag_id = ?", [taskId, tagId]);

  if (duplicate.length > 0) return { duplicate: true };

  const [result] = await db.query("INSERT INTO task_tags (task_id, tag_id) VALUES (?, ?)", [taskId, tagId]);
  return { id: result.insertId, taskId: parseInt(taskId), tagId: parseInt(tagId) };
};

const putTaskTag = async (id, taskId, tagId) => {
  const [result] = await db.query("UPDATE task_tags SET task_id = ?, tag_id = ? WHERE id = ?", [taskId, tagId, id]);

  if (result.affectedRows === 0) return null;

  const [rows] = await db.query("SELECT * FROM task_tags WHERE id = ?", [id]);
  return rows[0];
};

const deleteTaskTag = async (id) => {
  const [result] = await db.query("DELETE FROM task_tags WHERE id = ?", [id]);
  return result;
};

module.exports = { getAllTaskTags, postTaskTag, deleteTaskTag, putTaskTag };
