const userService = require("../services/userService");

const getUsers = (req, res) => {
  const { search, sort } = req.query;
  const users = userService.getAllUsers(search, sort);
  res.json(users);
};

const postUser = (req, res) => {
  try {
    const user = userService.postUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const putUser = (req, res) => {
  try {
    const user = userService.putUser(req.params.id, req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteUser = (req, res) => {
  try {
    const user = userService.deleteUser(req.params.id);
    res.status(200).json({ message: "User deleted", user });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const patchUser = (req, res) => {
  try {
    const user = userService.toggleUserActive(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getUserStats = (req, res) => {
  const stats = userService.getUserStats();
  res.json(stats);
};

module.exports = { getUsers, postUser, putUser, deleteUser, patchUser, getUserStats };
