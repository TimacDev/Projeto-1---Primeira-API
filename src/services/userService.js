const db = require("../db");

const getAllUsers = async (search, sort) => {
  let query = "SELECT * FROM users";
  const params = [];

  if (search) {
    query += " WHERE name LIKE ?";
    params.push(`%${search}%`);
  }

  if (sort === "asc") {
    query += " ORDER BY name ASC";
  } else if (sort === "desc") {
    query += " ORDER BY name DESC";
  }

  const [rows] = await db.query(query, params);
  return rows;
};

const getUserStats = async () => {
  const [[{ total }]] = await db.query("SELECT COUNT(*) as total FROM users");
  const [[{ active }]] = await db.query("SELECT COUNT(*) as active FROM users WHERE active = 1");
  const activePercentage = total > 0 ? Math.round((active / total) * 100) : 0;

  return { total, active, activePercentage };
};

const getUserById = async (userId) => {
  const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [userId]);
  return rows[0];
};

const postUser = async (data) => {
  const [result] = await db.query("INSERT INTO users (name, email) VALUES (?, ?)", [data.name, data.email]);
  return { id: result.insertId, name: data.name, email: data.email };
};

const putUser = async (userId, data) => {
  const [result] = await db.query("UPDATE users SET name = ?, email = ? WHERE id = ?", [data.name, data.email, userId]);
  return result;
};

const deleteUser = async (userId) => {
  const [result] = await db.query("DELETE FROM users WHERE id = ?", [userId]);
  return result;
};

const toggleUserActive = async (userId) => {
  const [existing] = await db.query("SELECT * FROM users WHERE id = ?", [userId]);

  if (existing.length === 0) return null; 

  const toggle = existing[0].active ? 0 : 1;
  await db.query("UPDATE users SET active = ? WHERE id = ?", [toggle, userId]);

  const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [userId]);
  return rows[0];
};

module.exports = {
  getAllUsers,
  postUser,
  putUser,
  deleteUser,
  toggleUserActive,
  getUserStats,
  getUserById,
};
