const taskUserService = require("../services/taskUserService");

const getTaskUsers = (req, res) => {
  const taskUsers = taskUserService.getAllTaskUsers();
  res.json(taskUsers);
};

const postTaskUser = (req, res) => {
  const taskUser = taskUserService.postTaskUser(req.body);
  res.status(201).json(taskUser);
};

const putTaskUser = (req, res) => {
  try {
    const taskUser = taskUserService.putTaskUser(req.params.id, req.body);
    res.status(200).json(taskUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteTaskUser = (req, res) => {
  try {
    const taskUser = taskUserService.deleteTaskUser(req.params.id);
    res.status(200).json({ message: "TaskUser deleted", taskUser });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { getTaskUsers, postTaskUser, putTaskUser, deleteTaskUser };
