const taskService = require("../services/taskService");

const getTasks = (req, res) => {
  const { search, sort } = req.query;
  const tasks = taskService.getAllTasks(search, sort);
  res.json(tasks);
};

const postTask = (req, res) => {
  try {
    const task = taskService.postTask(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const putTask = (req, res) => {
  try {
    const task = taskService.putTask(req.params.id, req.body);
    res.status(200).json(task);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteTask = (req, res) => {
  try {
    const result = taskService.deleteTask(req.params.id);
    res.status(200).json({ message: "Task deleted", ...result });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getTaskStats = (req, res) => {
  const stats = taskService.getTaskStats();
  res.json(stats);
};

module.exports = { getTasks, postTask, putTask, deleteTask, getTaskStats };
