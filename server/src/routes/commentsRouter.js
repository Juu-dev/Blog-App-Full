const express = require("express");
const commentsController = require("../app/controllers/commentsController.js");

const router = express.Router();

//CREATE COMMENT
router.post("/", commentsController.commentCreate);

//GET COMMENT
router.get("/:post_id", commentsController.commentGet);

//DELETE COMMENT
router.delete("/:id", commentsController.commentDelete);

module.exports = router;
