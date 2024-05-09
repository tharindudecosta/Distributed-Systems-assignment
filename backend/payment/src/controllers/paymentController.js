const Course = require("../models/Course");
const User = require("../models/User");
const mongoose = require("mongoose");
const Payment = require("../models/Payment")

const createPayment = async (req, res) => {
  try {
    const { studentId, courseId, amount, status } = req.body;
    console.log(courseId);
    let emptyFields = [];

    if (!studentId) {
      emptyFields.push("studentId");
    }
    if (!courseId) {
      emptyFields.push("courseId");
    }
    if (!amount) {
      emptyFields.push("amount");
    }
    if (!status) {
      emptyFields.push("status");
    }
    if (emptyFields.length > 0) {
      return res
        .status(400)
        .json({ error: "Please fill in all the fields", emptyFields });
    }

    const student = await User.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "course not found" });
    }

    const newPayment = await Payment.create({
      student:studentId, 
      course: courseId, 
      amount:amount, 
      status:status
    });

    console.log(newPayment);
    
    res
      .status(200)
      .json({ message: "Payment created successfully", Payment: newPayment });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

const getPayments = async (req, res) => {
  const payments = await Payment.find({}).sort({ createdAt: -1 });
  res.status(200).json(payments);
};


const getStudentPayments = async (req, res) => {
  const { id } = req.params;
  const objectId = new mongoose.Types.ObjectId(id);

  const paymentRecords = await Payment
    .find({ student: objectId })
    .sort({ createdAt: -1 });
  
  res.status(200).json(paymentRecords);
};

const getCoursePayments = async (req, res) => {
  const { id } = req.params;
  const objectId = new mongoose.Types.ObjectId(id);

  const paymentRecords = await Payment
    .find({ course: objectId })
    .sort({ createdAt: -1 });
  
  res.status(200).json(paymentRecords);
};

module.exports = {
  createPayment,
  getPayments,
  getStudentPayments,
  getCoursePayments
};
