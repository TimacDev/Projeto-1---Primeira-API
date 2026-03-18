const tagService = require("../services/tagService");

const getTags = (req, res) => {
  const tags = tagService.getAllTags();
  res.json(tags);
};

const postTag = (req, res) => {
  try {
    const tag = tagService.postTag(req.body);
    res.status(201).json(tag);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteTag = (req, res) => {
  try {
    const tag = tagService.deleteTag(req.params.id);
    res.status(200).json({ message: "Tag deleted", tag });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getTasksByTag = (req, res) => {
  const tasks = tagService.getTasksByTagId(req.params.id);
  res.json(tasks);
};

module.exports = { getTags, postTag, deleteTag, getTasksByTag };
