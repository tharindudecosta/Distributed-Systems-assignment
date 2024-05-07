const express = require("express");

const {
  getCourseContent,
  createCourseContent,
  deleteCourseContents,
  getSingleContent,
  getContentByCourse,
} = require("../controllers/courseContentController");

const router = express.Router();

router.get("/", getCourseContent);

router.get("/course/:id", getContentByCourse);

router.get("/:id", getSingleContent);

router.post("/createContent", createCourseContent);

router.delete("/delete/:id", deleteCourseContents);

module.exports = router;
