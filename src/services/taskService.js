const db = require("../db")

const getAllTasks = async (search, sort) => {
  let sql = "SELECT * FROM tarefas"
  const params = []

  if (search) {
    sql += " WHERE titulo LIKE ?"
    params.push(`%${search}%`)
  }

  if (sort === "asc") {
    sql += " ORDER BY titulo ASC"
  } else if (sort === "desc") {
    sql += " ORDER BY titulo DESC"
  }

  const [rows] = await db.query(sql, params)
  return rows
}

const getTaskStats = async () => {
  const [rows] = await db.query("SELECT estado, COUNT(*) as count FROM tarefas GROUP BY estado")
  let pending = 0
  let completed = 0
  let total = 0

  for (const row of rows) {
    total += row.count
    if (row.estado === "concluida") {
      completed = row.count
    } else {
      pending += row.count
    }
  }

  return { total, pending, completed }
}

const getTaskById = async (taskId) => {
  const [rows] = await db.query("SELECT * FROM tarefas WHERE id = ?", [taskId])
  return rows[0]
}

const postTask = async (data) => {
  if (!data.titulo || data.titulo.length <= 3) {
    throw new Error("Title must have more than 3 characters")
  }

  const [result] = await db.query(
    "INSERT INTO tarefas (titulo, descricao, estado) VALUES (?, ?, ?)",
    [data.titulo, data.descricao || null, data.estado || "pendente"]
  )

  const [rows] = await db.query("SELECT * FROM tarefas WHERE id = ?", [result.insertId])
  return rows[0]
}

const putTask = async (taskId, data) => {
  const [existing] = await db.query("SELECT * FROM tarefas WHERE id = ?", [taskId])

  if (existing.length === 0) {
    throw new Error("Task not found")
  }

  await db.query(
    "UPDATE tarefas SET titulo = ?, descricao = ?, estado = ? WHERE id = ?",
    [data.titulo, data.descricao, data.estado, taskId]
  )

  const [rows] = await db.query("SELECT * FROM tarefas WHERE id = ?", [taskId])
  return rows[0]
}

const deleteTask = async (taskId) => {
  const [existing] = await db.query("SELECT * FROM tarefas WHERE id = ?", [taskId])

  if (existing.length === 0) {
    throw new Error("Task not found")
  }

  await db.query("DELETE FROM tarefas WHERE id = ?", [taskId])

  const [rows] = await db.query("SELECT estado, COUNT(*) as count FROM tarefas GROUP BY estado")
  let pending = 0
  let completed = 0

  for (const row of rows) {
    if (row.estado === "concluida") {
      completed = row.count
    } else {
      pending += row.count
    }
  }

  return { task: existing[0], pending, completed }
}

module.exports = { getAllTasks, postTask, putTask, deleteTask, getTaskStats, getTaskById };
