const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  instructor:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  price: { type: Number, required: true },
  status: { type: String, required: true, default:"Active" },
},

{ versionKey: false }

);

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
