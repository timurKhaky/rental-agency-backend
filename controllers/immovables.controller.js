const mongoose = require("mongoose");

const ImmovablesSchema = mongoose.Schema(
  {
    //тут модель
  },
  { timestamps: true }
);

const Immovables = mongoose.model("Immovables", ImmovablesSchema);
module.exports = Immovables;