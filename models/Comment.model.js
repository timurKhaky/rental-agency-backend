const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema(
  {
    //тут модель
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
