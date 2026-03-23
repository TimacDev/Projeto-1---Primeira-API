const db = require("../db");

const getAllTaskTags = async () => {
  const [rows] = await db.query("SELECT * FROM task_tags");
  return rows;
};

const postTaskTag = async (taskId, tagId) => {
  const [duplicate] = await db.query("SELECT * FROM task_tags WHERE task_id = ? AND tag_id = ?", [taskId, tagId]);

  if (duplicate.length > 0) {
    throw new Error("Tag already assigned to this task");
  }

  const [result] = await db.query("INSERT INTO task_tags (task_id, tag_id) VALUES (?, ?)", [taskId, tagId]);

  const [rows] = await db.query("SELECT * FROM task_tags WHERE id = ?", [result.insertId]);
  return rows[0];
};

const putTaskTag = async (id, taskId, tagId) => {
  const [result] = await db.query("UPDATE task_tags SET task_id = ?, tag_id = ? WHERE id = ?", [taskId, tagId, id]);

  if (result.affectedRows === 0) {
    throw new Error("TaskTag not found");
  }

  const [rows] = await db.query("SELECT * FROM task_tags WHERE id = ?", [id]);
  return rows[0];
};

const deleteTaskTag = async (id) => {
  const [result] = await db.query("DELETE FROM task_tags WHERE id = ?", [id]);

  if (result.affectedRows === 0) {
    throw new Error("TaskTag not found");
  }

  return result;
};

module.exports = { getAllTaskTags, postTaskTag, deleteTaskTag, putTaskTag };
