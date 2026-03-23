const db = require("../db")

const getAllUsers = async (search, sort) => {
  let query = "SELECT * FROM users"
  const params = []

  if (search) {
    query += " WHERE name LIKE ?"
    params.push(`%${search}%`)
  }

  if (sort === "asc") {
    query += " ORDER BY name ASC"
  } else if (sort === "desc") {
    query += " ORDER BY name DESC"
  }

  const [rows] = await db.query(query, params)
  return rows
};

const getUserStats = async () => {
  const [[{ total }]] = await db.query("SELECT COUNT(*) as total FROM users")
  const [[{ active }]] = await db.query("SELECT COUNT(*) as active FROM users WHERE active = 1")
  const activePercentage = total > 0 ? Math.round((active / total) * 100) : 0

  return { total, active, activePercentage }
};

const postUser = async (data) => {
  if (!data.name) {
    throw new Error("Name is required");
  }

  if (!data.email || !data.email.includes("@")) {
    throw new Error("Invalid email");
  }

  const [result] = await db.query(
    "INSERT INTO users (name, email) VALUES (?, ?)",
    [data.name, data.email]
  )
  
  const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [result.insertId])
  return rows[0]
};

const putUser = async (userId, data) => {
  if (data.email && !data.email.includes("@")) {
    throw new Error("Invalid email");
  }

  await db.query(
    "UPDATE users SET name = ?, email = ? WHERE id = ?",
    [data.name, data.email, userId]
  )

  const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [userId])
  return rows[0]
};

const deleteUser = async (userId) => {
  const [existing] = await db.query("SELECT * FROM users WHERE id = ?", [userId])
  await db.query("DELETE FROM users WHERE id = ?", [userId])
  return existing[0]
};

const toggleUserActive = async (userId) => {
  const [existing] = await db.query("SELECT * FROM users WHERE id = ?", [userId])
  const newActive = existing[0].active ? 0 : 1
  await db.query("UPDATE users SET active = ? WHERE id = ?", [newActive, userId])

  const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [userId])
  return rows[0]
};

const getUserById = async (userId) => {
  const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [userId])
  return rows[0]
};

module.exports = { getAllUsers, postUser, putUser, deleteUser, toggleUserActive, getUserStats, getUserById };
