const CourseContent = require("../models/CourseContentModel");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

//get the content
const getCourseContent = async (req, res) => {
  const courseContents = await CourseContent.find({}).sort({ createdAt: -1 });

  res.status(200).json(courseContents);
};

const getSingleContent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "CourseContent not found" });
  }

  const courseContent = await CourseContent.findById(id);

  if (!courseContent) {
    return res.status(404).json({ error: "CourseContent not found" });
  }

  res.status(200).json(courseContent);
};

//create the content
const createCourseContent = async (req, res) => {
  const { title, courseId, description, file } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!courseId) {
    emptyFields.push("courseId");
  }
  if (!description) {
    emptyFields.push("description");
  }
  if (!file) {
    emptyFields.push("file");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill the required fields", emptyFields });
  }

  //add to db
  try {
    const courseContent = await CourseContent.create({
      title: title,
      course: courseId,
      description: description,
      file: file,
    });
    res.status(200).json({ courseContent });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete course contents
const deleteCourseContents = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No content for id " });
  }

  const courseContents = await CourseContent.findOneAndDelete({ _id: id });

  if (!courseContents) {
    return res.status(404).json({ error: "No content found" });
  }

  res.status(200).json(courseContents);
};

const getContentByCourse = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "CourseContent not found" });
  }

  const objectId = new mongoose.Types.ObjectId(id);

  const courseContent = await CourseContent.find({ course: objectId }).sort({
    createdAt: -1,
  });

  if (!courseContent) {
    return res.status(404).json({ error: "CourseContent not found" });
  }

  res.status(200).json(courseContent);
};

module.exports = {
  getCourseContent,
  createCourseContent,
  deleteCourseContents,
  getSingleContent,
  getContentByCourse
};
