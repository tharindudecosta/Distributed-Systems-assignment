const Course = require("../models/Course");
const User = require("../models/User");
const mongoose = require("mongoose");


const createCourse = async (req, res) => {
  try {
    const { name, description, instructorId, price ,file } = req.body;
    let emptyFields = [];

    if (!file) {
      emptyFields.push("file");
    }
    if (!name) {
      emptyFields.push("name");
    }
    if (!instructorId) {
      emptyFields.push("instructorId");
    }
    if (!price) {
      emptyFields.push("price");
    }
    if (!description) {
      emptyFields.push("description");
    }
    if (emptyFields.length > 0) {
      return res
        .status(400)
        .json({ error: "Please fill in all the fields", emptyFields });
    }

    const instructor = await User.findById(instructorId);
    if (!instructor) {
      return res.status(404).json({ message: "Instructor not found" });
    }

    const newCourse = await Course.create({
      name: name,
      description: description,
      instructor: instructorId,
      price: price,
      file: file,
      status:"Active"
    });
    console.log("adfsfbhjm,");

    console.log(newCourse);
    
    res
      .status(201)
      .json({ message: "Course created successfully", course: newCourse });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

const getCourses = async (req, res) => {
  const courses = await Course.find({}).sort({ createdAt: -1 });
  res.status(200).json(courses);
};

const getCourseRecord = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such course" });
  }

  const course = await Course.findById(id);

  if (!course) {
    return res.status(404).json({ error: "No such course" });
  }

  res.status(200).json(course);
};

const updateCourse = async (req, res) => {
  const { id, name, description, instructorId, price,file } = req.body;

  let emptyFields = [];

  if (!id) {
    emptyFields.push("id");
  }
  if (!file) {
    emptyFields.push("file");
  }
  if (!name) {
    emptyFields.push("name");
  }
  if (!instructorId) {
    emptyFields.push("instructorId");
  }
  if (!price) {
    emptyFields.push("price");
  }
  if (!description) {
    emptyFields.push("description");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such course" });
  }

  const course = await Course.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!course) {
    return res.status(404).json({ error: "No such course" });
  }
};

const deleteCourse = async (req, res) => {
  const { id } = req.body

  if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({error: 'No such course'})
  }

  const course = await Course.findOneAndDelete({_id: id})

  if(!course){
      return res.status(404).json({error: 'No such course'})
  }

  res.status(200).json(course)
};

const getInstructorAllCourses = async (req, res) => {
  const { id } = req.params;
  const objectId = new mongoose.Types.ObjectId(id);

  const courseRecords = await Course
    .find({ instructor: objectId })
    .sort({ createdAt: -1 });
  
  res.status(200).json(courseRecords);
};

module.exports = {
  createCourse,
  getCourses,
  updateCourse,
  deleteCourse,
  getCourseRecord,
  getInstructorAllCourses,
};
