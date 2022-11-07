const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema(
  {
    text: {type: String,
      required: true},
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User'
    },
    reviewToPost: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Immovables"
    }
    
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;