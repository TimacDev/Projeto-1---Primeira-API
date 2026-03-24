const db = require("../db");

const getAllTags = async () => {
  const [rows] = await db.query("SELECT * FROM tags");
  return rows;
};

const getTagById = async (tagId) => {
  const [rows] = await db.query("SELECT * FROM tags WHERE id = ?", [tagId]);
  return rows[0];
};

const getTasksByTagId = async (tagId) => {
  const [rows] = await db.query("SELECT t.* FROM tasks t JOIN task_tags tt ON t.id = tt.task_id WHERE tt.tag_id = ?", [tagId]);
  return rows;
};

const postTag = async (data) => {
  const [result] = await db.query("INSERT INTO tags (name) VALUES (?)", [data.name]);
  return { id: result.insertId, name: data.name };
};

const deleteTag = async (tagId) => {
  await db.query("DELETE FROM task_tags WHERE tag_id = ?", [tagId]);
  const [result] = await db.query("DELETE FROM tags WHERE id = ?", [tagId]);
  return result;
};

module.exports = {
  getAllTags,
  getTagById,
  postTag,
  deleteTag,
  getTasksByTagId,
};
