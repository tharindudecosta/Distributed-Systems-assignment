const Enrollment = require("../models/Enrollment");
const User = require("../models/User");
const Course = require("../models/Course");

// Controller function to enroll a student in a course
const enrollStudent = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;
    const student = await User.findById(studentId);
    const course = await Course.findById(courseId);

    if (!student || !course) {
      return res.status(404).json({ message: "Student or course not found" });
    }

    const existingEnrollment = await Enrollment.findOne({ "student._id": studentId, "course._id": courseId });

    if (existingEnrollment) {
      return res.status(400).json({ message: "Student is already enrolled in this course" });
    }

    const newEnrollment = new Enrollment({
      student: { _id: studentId, name: student.name },
      course: { _id: courseId, name: course.name },
    });

    await newEnrollment.save();

    // Remove the __v field from the response
    const enrollmentResponse = newEnrollment.toObject();
    delete enrollmentResponse.__v;

    res.status(201).json({ message: "Student enrolled successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller function to get all enrollments
const getEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find().select("-__v");
    res.status(200).json(enrollments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller function to drop an enrollment
const dropEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);
    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    await enrollment.deleteOne();

    res.status(200).json({ message: "Enrollment dropped successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { enrollStudent, getEnrollments, dropEnrollment };
