const db = require("../db")

const getAllTags = async () => {
  const [rows] = await db.query("SELECT * FROM tags")
  return rows
};

const getTagById = async (tagId) => {
  const [rows] = await db.query("SELECT * FROM tags WHERE id = ?", [tagId])
  return rows[0]
};

const postTag = async (data) => {
  if (!data.name) {
    throw new Error("Tag must have a name")
  }

  const [result] = await db.query(
    "INSERT INTO tags (name) VALUES (?)",
    [data.name]
  )

  const [rows] = await db.query("SELECT * FROM tags WHERE id = ?", [result.insertId])
  return rows[0]
};

const deleteTag = async (tagId) => {
  const [existing] = await db.query("SELECT * FROM tags WHERE id = ?", [tagId])

  if (existing.length === 0) {
    throw new Error("Tag not found")
  }

  await db.query("DELETE FROM tags WHERE id = ?", [tagId])

  return existing[0]
};

const getTasksByTagId = async (tagId) => {
  const [rows] = await db.query("SELECT * FROM tags WHERE id = ?", [tagId])
  return rows[0]
};

module.exports = { getAllTags, getTagById, postTag, deleteTag, getTasksByTagId };