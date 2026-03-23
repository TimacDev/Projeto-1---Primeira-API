const commentService = require("../services/commentService");

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
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getComments, postComment };
