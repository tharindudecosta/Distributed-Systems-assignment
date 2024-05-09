const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: false },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ["admin", "instructor", "student"] },
},

{ timestamps: true }

);

const User = mongoose.model("User", userSchema);
module.exports = User;
