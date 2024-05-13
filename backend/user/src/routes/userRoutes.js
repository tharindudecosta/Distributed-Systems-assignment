const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/getProfile/:id",userController.getUser)
router.put("/updateProfile/:id",userController.UpdateUser)
router.get("/allUsers/",userController.getAll)

module.exports = router;
