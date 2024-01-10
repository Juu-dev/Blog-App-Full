const express = require("express");
const authController = require("../app/controllers/authController");

const router = express.Router();

//REGISTER
router.post("/register", authController.authRegister);

//LOGIN
router.post("/login", authController.authLogin);

//LOGIN WITH GOOGLE
router.post("/loginGoogle", authController.authLoginGoogle);

module.exports = router;
