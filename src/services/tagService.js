const getAllTags = () => {
  return tags;
};

const getTagById = (tagId) => {
  return tags.find((t) => t.id === parseInt(tagId));
};

const postTag = (data) => {
  if (!data.name) {
    throw new Error("Tag name is required");
  }

  const tag = {
    id: id++,
    name: data.name
  };

  tags.push(tag);
  return tag;
};

const deleteTag = (tagId) => {
  const tag = tags.find((t) => t.id === parseInt(tagId));

  if (!tag) {
    throw new Error("Tag not found");
  }

  tags = tags.filter((t) => t.id !== parseInt(tagId));
  const taskTagService = require("./taskTagService");
  taskTagService.deleteByTagId(tagId);

  return tag;
};

const getTasksByTagId = (tagId) => {
  const taskTagService = require("./taskTagService");
  return taskTagService.getTasksByTagId(tagId);
};

module.exports = { getAllTags, getTagById, postTag, deleteTag, getTasksByTagId };