const express = require("express");
const categoriesController = require("../app/controllers/categoriesController");

const router = express.Router();

//CREATE CATEGORY
router.post("/", categoriesController.categoryCreate);

//GET CATEGORY
router.get("/", categoriesController.categoryGet);

module.exports = router;
