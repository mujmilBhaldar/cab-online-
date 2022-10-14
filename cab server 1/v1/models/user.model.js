const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: Number,
  name: {
    first: { type: String, minlength: 3, maxlength: 20 },
    last: { type: String, minlength: 3, maxlength: 20 },
  },
  mobile: { type: String, minlength: 10, maxlength: 15, unique: true },
  email: {
    type: String,
    minlength: 5,
    maxlength: 45,
    unique: true,
    required: true,
  },
  password: String,
  status: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
