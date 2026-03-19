const taskService = require("../services/taskService");

const getTasks = async (req, res) => {
  try {
    const { search, sort } = req.query;
    const tasks = await taskService.getAllTasks(search, sort);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postTask = async (req, res) => {
  try {
    const task = await taskService.postTask(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const putTask = async (req, res) => {
  try {
    const task = await taskService.putTask(req.params.id, req.body);
    res.status(200).json(task);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const result = await taskService.deleteTask(req.params.id);
    res.status(200).json({ message: "Task deleted", ...result });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getTaskStats = async (req, res) => {
  try {
    const stats = await taskService.getTaskStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTasks, postTask, putTask, deleteTask, getTaskStats };
