const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    reviewToPost: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Immovables",
    },
    text: String,
    stars: Number,
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
