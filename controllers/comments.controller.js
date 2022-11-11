const { findByIdAndRemove } = require("../models/Comment.model");
const Comment = require("../models/Comment.model");

module.exports.commentsController = {
  getComments: async (req, res) => {
    try {
      const comments = await Comment.find()
        .populate({ path: "userId", select: "type" })
        .populate("reviewToPost");

      res.json(comments);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  deleteComment: async (req, res) => {
    try {
      await findByIdAndRemove(req.params.id);

      res.json("комментарий удален");
    } catch (error) {
      res.json(error.message);
    }
  },
  addComment: async (req, res) => {
    try {
      const { text, userId, stars } = req.body;
      const comment = await Comment.create({
        text,
        userId: req.user.id,
        reviewToPost: req.params.id,
        stars,
      });
      const newCommentAll = await Comment.find()
        .populate({ path: "userId", select: "nickname" })
        .populate("reviewToPost");

      return res.json(newCommentAll);
    } catch (error) {
      return res.json(error.message);
    }
  },
};
