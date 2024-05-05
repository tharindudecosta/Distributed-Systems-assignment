const express = require("express");
const multer = require("multer");
// const upload = require("../middlewares/multerTraining");
const router = express.Router();
const courseController = require("../controllers/courseController");

const uploadfile = multer({ dest: 'uploads/' });


router.get("/", courseController.getCourses);
router.get("/:id", courseController.getCourseRecord);

router.post("/upload", uploadfile.single("file"), (req, res) => {
  res.json({ mssg: "upload ok " });
});

router.post("/newCourse", courseController.createCourse);
router.put("/:id", courseController.updateCourse);
router.delete("/:id", courseController.deleteCourse);
router.get("/:instructorId", courseController.getInstructorAllCourses);

module.exports = router;
