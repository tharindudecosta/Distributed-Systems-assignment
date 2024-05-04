const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
  student: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  course: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  date: {
    type: Date,
    required: true
  },
  allContent: {
    type: Number,
    required: true
  },
  completed: {
    type: Number,
    required: true
  }
},

{ versionKey: false }

);

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
module.exports = Enrollment;
