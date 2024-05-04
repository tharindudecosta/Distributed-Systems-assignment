const express = require("express");
const multer = require('multer');
const upload = require('../middleware/multerTraining')
const router = express.Router();
const courseController = require("../controllers/courseController");
const authorizations = require("../middlewares/authorizations");

// router.post("/", authorizations.isFaculty, courseController.createCourse);
// router.get("/", courseController.getCourses);
// router.put("/:id", authorizations.isFaculty, courseController.updateCourse);
// router.delete("/:id", authorizations.isFaculty, courseController.deleteCourse);

router.get("/", courseController.getCourses);
router.get("/:id", courseController.getCourseRecord);
router.route('/').get(courseController.getCourseRecord).post(upload.single('file'), courseController.createCourse)
router.put("/:id", courseController.updateCourse);
router.delete("/:id", courseController.deleteCourse);
router.get("/:instructorId", courseController.getInstructorAllCourses);

module.exports = router;

const express = require('express');
