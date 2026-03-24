const userService = require("../services/userService");
const taskService = require("../services/taskService");

const getUsers = async (req, res) => {
  try {
    const { search, sort } = req.query;
    const users = await userService.getAllUsers(search, sort);
    res.json(users);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postUser = async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({ message: "Name is required" });
    }

    if (!req.body.email || !req.body.email.includes("@")) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const user = await userService.postUser(req.body);
    res.status(201).json(user);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const putUser = async (req, res) => {
  try {
    if (req.body.email && !req.body.email.includes("@")) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const user = await userService.putUser(req.params.id, req.body);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const result = await userService.deleteUser(req.params.id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const patchUser = async (req, res) => {
  try {
    const user = await userService.toggleUserActive(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserStats = async (req, res) => {
  try {
    const stats = await userService.getUserStats();
    res.json(stats);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTasksByUser = async (req, res) => {
  try {
    const tasks = await taskService.getTasksByUserId(req.params.id);
    res.json(tasks);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  postUser,
  putUser,
  deleteUser,
  patchUser,
  getUserStats,
  getTasksByUser,
};
