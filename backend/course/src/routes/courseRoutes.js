const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const authorizations = require("../middlewares/authorizations");

// router.post("/", authorizations.isFaculty, courseController.createCourse);
// router.get("/", courseController.getCourses);
// router.put("/:id", authorizations.isFaculty, courseController.updateCourse);
// router.delete("/:id", authorizations.isFaculty, courseController.deleteCourse);

router.post("/", courseController.createCourse);
router.get("/", courseController.getCourses);
router.put("/:id", courseController.updateCourse);
router.delete("/:id", courseController.deleteCourse);


module.exports = router;
