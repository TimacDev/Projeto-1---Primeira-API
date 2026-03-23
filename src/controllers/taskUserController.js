const taskUserService = require("../services/taskUserService");

const getTaskUsers = async (req, res) => {
  try {
    const taskUsers = await taskUserService.getAllTaskUsers();
    res.json(taskUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postTaskUser = async (req, res) => {
  try {
    const taskUser = await taskUserService.postTaskUser(req.body);
    res.status(201).json(taskUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const putTaskUser = async (req, res) => {
  try {
    const taskUser = await taskUserService.putTaskUser(req.params.id, req.body);
    res.status(200).json(taskUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteTaskUser = async (req, res) => {
  try {
    await taskUserService.deleteTaskUser(req.params.id);
    res.status(200).json({ message: "TaskUser deleted" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { getTaskUsers, postTaskUser, putTaskUser, deleteTaskUser };
