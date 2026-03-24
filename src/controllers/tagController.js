const tagService = require("../services/tagService");

const getTags = async (req, res) => {
  try {
    const tags = await tagService.getAllTags();
    res.json(tags);

  } catch (error) {
    res.status(500).json({ message: "Error fetching tags" });
  }
};

const postTag = async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({ message: "Tag name is required" });
    }

    const tag = await tagService.postTag(req.body);
    res.status(201).json(tag);

  } catch (error) {
    res.status(500).json({ message: "Error creating tag" });
  }
};

const deleteTag = async (req, res) => {
  try {
    const result = await tagService.deleteTag(req.params.id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Tag not found" });
    }

    res.status(200).json({ message: "Tag deleted" });

  } catch (error) {
    res.status(500).json({ message: "Error deleting tag" });
  }
};

const getTasksByTag = async (req, res) => {
  try {
    const tasks = await tagService.getTasksByTagId(req.params.id);
    res.json(tasks);

  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks for tag" });
  }
};

module.exports = { getTags, postTag, deleteTag, getTasksByTag };
