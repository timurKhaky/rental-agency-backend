const mongoose = require("mongoose");

const OfferSchema = mongoose.Schema(
  {
    _userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    _immovablesId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Immovables",
    },
    start: String,
    end: String,
    isСonfirm: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Offer = mongoose.model("Offer", OfferSchema);
module.exports = Offer;
