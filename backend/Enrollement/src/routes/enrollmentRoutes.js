const express = require("express");
const router = express.Router();
const enrollmentController = require("../controllers/enrollmentController");
const authorizations = require("../middlewares/authorizations");

// router.post("/", authorizations.isStudent, enrollmentController.enrollStudent);
// router.get("/", enrollmentController.getEnrollments);
// router.delete("/:id", authorizations.isStudent, enrollmentController.dropEnrollment);

router.post("/", authorizations.isStudent, enrollmentController.enrollStudent);
router.get("/", enrollmentController.getEnrollments);
router.delete("/:id", authorizations.isStudent, enrollmentController.dropEnrollment);

module.exports = router;
