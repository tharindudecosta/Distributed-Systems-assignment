const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true,
    },
    courseId: {
      type: String,
      required: true,
    },
    dateEnrolled: {
      type: Date,
      required: true,
    },
    allContent: {
      type: Number,
      required: true,
    },
    completed: {
      type: Number,
      required: true,
    },
  },

  { versionKey: false }
);

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
module.exports = Enrollment;
