const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

router.get("/", courseController.getCourses);
router.get("/:id", courseController.getCourseRecord);
router.post("/newCourse", courseController.createCourse);
router.put("/update/:id", courseController.updateCourse);
router.delete("/delete/:id", courseController.deleteCourse);
router.get("/instructor/:id", courseController.getInstructorAllCourses);

module.exports = router;
