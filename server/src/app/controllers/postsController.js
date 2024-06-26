const User = require("../models/User");
const Post = require("../models/Post");

class postsController {
  // POST
  // path = /api/posts
  postCreate = async (req, res) => {
    const newPost = new Post(req.body);
    try {
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);

      // log
      console.log("Create new post successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  };

  // PUT
  // path = /api/posts/:id
  postUpdate = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.username === req.body.username) {
        try {
          const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedPost);

          // log
          console.log("Update post successfully!");
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can update only your post!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  };

  // DELETE
  // path = /api/posts/:id
  postDelete = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.username === req.body.username) {
        try {
          await post.delete();
          res.status(200).json("Post has been deleted...");

          // log
          console.log("Delete post successfully!");
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can delete only your post!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  };

  // GET
  // path = /api/posts/:id
  postGet = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.status(200).json(post);

      // log
      console.log("Get post successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  };

  // GET
  // path = /api/posts/my-posts/:user_id
  postGetMyPosts = async (req, res) => {
    try {
      const posts = await Post.find({ user_id: req.params.user_id });
      res.status(200).json(posts);

      // log
      console.log("Get my posts successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  };

  // GET
  // path = /api/posts
  postGetAll = async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
      let posts;
      if (username) {
        posts = await Post.find({ username });
      } else if (catName) {
        posts = await Post.find({
          categories: {
            $in: [catName],
          },
        });
      } else {
        posts = await Post.find();
      }
      res.status(200).json(posts);

      // log
      console.log("Get all posts successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  };
}

module.exports = new postsController();
