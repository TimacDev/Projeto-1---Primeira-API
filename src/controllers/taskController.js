const taskService = require("../services/taskService");
const commentService = require("../services/commentService");
const taskTagService = require("../services/taskTagService");

// --- Tasks ---

const getTasks = async (req, res) => {
  try {
    const { search, sort } = req.query;
    const tasks = await taskService.getAllTasks(search, sort);
    res.json(tasks);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postTask = async (req, res) => {
  try {
    if (!req.body.title || req.body.title.length <= 3) {
      return res.status(400).json({ message: "Title must have more than 3 characters" });
    }

    const task = await taskService.postTask(req.body);
    res.status(201).json(task);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const putTask = async (req, res) => {
  try {
    const task = await taskService.putTask(req.params.id, req.body);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await taskService.deleteTask(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted", task });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTaskStats = async (req, res) => {
  try {
    const stats = await taskService.getTaskStats();
    res.json(stats);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- Comments ---

const getComments = async (req, res) => {
  try {
    const comments = await commentService.getCommentsByTaskId(req.params.id);
    res.json(comments);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postComment = async (req, res) => {
  try {
    const comment = await commentService.postComment(req.params.id, req.body);
    res.status(201).json(comment);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const putComment = async (req, res) => {
  try {
    const comment = await commentService.updateComment(req.params.commentId, req.body);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json(comment);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const result = await commentService.deleteComment(req.params.commentId);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json({ message: "Comment deleted" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- Task Tags ---

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

    if (taskTag.duplicate) {
      return res.status(400).json({ message: "Tag already assigned to this task" });
    }

    res.status(201).json(taskTag);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const putTaskTag = async (req, res) => {
  try {
    const taskTag = await taskTagService.putTaskTag(req.params.tagId, req.body.taskId, req.body.tagId);

    if (!taskTag) {
      return res.status(404).json({ message: "TaskTag not found" });
    }

    res.json(taskTag);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTaskTag = async (req, res) => {
  try {
    const result = await taskTagService.deleteTaskTag(req.params.tagId);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "TaskTag not found" });
    }

    res.status(200).json({ message: "TaskTag deleted" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTasks,
  postTask,
  putTask,
  deleteTask,
  getTaskStats,
  getComments,
  postComment,
  putComment,
  deleteComment,
  getTaskTags,
  postTaskTag,
  putTaskTag,
  deleteTaskTag,
};
