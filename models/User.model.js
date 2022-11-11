const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    nickname: { type: String, default: "тестовый никнейм" + Date.now() },
    login: { type: String, unique: true },
    password: { type: String },
    role: { type: String, default: "user" },
    favorites: [],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
