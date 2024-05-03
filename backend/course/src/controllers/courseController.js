const Course = require("../models/Course");
const User = require("../models/User");

const createCourse = async (req, res) => {
  try {
    const { name, description, instructorId, price } = req.body;
    const instructor = await User.findById(instructorId);
    if (!instructor) {
      return res.status(404).json({ message: "Instructor not found" });
    }

    const newCourse = new Course({
      name:name,
      description:description,
      credits,
      instructor: instructorId,
      price:price
    });
    await newCourse.save();

    res
      .status(201)
      .json({ message: "Course created successfully", course: newCourse });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("faculty", "name");
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateCourse = async (req, res) => {
  try {
    const { name, code, description, credits, facultyId } = req.body;
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // const faculty = await User.findById(facultyId);
    // if (!faculty) {
    //   return res.status(404).json({ message: "Faculty not found" });
    // }

    course.name = name || course.name;
    course.code = code || course.code;
    course.description = description || course.description;
    course.credits = credits || course.credits;
    course.faculty = facultyId || course.faculty;

    await course.save();

    res.status(200).json({ message: "Course updated successfully", course });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    await course.deleteOne();

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createCourse, getCourses, updateCourse, deleteCourse };
