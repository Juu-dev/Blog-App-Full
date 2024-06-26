const express = require("express");
const usersController = require("../app/controllers/usersController");

const router = express.Router();

//GET ALL USER
router.get("/", usersController.userGetAll);

//UPDATE
router.put("/:id", usersController.userUpdate);

//DELETE
router.delete("/:id", usersController.userDelete);

//GET USER
router.get("/:id", usersController.userGet);

module.exports = router;
