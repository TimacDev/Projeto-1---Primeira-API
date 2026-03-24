const taskUserService = require("../services/taskUserService");

const getTaskUsers = async (req, res) => {
  try {
    const taskUsers = await taskUserService.getAllTaskUsers();
    res.json(taskUsers);

  } catch (error) {
    res.status(500).json({ message: "Error fetching task users" });
  }
};

const postTaskUser = async (req, res) => {
  try {
    const taskUser = await taskUserService.postTaskUser(req.body);
    res.status(201).json(taskUser);

  } catch (error) {
    res.status(500).json({ message: "Error assigning user to task" });
  }
};

const putTaskUser = async (req, res) => {
  try {
    const taskUser = await taskUserService.putTaskUser(req.params.id, req.body);

    if (!taskUser) {
      return res.status(404).json({ message: "TaskUser not found" });
    }

    res.status(200).json(taskUser);

  } catch (error) {
    res.status(500).json({ message: "Error updating task user" });
  }
};

const deleteTaskUser = async (req, res) => {
  try {
    const result = await taskUserService.deleteTaskUser(req.params.id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "TaskUser not found" });
    }

    res.status(200).json({ message: "TaskUser deleted" });

  } catch (error) {
    res.status(500).json({ message: "Error deleting task user" });
  }
};

module.exports = { getTaskUsers, postTaskUser, putTaskUser, deleteTaskUser };
