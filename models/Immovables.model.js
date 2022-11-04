const mongoose = require("mongoose");

const ImmovablesSchema = mongoose.Schema(
  {
    image:[],
    name: String,
    price: Number,
    description: String,
    location: String,
    options: {
      Baths: Number,
      Garage: Number,
      Beds: Number,
    },
    isOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

const Immovables = mongoose.model("Immovables", ImmovablesSchema);
module.exports = Immovables;
