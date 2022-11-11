const mongoose = require("mongoose");
const ImmovablesSchema = mongoose.Schema(
  {
    image: [],
    name: String,
    price: Number,
    description: String,
    location: String,
    options: {
      Baths: Number,
      Garage: Number,
      Beds: Number,
    },
    owners: [
      {
        _userId: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
        start: String,
        end: String,
      },
    ],
  },
  { timestamps: true }
);

const Immovables = mongoose.model("Immovables", ImmovablesSchema);
module.exports = Immovables;
