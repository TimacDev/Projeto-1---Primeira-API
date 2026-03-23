const tagService = require("../services/tagService");

const getTags = async (req, res) => {
  try {
    const tags = await tagService.getAllTags();
    res.json(tags);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postTag = async (req, res) => {
  try {
    const tag = await tagService.postTag(req.body);
    res.status(201).json(tag);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteTag = async (req, res) => {
  try {
    const tag = await tagService.deleteTag(req.params.id);
    res.status(200).json({ message: "Tag deleted", tag });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getTasksByTag = async (req, res) => {
  try {
    const tasks = await tagService.getTasksByTagId(req.params.id);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTags, postTag, deleteTag, getTasksByTag };
