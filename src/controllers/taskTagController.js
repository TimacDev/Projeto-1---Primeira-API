const taskTagService = require("../services/taskTagService");

const getTaskTags = async (req, res) => {
  try {
    const taskTags = await taskTagService.getAllTaskTags();
    res.json(taskTags);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postTaskTag = async (req, res) => {
  try {
    const taskTag = await taskTagService.postTaskTag(req.params.id, req.body.tagId);
    res.status(201).json(taskTag);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const putTaskTag = async (req, res) => {
  try {
    const taskTag = await taskTagService.putTaskTag(
      req.params.id,
      req.body.taskId,
      req.body.tagId,
    );
    res.json(taskTag);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteTaskTag = async (req, res) => {
  try {
    await taskTagService.deleteTaskTag(req.params.id);
    res.status(200).json({ message: "TaskTag deleted" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { getTaskTags, postTaskTag, putTaskTag, deleteTaskTag };
