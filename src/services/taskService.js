const db = require("../db")

const getAllTasks = async (search, sort) => {
  let sql = "SELECT * FROM tasks"
  const params = []

  if (search) {
    sql += " WHERE title LIKE ?"
    params.push(`%${search}%`)
  }

  if (sort === "asc") {
    sql += " ORDER BY title ASC"
  } else if (sort === "desc") {
    sql += " ORDER BY title DESC"
  }

  const [rows] = await db.query(sql, params)
  return rows
}

const getTaskStats = async () => {
  const [rows] = await db.query("SELECT status, COUNT(*) as count FROM tasks GROUP BY status")
  let pending = 0
  let completed = 0
  let total = 0

  for (const row of rows) {
    total += row.count
    if (row.status === "completed") {
      completed = row.count
    } else {
      pending += row.count
    }
  }

  return { total, pending, completed }
}

const getTaskById = async (taskId) => {
  const [rows] = await db.query("SELECT * FROM tasks WHERE id = ?", [taskId])
  return rows[0]
}

const postTask = async (data) => {
  if (!data.title || data.title.length <= 3) {
    throw new Error("Title must have more than 3 characters")
  }

  const [result] = await db.query(
    "INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)",
    [data.title, data.description || null, data.status || "pending"]
  )

  const [rows] = await db.query("SELECT * FROM tasks WHERE id = ?", [result.insertId])
  return rows[0]
}

const putTask = async (taskId, data) => {
  const [existing] = await db.query("SELECT * FROM tasks WHERE id = ?", [taskId])

  if (existing.length === 0) {
    throw new Error("Task not found")
  }

  await db.query(
    "UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?",
    [data.title, data.description, data.status, taskId]
  )

  const [rows] = await db.query("SELECT * FROM tasks WHERE id = ?", [taskId])
  return rows[0]
}

const deleteTask = async (taskId) => {
  const [existing] = await db.query("SELECT * FROM tasks WHERE id = ?", [taskId])

  if (existing.length === 0) {
    throw new Error("Task not found")
  }

  await db.query("DELETE FROM tasks WHERE id = ?", [taskId])

  const [rows] = await db.query("SELECT status, COUNT(*) as count FROM tasks GROUP BY status")
  let pending = 0
  let completed = 0

  for (const row of rows) {
    if (row.status === "completed") {
      completed = row.count
    } else {
      pending += row.count
    }
  }

  return { task: existing[0], pending, completed }
}

module.exports = { getAllTasks, postTask, putTask, deleteTask, getTaskStats, getTaskById };
