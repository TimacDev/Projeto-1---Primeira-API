const commentService = require("../services/commentService");

const getComments = (req, res) => {
  try {
    const comments = commentService.getCommentsByTaskId(req.params.id);
    res.json(comments);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const postComment = (req, res) => {
  try {
    const comment = commentService.postComment(req.params.id, req.body);
    res.status(201).json(comment);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { getComments, postComment };
