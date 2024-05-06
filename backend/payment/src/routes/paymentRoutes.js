const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

router.post("/newPayment", paymentController.createPayment);
router.get("/", paymentController.getPayments);
router.get("/student/:id", paymentController.getStudentPayments);
router.get("/course/:id", paymentController.getCoursePayments);

module.exports = router;
