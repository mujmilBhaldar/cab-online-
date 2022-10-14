const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const cabSchema = new mongoose.Schema({
  cabId: { type: Number, unique: true },
  type: String,
  seats: { type: Number, min: 0 },
  rate: { type: Number, min: 0 },
  ac: Boolean,
  avatar: String,
  status: Number,
  rtoNumber: String,
  createdAt: { type: Date, default: Date.now },
});

cabSchema.plugin(autoIncrement, { inc_field: "cabId" });

module.exports = mongoose.model("Cab", cabSchema);
