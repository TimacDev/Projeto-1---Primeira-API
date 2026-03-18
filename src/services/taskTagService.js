const taskService = require("./taskService");
const tagService = require("./tagService");

let taskTags = [
  { id: 1, taskId: 1, tagId: 1 }
];
let id = 2;

const getAllTaskTags = () => {
  return taskTags;
};

const postTaskTag = (taskId, tagId) => {
  const task = taskService.getTaskById(taskId);
  if (!task) {
    throw new Error("Task not found");
  }

  const tag = tagService.getTagById(tagId);
  if (!tag) {
    throw new Error("Tag not found");
  }

  const duplicate = taskTags.find(
    (tt) => tt.taskId === parseInt(taskId) && tt.tagId === parseInt(tagId),
  );
  if (duplicate) {
    throw new Error("Tag already assigned to this task");
  }

  const taskTag = {
    id: id++,
    taskId: parseInt(taskId),
    tagId: parseInt(tagId),
  };

  taskTags.push(taskTag);
  return taskTag;
};

const deleteTaskTag = (id) => {
  const index = taskTags.findIndex((tt) => tt.id === parseInt(id));
  if (index === -1) {
    throw new Error("TaskTag not found");
  }
  const deleted = taskTags.splice(index, 1)[0];
  return deleted;
};

const putTaskTag = (id, taskId, tagId) => {
  const taskTag = taskTags.find((tt) => tt.id === parseInt(id));
  if (!taskTag) {
    throw new Error("TaskTag not found");
  }

  const task = taskService.getTaskById(taskId);
  if (!task) {
    throw new Error("Task not found");
  }

  const tag = tagService.getTagById(tagId);
  if (!tag) {
    throw new Error("Tag not found");
  }

  taskTag.taskId = parseInt(taskId);
  taskTag.tagId = parseInt(tagId);
  return taskTag;
};

const deleteByTagId = (tagId) => {
  taskTags = taskTags.filter((tt) => tt.tagId !== parseInt(tagId));
};

const getTasksByTagId = (tagId) => {
  const tagTaskIds = taskTags.filter((tt) => tt.tagId === parseInt(tagId)).map((tt) => tt.taskId);

  return tagTaskIds.map((taskId) => taskService.getTaskById(taskId)).filter(Boolean);
};

module.exports = { getAllTaskTags, postTaskTag, deleteTaskTag, putTaskTag, deleteByTagId, getTasksByTagId };
