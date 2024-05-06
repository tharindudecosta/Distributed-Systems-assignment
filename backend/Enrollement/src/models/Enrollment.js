const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    },
    allContent: {
      type: Number,
      required: true,
      default:0
    },
    completed: {
      type: Number,
      required: true,
      default:0
    },
  },
  {timestamps: true}
);

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
module.exports = Enrollment;
