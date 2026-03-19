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

const getTaskStats = () => {
  const total = tasks.length;
  const pending = tasks.filter((t) => !t.done).length;
  const completed = tasks.filter((t) => t.done).length;

  return { total, pending, completed };
};

const getTaskById = (taskId) => {
  return tasks.find((t) => t.id === parseInt(taskId));
};

const postTask = (data) => {
  if (!data.title || data.title.length <= 3) {
    throw new Error("Title must have more than 3 characters");
  }

  if (!data.assignee) {
    throw new Error("Assignee cannot be empty");
  }

  const task = {
    id: id++,
    title: data.title,
    category: data.category,
    done: false,
    assignee: data.assignee,
    completedAt: undefined,
  };

  tasks.push(task);
  return task;
};

const putTask = (taskId, data) => {
  const task = tasks.find((t) => t.id === parseInt(taskId));

  if (!task) {
    throw new Error("Task not found");
  }

  task.title = data.title;
  task.category = data.category;
  task.assignee = data.assignee;
  task.done = data.done;

  if (data.done === true) {
    task.completedAt = new Date().toISOString();
  } else {
    task.completedAt = undefined;
  }

  return task;
};

const deleteTask = (taskId) => {
  const task = tasks.find((t) => t.id === parseInt(taskId));

  if (!task) throw new Error("Task not found");

  tasks = tasks.filter((t) => t.id !== parseInt(taskId));

  const pending = tasks.filter((t) => !t.done).length;
  const completed = tasks.filter((t) => t.done).length;

  return { task, pending, completed };
};

module.exports = { getAllTasks, postTask, putTask, deleteTask, getTaskStats, getTaskById };
