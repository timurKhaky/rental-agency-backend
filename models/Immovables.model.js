 const mongoose = require("mongoose");
const ImmovablesSchema = mongoose.Schema(
 { },
   { timestamps: true }
 );

 const Immovables = mongoose.model("Immovables", ImmovablesSchema);
 module.exports = Immovables;
