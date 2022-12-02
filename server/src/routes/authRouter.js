const express = require("express");
const authController = require("../app/controllers/authController");

const router = express.Router();

//REGISTER
router.post("/register", authController.authRegister);

//LOGIN
router.post("/login", authController.authLogin);

module.exports = router;
