const taskTagService = require("../services/taskTagService");

const getTaskTags = (req, res) => {
  const taskTags = taskTagService.getAllTaskTags();
  res.json(taskTags);
};

const postTaskTag = (req, res) => {
  try {
    const taskTag = taskTagService.postTaskTag(req.params.id, req.body.tagId);
    res.status(201).json(taskTag);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const putTaskTag = (req, res) => {
  try {
    const taskTag = taskTagService.putTaskTag(req.params.id, req.body.taskId, req.body.tagId);
    res.json(taskTag);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteTaskTag = (req, res) => {
  try {
    const taskTag = taskTagService.deleteTaskTag(req.params.id);
    res.status(200).json({ message: "TaskTag deleted", taskTag });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { getTaskTags, postTaskTag, putTaskTag, deleteTaskTag };
