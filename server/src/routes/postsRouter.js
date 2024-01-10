const express = require("express");
const postsController = require("../app/controllers/postsController");

const router = express.Router();

//CREATE POST
router.post("/", postsController.postCreate);

//UPDATE POST
router.put("/:id", postsController.postUpdate);

//DELETE POST
router.delete("/:id", postsController.postDelete);

//GET MY POSTS
router.get("/my-posts/:user_id", postsController.postGetMyPosts);

//GET POST
router.get("/:id", postsController.postGet);

//GET ALL POSTS
router.get("/", postsController.postGetAll);

module.exports = router;
