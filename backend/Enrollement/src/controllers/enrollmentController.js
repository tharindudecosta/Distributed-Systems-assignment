const Enrollment = require("../models/Enrollment");
const User = require("../models/User");
const Course = require("../models/Course");
const mongoose = require("mongoose");

// Controller function to enroll a student in a course
const enrollStudent = async (req, res) => {
  const { studentId, courseId } = req.body;


  let emptyFields = [];

  if (!studentId) {
    emptyFields.push("studentId");
  }
  if (!courseId) {
    emptyFields.push("courseId");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  const enrolledRows = await Enrollment.find({
    studentId: studentId,
    courseId: courseId
  });

  if (enrolledRows.length > 0) {
    res.status(201).json({msg: "You are already enrolled" });
  } else {
    try {
      const enrolledCourse = await Enrollment.create({
        studentId: studentId,
        courseId: courseId,
        dateEnrolled: new Date()
      });
      res.status(200).json({ enrolledCourse });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "Something went wrong" });
    }
  }
};

// Controller function to get all enrollments
const getEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find().sort({ createdAt: -1 });
    res.status(200).json(enrollments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getEnrolledCourse = async (req, res) => {
  const { id } = req.params;

  const enrolledRows = await Enrollment.find({studentId: id});
  if(enrolledRows.length === 0){
      return res.status(400).json({error: "You have no enrollments"})
  }
  else{

      let courseCodes = []

      enrolledRows.forEach((enrolledRow)=>{
          courseCodes.push(enrolledRow.courseId)
      })

      const enrolledCourses = await Course.find({_id: {$in: courseCodes}});

      return res.status(200).json(enrolledCourses)
  }
}
const getStudentAllEnrollments = async (req, res) => {
  const { studentId } = req.params;
  const objectId = new mongoose.Types.ObjectId(studentId);

  const enRecords = await Enrollment
    .find({ studentId: objectId })
    .sort({ createdAt: -1 });
  
  res.status(200).json(enRecords);
};


module.exports = { enrollStudent, getEnrollments, getEnrolledCourse,getStudentAllEnrollments };
